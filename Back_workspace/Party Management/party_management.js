// Express
const express = require("express");
const app = express();

const model = require("./party_ms_model.js");
//for working with the file system
const fs = require('fs');
const jwt = require('jsonwebtoken');
var cors = require('cors');

const jsonType = { "Access-Control-Allow-Methods": "GET,POST,DELETE", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };


function send500Response(response, text = "Internal server error") {
    response.status(500);
    response.type('application/json')
    response.send({ "message": "Error 500:" + text });
}
function send401Response(response, text = "Unauthorized") {
    response.status(401);
    response.type('application/json')
    response.send({ "message": "Error 401:" + text });
}
function send403Response(response, text = "Send valid query params") {
    response.status(403);
    response.type('application/json')
    response.send({ "message": "Error 403:" + text });
}
function send404Response(response) {
    response.status(404);
    response.type('application/json')
    response.send({ "message": "Error 404:Page not found" });
}

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cors());

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

app.post('/party', (request, response) => {
    var party_name = request.body.party_name
    token = getToken(request)

    if (token) {
        let legit = validateToken(token, response);
        if (legit) {
            console.log(legit.user_id)
            if (party_name) {
                model.addParty(party_name, legit.user_id).then(
                    function (bool) {
                        if (bool) {
                            model.addUser(party_name, legit.user_id, legit.user_id).then((bool2) => {
                                let json = { "status": bool2 };
                                console.log(json);
                                response.writeHead(200, jsonType);
                                response.write(JSON.stringify(json));
                                response.end();
                            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
                        }
                        else send500Response(response);


                    }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

            }
            else send403Response(response);
        }
        else send401Response(response)
    }
    else send401Response(response, 'No jwt found inside the authorization(bearer')
})

app.delete('/party', (request, response) => {
    var party_name = request.body.party_name
    token = getToken(request)
    if (token) {
        let legit = validateToken(token, response);
        if (legit) {
            console.log(legit.user_id)
            model.isAdmin(party_name, legit.user_id).then((check) => {
                if (check) {
                    if (party_name) {
                        model.deleteParty(party_name, legit.user_id).then(
                            function (bool) {
                                let json = { "status": bool };
                                console.log(json);
                                response.writeHead(200, jsonType);
                                response.write(JSON.stringify(json));
                                response.end();

                            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));


                    }
                    else send403Response(response)

                }
                else send403Response(response)
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

        }
        else send401Response(response)
    }
    else send401Response(response, 'No jwt found inside the authorization(bearer')
})

app.post('/addUser', (request, response) => {
    var username = request.body.username
    var party_name = request.body.party_name
    token = getToken(request)
    if (token) {
        let legit = validateToken(token, response);
        if (legit) {
            console.log(legit.user_id)
            model.isParticipant(party_name, legit.user_id).then((check) => {
                if (check) {
                    if (party_name && username) {
                        model.addUser(party_name, username, legit.user_id).then(
                            function (bool) {
                                let json = { "status": bool };
                                console.log(json);
                                response.writeHead(200, jsonType);
                                response.write(JSON.stringify(json));
                                response.end();

                            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));


                    }
                    else send403Response(response)

                }
                else send403Response(response)
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

        }
        else send401Response(response)
    }
    else send401Response(response, 'No jwt found inside the authorization(bearer')
})

app.delete('/deleteUser', (request, response) => {
    var username = request.body.username
    var party_name = request.body.party_name
    token = getToken(request)
    if (token) {
        let legit = validateToken(token, response);
        if (legit) {
            console.log(legit.user_id)
            model.isAdmin(party_name, legit.user_id).then((check) => {
                if (check) {
                    if (party_name && username) {
                        model.deleteUser(party_name, username, legit.user_id).then(
                            function (bool) {
                                let json = { "status": bool };
                                console.log(json);
                                response.writeHead(200, jsonType);
                                response.write(JSON.stringify(json));
                                response.end();

                            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

                    }
                    else send403Response(response)

                }
                else send403Response(response)
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

        }
        else send401Response(response)
    }
    else send401Response(response, 'No jwt found inside the authorization(bearer')

})

app.post('/addSong', (request, response) => {
    var artist = request.body.artist
    var title = request.body.title
    var genre = request.body.genre
    var album = request.body.album
    var party = request.body.party_id
    console.log("Adding song:")
    console.log(request.body)
    token = getToken(request)
    if (token) {
        let legit = validateToken(token, response);
        if (legit) {
            console.log(legit.user_id)
            model.isAdmin(party, legit.user_id).then((check) => {
                if (check) {
                    if (party && title && artist && genre && album) {
                        model.addSong(artist, title, genre, album, party).then(
                            function (bool) {
                                let json = { "status": bool };
                                console.log(json);
                                response.writeHead(200, jsonType);
                                response.write(JSON.stringify(json));
                                response.end();

                            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

                    }
                    else send403Response(response)

                }
                else send403Response(response)
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

        }
        else send401Response(response)
    }
    else send401Response(response, 'No jwt found inside the authorization(bearer')

})

app.post('/vote', (request, response) => {
    var song_id = request.body.song_id
    var party_id = request.body.party_id
    token = getToken(request)
    if (token) {
        let legit = validateToken(token, response);
        if (legit) {
            console.log(legit.user_id)
            model.isParticipant(party_id, legit.user_id).then((check) => {
                if (check) {
                    if (song_id) {
                        model.voteSong(song_id, legit.user_id, party_id).then(
                            function (bool) {
                                let json = { "status": bool };
                                console.log(json);
                                response.writeHead(200, jsonType);
                                response.write(JSON.stringify(json));
                                response.end();

                            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));


                    }
                    else send403Response(response)

                }
                else send403Response(response)
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

        }
        else send401Response(response)
    }
    else send401Response(response, 'No jwt found inside the authorization(bearer')
});

app.get('/initialSongList', (request, response) => {
    let party_name = request.query.party_name
    if (party_name) {
        model.getSongList(party_name).then(
            function (json) {

                console.log("list_obj:" + json);
                response.writeHead(200, jsonType);
                response.write(JSON.stringify(json));
                response.end();

            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

    }
    else send403Response(response)

})

app.use(function (req, res, next) {
    send404Response(res);
})

app.listen(8001, () => {
    console.log("Party Management Service is running");
})