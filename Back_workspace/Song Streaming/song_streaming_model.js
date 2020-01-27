const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://song_manager:Dc629KzOFrEEe6Yi@mup-iiwhw.mongodb.net/test?retryWrites=true&w=majority";
const https=require('http')
const jwt = require('jsonwebtoken');
function getToken(request) {

    //    let token=request.headers['x-access-token'] || request.headers['Authorization'];
    try {
        var re = new RegExp('Bearer (.*)');
        var r = request.headers['authorization'].match(re);
        var token = r[1];
    }
    catch (err) {
        console.log(err);
    }
    return token;
}
function validateToken(token) {

    var publicKEY = fs.readFileSync('./public.key', 'utf8');
    var i = 'UPNP';          // Issuer 
    var s = 'some@user.com';        // Subject 
    var a = 'http://localhost'; // Audience
    var verifyOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: ["RS256"]
    };
    try {
        var legit = jwt.verify(token, publicKEY, verifyOptions);
    }
    catch (err) {

        console.log(err);
    }
    console.log("\nJWT verification result: " + JSON.stringify(legit));
    return legit;

}


const partyMsOptions = {
    hostname: 'localhost',
    port: 8001
}

module.exports.addSongToParty=function(request, data) {
    return new Promise(function (resolve, reject) {
        console.log(data.length)
    partyMsOptions['path'] = '/addSong'
    partyMsOptions['method'] = 'POST'
    partyMsOptions['headers'] = {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'authorization': 'Bearer ' + getToken(request)

    }

    const ms_req = https.request(partyMsOptions, ms_res => {
        responseStatus = ms_res.statusCode
        ms_res.on('data', d => {
            ms_resBody = JSON.parse(d)
            if (responseStatus == 200 && ms_resBody['status']==true)
            {
                resolve(true);
            }
           else
                reject(false);

        })
    })
    ms_req.on('error', error => {
        console.error(error)
    })
    ms_req.write(data)
    ms_req.end()
})
}

function isNew(song_id) {
    return new Promise(function (resolve, reject) {
        // create new client
        const client = new MongoClient(uri, { useNewUrlParser: true });
        // connect to mongodb server
        client.connect(err => {
            if (err)
                return reject(err);
            console.log("connected!");
            // select collection
            const collection = client.db("song_streaming").collection("songs");

            // query
            line = {}
            line.song_id=song_id

            collection.find(line).limit(1).count((err, result) => {
                if (result == 0) resolve(true);
                else resolve(false);

            });
            client.close();
        });

    })

}

function addNewSongEntry(song_id, uploader, song_path, party_name) {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("song_streaming").collection("songs");
        // perform actions on the collection object
        if (err)
            reject(err)
        line = {}

        line.song_id = song_id
        line.uploader = uploader
        line.party_list = [party_name]
        line.song_path = song_path
        console.log("adding line" + line)
        collection.insertOne(line, function (err, result) {
            if (err)
                reject(err);
            else
                resolve(true);
        });
        client.close();
    });

}
function appendToList(song_id, party_name) {
    return new Promise(function (resolve, reject) {


        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("song_streaming").collection("songs");
            // perform actions on the collection object
            if (err)
                reject(err)
            line = {}

            line.song_id = song_id
            let song_obj = { "song_id": song_id, "vote_count": 0 }
            console.log("adding party" + party_name)
            collection.updateOne(line, { $addToSet: { 'song_list': song_obj } }, function (err, result) {
                if (err)
                    reject(false);
                else
                    resolve(true);
            });
            client.close();
        });


    });



}

module.exports.addSongToDb = function (artist, title, uploader_id, party_id, path) {
    return new Promise(function (resolve, reject) {
        isNew(title).then((bool) => {
            if (bool) {
                addNewSongEntry(title, uploader_id, path, party_id).then((result) => {
                    if (result)
                        resolve(true)
                    else resolve(false)

                }).catch((err) => setImmediate(() => { console.log(err); reject(false) }));

            }
            else {
                appendToList(title, party_id).then((result) => {
                    if (result)
                        resolve(true)
                    else resolve(false)

                }).catch((err) => setImmediate(() => { console.log(err); reject(false) }));

            }

        })



    });
}