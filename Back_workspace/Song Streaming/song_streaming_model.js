const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://song_manager:Dc629KzOFrEEe6Yi@mup-iiwhw.mongodb.net/test?retryWrites=true&w=majority";

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
            line.song_id

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
            let song_obj = { "song_id": title, "vote_count": 0 }
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
        isnew(title).then((bool) => {
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