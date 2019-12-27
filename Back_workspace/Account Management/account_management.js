// Express
const express = require("express");
const app = express();

const jsonType = { "Access-Control-Allow-Methods": "GET,POST,DELETE", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
const textType = { "Access-Control-Allow-Methods": "GET,POST,DELETE", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain" };
const noType = { "Access-Control-Allow-Methods": "GET,POST,DELETE", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*" };

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
//Script for generating a JSON web token
function createToken(user_id) {
    // PAYLOAD
    var payload = {
       user_id: user_id,
 
    };
    // PRIVATE and PUBLIC key
    var privateKEY = fs.readFileSync('./private.key', 'utf8');
    var publicKEY = fs.readFileSync('./public.key', 'utf8');
    var i = 'UPNP';          // Issuer 
    var s = 'some@user.com';        // Subject 
    var a = 'http://localhost'; // Audience
    // SIGNING OPTIONS
    var signOptions = {
       issuer: i,
       subject: s,
       audience: a,
       expiresIn: "12h",
       algorithm: "RS256"
    };
 
    var token = jwt.sign(payload, privateKEY, signOptions);
    console.log("Token - " + token);
    return token;
}


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/login',(request,response)=>{
    var username=request.body.username;
    var password=request.body.password;
    if(username&&password)
    {
        model.login(username, password).then(function (resp) {
            console.log(resp);
            if (!resp) {
               send403Response(response,"Invalid user/password");
            }
            else {
                 let json = { "token": createToken(username) };
                  response.writeHead(200, jsonType);
                  response.write(JSON.stringify(json));
                  response.end();

            }

         }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
 

        // else send403Response(response,"Credentials not vaild(user/pass not found)");

    }
    else send401Response(response,"Credentials not found inside the request body")
})
app.post('/register',(request,response)=>{
    var username=request.body.username;
    var password=request.body.password;
    var email=request.body.email;
    if(username&&password&&email)
    {
        console.log("User"+username);
        console.log("Pass:"+password);
        console.log("Mail:"+email);
        model.register(username,password,email).then(function(message){
            let json = { "status": message };
            console.log(json);
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();

        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }))


        // else send403Response(response,"Credentials not vaild(user/pass not found)");

    }
    else send401Response(response,"Credentials not found inside the request body")


    
})
app.post('/registerValidate',(request,response)=>{
    var email=request.body.email;
    var code=request.body.code;
    if(email&&code)
    {
        model.validateCode(email, code).then(function (bool) {
            if (bool) {
               model.activateAccount(email).then(function (bool) {
                  let json = { "validate": bool };
                  response.writeHead(200, jsonType);
                  response.write(JSON.stringify(json));
                  response.end();

               });
            }
            else send403Response(response);

         }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

    }
})
app.post('/changePassword',(request,response)=>{
    var email=request.body.email;

    if(email)
    {
        console.log("change pass")
        model.changePassword(email).then(function (bool1) {
           let json = { "status": bool1 };
           console.log(json);
           response.writeHead(200, jsonType);
           response.write(JSON.stringify(json));
           response.end();
        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

    }
    
})
app.post('/changePasswordValidate',(request,response)=>{
    var email=request.body.email;
    var code=request.body.code;
    var password=request.body.password;
    console.log("change pass"+code);  

         model.changePassValidate(email, code, password).then(function (bool1) {
            let json = { "status": bool1 };
            response.writeHead(200, jsonType);
            console.log(json);
            response.write(JSON.stringify(json));
            response.end();

         }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));

    
})
app.get('/main', (request, response) => {
    response.send("Hi!");

})
app.use(function (req, res, next) {
    send404Response(res);
  })

app.listen(8000, () => {
    console.log("Account Service is running");
});
