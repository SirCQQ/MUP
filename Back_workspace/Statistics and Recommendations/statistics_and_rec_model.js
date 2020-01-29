const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://stats_and_recs:9Mt5wTidOTcu6YdN@mup-iiwhw.mongodb.net/test?retryWrites=true&w=majority";
const https = require('http')
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

function getSongList(party_name) {
    return new Promise(function (resolve, reject) {
        partyMsOptions['path'] = '/songList?party_name=' + party_name
        partyMsOptions['method'] = 'GET'

        const ms_req = https.request(partyMsOptions, ms_res => {
            responseStatus = ms_res.statusCode
            ms_res.on('data', d => {
                ms_resBody = JSON.parse(d)
                if (responseStatus == 200) {
                    resolve(ms_resBody);
                }
                else
                    reject(false);

            })
        })
        ms_req.on('error', error => {
            console.error(error)
        })
        ms_req.end()
    })
}
function checkUserParticipant(user_id, party) {
    l = party.user_list.length;
    for (i = 0; i < l; i++) {
        if (party.user_list[i].user_id == user_id)
            return true
    }
    return false
}
function isDifferentState(user_id, party, is_dancing) {
    l = party.user_list.length;
    for (i = 0; i < l; i++) {
        if (party.user_list[i].user_id == user_id) {
            if (party.user_list[i].is_dancing == is_dancing)
                return false
            else return true
        }
    }
}
function getSongDetails(party, song_id) {
    details = {}
    l = party.song_list.length
    for (i = 0; i < l; i++) {
        if (party.song_list[i].song_id == song_id) {
            details["artist"] = party.song_list[i].artist
            details["album"] = party.song_list[i].album
            details["genre"] = party.song_list[i].genre
        }
    }
    return details
}

function sendVote(party_id, song_id, vote_value) {
    return new Promise(function (resolve, reject) {
    // create new request
    partyMsOptions['path'] = '/vote'
    partyMsOptions['method'] = 'POST'
    data = {}
    data["party_id"] = party_id
    data["song_id"] = song_id
    data["vote_value"] = vote_value
    data = JSON.stringify(data)

    const ms_req = https.request(partyMsOptions, ms_res => {
        responseStatus = ms_res.statusCode
        ms_res.on('data', d => {
            ms_resBody = JSON.parse(d)
            if (ms_res.statusCode == 200 && ms_resBody.status == true)
                resolve(true)
            else reject(false)
        })
    })
    ms_req.on('error', error => {
        console.error(error)
    })
    ms_req.write(data)
    ms_req.end()
    })

}
function sendDancing(party_id, user_id, is_dancing) {
    return new Promise(function (resolve, reject) {
        j = { "party_id": party_id, "user_id": user_id, "is_dancing": is_dancing }

        // extract from request
        data = JSON.stringify(j)
        // create new request
        partyMsOptions['path'] = '/setPlayed'
        partyMsOptions['method'] = 'POST'
        partyMsOptions['headers'] = {
            'Content-Type': 'application/json',
            'Content-Length': data.length,

        }


        const ms_req = https.request(options, ms_res => {
            responseStatus = ms_res.statusCode
            ms_res.on('data', d => {
                ms_resBody = JSON.parse(d)
                if (responseStatus == 200 && ms_resBody.status == true)
                    resolve(true)
                else reject(false)
            })
        })
        ms_req.on('error', error => {
            console.error(error)
        })
        ms_req.write(data)
        ms_req.end()
    })
}
function sendPlayed(party_id, song_id) {
    return new Promise(function (resolve, reject) {
        j = { "party_id": party_id, "song_id": song_id }

        // extract from request
        data = JSON.stringify(j)
        // create new request
        partyMsOptions['path'] = '/setPlayed'
        partyMsOptions['method'] = 'POST'
        partyMsOptions['headers'] = {
            'Content-Type': 'application/json',
            'Content-Length': data.length,

        }


        const ms_req = https.request(options, ms_res => {
            responseStatus = ms_res.statusCode
            ms_res.on('data', d => {
                ms_resBody = JSON.parse(d)
                if (responseStatus == 200 && ms_resBody.status == true)
                    resolve(true)
                else reject(false)
            })
        })
        ms_req.on('error', error => {
            console.error(error)
        })
        ms_req.write(data)
        ms_req.end()
    })

}
function updateScores(party, song_id) {
    return new Promise(function (resolve, reject) {
    song_details = getSongDetails(party, song_id)
    console.log("details:" + JSON.stringify(song_details))
    console.log("update")
    l = party.song_list.length

    var promises = [];

    for (i = 0; i < l; i++) {
        if (party.song_list[i].song_id != song_id) {
            if (party.song_list[i].artist == song_details.artist) {
                console.log("bingo")
                party.song_list[i].vote_count += 2
                promises.push(sendVote(party.party_id, party.song_list[i].song_id, 1))
            }
            if (party.song_list[i].genre == song_details.genre) {
                party.song_list[i].vote_count += 2
                promises.push(sendVote(party.party_id, party.song_list[i].song_id, 2))
            }
            if (party.song_list[i].album == song_details.album) {
                party.song_list[i].vote_count += 1
                promises.push(sendVote(party.party_id, party.song_list[i].song_id, 1))
            }
        }
        else {
            party.song_list[i].vote_count += 1
            promises.push(sendVote(party.party_id, party.song_list[i].song_id, 1))
        }
    }
    Promise.all(promises).then(()=>{
        resolve(party)

    }).catch((e)=>{reject(e)})

    });

}
module.exports.updateParty = function (user_id, party_id, song_id, is_dancing) {
    return new Promise(function (resolve, reject) {
        getSongList(party_id).then((party) => {
            if (party) {
                // console.log(party)
                if (checkUserParticipant(user_id, party)) {
                    if (isDifferentState(user_id, party, is_dancing)) {
                        sendPlayed(party_id, song_id).then((bool) => {
                            if (bool) {
                                if (is_dancing == true)
                                    sendDancing(party_id, user_id, is_dancing).then((bool) => {
                                        if (bool) {
                                            updateScores(party, song_id).then((party)=>{
                                                if(party)
                                                resolve(party)
                                                else reject(false)
                                            }).catch((err) => setImmediate(() => { console.log(err); reject(false) }));
                                            
                                        }
                                        else reject(false)
                                    }).catch((err) => setImmediate(() => { console.log(err); reject(false) }));

                                resolve(party)
                            }
                            else reject(false)

                        }).catch((err) => setImmediate(() => { console.log(err); reject(false) }));

                    }
                    else resolve(party)
                }
                else reject(false)

            }
            else
                reject(false)
        }).catch((err) => setImmediate(() => { console.log(err); reject(false) }));

    })
}
