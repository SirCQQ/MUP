// Express
const express = require("express");
const app = express();
var WebSocketServer = require("ws").Server,

const jsonType = { "Access-Control-Allow-Methods": "GET,POST,DELETE", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

const model=require("./statistics_and_rec_model.js");
//for working with the file system
const fs = require('fs');
const jwt = require('jsonwebtoken');

const cors = require('cors');

function send500Response(response,text="Internal server error") {
    response.status(500);
    response.type('application/json')
    response.send({"message":"Error 500:"+text});
 }
 function send401Response(response,text="Unauthorized") {
    response.status(401);
    response.type('application/json')
    response.send({"message":"Error 401:"+text});
 }
 function send403Response(response,text="Send valid query params") {
    response.status(403);
    response.type('application/json')
    response.send({"message":"Error 403:"+text});
 }
 function send404Response(response) {
    response.status(404);
    response.type('application/json')
    response.send({"message":"Error 404:Page not found"});
}

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cors());
function getToken(request, response) {

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
function validateToken(token, response) {

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

app.post('/sendUpdate',(request,response)=>{
    user_id=request.body.user_id
    party_id=request.body.party_id
    is_dancing=request.body.is_dancing
    song_id=request.body.song_playing_id
    // console.log(JSON.stringify(request.body))
    if(user_id&&party_id&&song_id)
    {
        model.updateParty(user_id,party_id,song_id,is_dancing).then((json)=>{
            if(json)
            {
                json["song_list"]=json["song_list"].sort(function(a,b){return b["vote_count"]-a["vote_count"];})
                console.log("list_obj:" + JSON.stringify(json));
               
                response.writeHead(200, jsonType);
                response.write(JSON.stringify(json));
                response.end();


            }
            else send500Response(response)
        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

    }    
})



app.use(function (req, res, next) {
    send404Response(res);
  })

app.listen(8004, () => {
    console.log("Statistics and Recommendations Service is running");
});