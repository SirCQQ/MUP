// Express
const express = require("express");
const app = express();

const model=require("./account_ms_model.js");
//for working with the file system
const fs = require('fs');
const jwt = require('jsonwebtoken');

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

app.post('/party',(request,response)=>{
    var party_name=request.body.party_name
    if(party_name)
    {
        model.addParty(party_name).then(
        function(resp)
        {

        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

    }
    else send403Response(response);
    
})

app.delete('/party',(request,response)=>{
    var party_name=request.querty.party_name
    if(party_name)
    {
        model.deleteParty(party_name).then(
            function(resp)
            {
    
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    
        
    }
    else send403Response(response);  
})

app.post('/addUser',(request,response)=>{
    var username=request.body.username
    var party_name=request.body.party_name
    if(party_name&&username)
    {
        model.addUser(party_name,username).then(
            function(resp)
            {
    
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    
        
    }
    else send403Response(response);    
})

app.delete('/deleteUser',(request,response)=>{
    var username=request.body.username
    var party_name=request.body.party_name
    if(party_name&&username)
    {
        model.deleteUser(party_name,username).then(
            function(resp)
            {
    
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    
        
    }
    else send403Response(response);

    
})

app.post('/addSong',(request,response)=>{
    var artist=request.body.artist
    var title=request.body.title
    var party=request.body.party
    if(party&&title&&artist)
    {
        model.addSong(artist,title,party).then(
            function(resp)
            {
    
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    
        
    }
    else send403Response(response);
})

app.post('/vote',(request,response)=>{
    var song_id=request.body.song_id
    if(song_id)
    {
        model.voteSong(song_id).then(
            function(resp)
            {
    
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    
        
    }
    else send403Response(response);
})

app.get('/initialSongList',(request,response)=>{
    var party_name=request.query.party_name
    if(party_name)
    {
        model.getSongList(party_name).then(
            function(resp)
            {
    
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    
        
    }
    else send403Response(response);
})

app.use(function (req, res, next) {
    send404Response(res);
  })

app.listen(8001, () => {
    console.log("Party Management Service is running");
});