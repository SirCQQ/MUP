// Express
const express = require("express");
const app = express();

const jsonType = { "Access-Control-Allow-Methods": "GET,POST,DELETE", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

const model=require("./account_ms_model.js");
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
app.get('/userDetails',(request,response)=>{
    var username=request.query.username
    
})

app.get('/partyDetails',(request,response)=>{
    var party_name=request.querty.party_name
    
})
app.get('/songList',(request,response)=>{
    var party_name=request.query.party_name
  
})
app.post('/currently_playing',(request,response)=>{
    var song_id=request.body.song_id;
    
    
})
app.post('/vote',(request,response)=>{
    var song_id=request.body.song_id
})

app.get('/initialSongList',(request,response)=>{
    var party_name=request.query.party_name

})



app.use(function (req, res, next) {
    send404Response(res);
  })

app.listen(8001, () => {
    console.log("Party Management Service is running");
});