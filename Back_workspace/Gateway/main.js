// Express
const express = require("express");
const app = express();
//for working with the file system
const fs = require('fs');
const jwt = require('jsonwebtoken');

const https=require('http')
const accountMsOptions={
    hostname:'localhost',
    port:8000
}
const partyMsOptions={
    hostname:'localhost',
    port:8001
}
const songMsOptions={
    hostname:'localhost',
    port:8000
}
const statsMsOptions={
    hostname:'localhost',
    port:8002
}
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

function send500Response(response,text="Internal server error") {
    response.status(500);
    response.send("Error 500:"+text);
 }
 function send401Response(response,text="Unauthorized") {
    response.status(401);
    response.send("Error 401:"+text);
 }
 function send403Response(response,text="Send valid query params") {
    response.status(403);
    response.send("Error 403:"+text);
 }
 function send404Response(response) {
    response.status(404);
    response.send("Error 404:Page not found");
}

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
// account management
function sendMsResponse(response,status,body)
{
    response.statusCode=status
    response.type('application/json')
    response.send(body)

}
// function for sending request to microservice with the data put in the request body(eg:post requests)
// will send the response from the microservice back to the client
function sendRequestWithBodyData(response,options,data)
{
    const ms_req=https.request(options,ms_res=>{
        responseStatus=ms_res.statusCode
        ms_res.on('data',d=>{
            ms_resBody=JSON.parse(d)
            sendMsResponse(response,responseStatus,ms_resBody)

        })
    })
    ms_req.on('error', error => {
        console.error(error)
      })
    ms_req.write(data)
    ms_req.end()
}
function sendRequest(response,options)
{
    const ms_req=https.request(options,ms_res=>{
        responseStatus=ms_res.statusCode
        ms_res.on('data',d=>{
            ms_resBody=JSON.parse(d)
            sendMsResponse(response,responseStatus,ms_resBody)

        })
    })
    ms_req.on('error', error => {
        console.error(error)
      })
    ms_req.end()
}
app.post('/login',(request,response)=>{
    // extract from request
    data=JSON.stringify(request.body)
    // create new request
    accountMsOptions['path']='/login'
    accountMsOptions['method']='POST'
    accountMsOptions['headers']={
        'Content-Type': 'application/json',
        'Content-Length': data.length

    }
    sendRequestWithBodyData(response,accountMsOptions,data)

})
app.post('/register',(request,response)=>{
        // extract from request
        data=JSON.stringify(request.body)
        // create new request
        accountMsOptions['path']='/register'
        accountMsOptions['method']='POST'
        accountMsOptions['headers']={
            'Content-Type': 'application/json',
            'Content-Length': data.length
    
        }
        sendRequestWithBodyData(response,accountMsOptions,data)
    
    
})
app.post('/registerValidate',(request,response)=>{
        // extract from request
        data=JSON.stringify(request.body)
        // create new request
        accountMsOptions['path']='/registerValidate'
        accountMsOptions['method']='POST'
        accountMsOptions['headers']={
            'Content-Type': 'application/json',
            'Content-Length': data.length
    
        }
        sendRequestWithBodyData(response,accountMsOptions,data)
    
    
})
app.post('/changePassword',(request,response)=>{
        // extract from request
        data=JSON.stringify(request.body)
        // create new request
        accountMsOptions['path']='/changePassword'
        accountMsOptions['method']='POST'
        accountMsOptions['headers']={
            'Content-Type': 'application/json',
            'Content-Length': data.length
    
        }
        sendRequestWithBodyData(response,accountMsOptions,data)
    
    
})
app.post('/changePasswordValidate',(request,response)=>{
        // extract from request
        data=JSON.stringify(request.body)
        // create new request
        accountMsOptions['path']='/changePasswordValidate'
        accountMsOptions['method']='POST'
        accountMsOptions['headers']={
            'Content-Type': 'application/json',
            'Content-Length': data.length
    
        }
        sendRequestWithBodyData(response,accountMsOptions,data)
    
 
})
// party management

app.post('/party',(request,response)=>{
        // extract from request
        data=JSON.stringify(request.body)
        // create new request
        partyMsOptions['path']='/party'
        partyMsOptions['method']='POST'
        partyMsOptions['headers']={
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'authorization':'Bearer '+getToken(request)
        
        }
        // console.log(partyMsOptions['headers'])
        sendRequestWithBodyData(response,partyMsOptions,data)
    

})

app.delete('/party',(request,response)=>{
            // extract from request
            data=JSON.stringify(request.body)
            // create new request
            partyMsOptions['path']='/party'
            partyMsOptions['method']='DELETE'
            partyMsOptions['headers']={
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'authorization':'Bearer '+getToken(request)
        
            }
            // console.log(partyMsOptions['headers'])
            sendRequestWithBodyData(response,partyMsOptions,data)
        

})

app.post('/addUser',(request,response)=>{
            // extract from request
            data=JSON.stringify(request.body)
            // create new request
            partyMsOptions['path']='/addUser'
            partyMsOptions['method']='POST'
            partyMsOptions['headers']={
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'authorization':'Bearer '+getToken(request)
        
            }
            sendRequestWithBodyData(response,partyMsOptions,data)
        

})

app.delete('/deleteUser',(request,response)=>{
            // extract from request
            data=JSON.stringify(request.body)
            // create new request
            partyMsOptions['path']='/deleteUser'
            partyMsOptions['method']='DELETE'
            partyMsOptions['headers']={
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'authorization':'Bearer '+getToken(request)
        
            }
            sendRequestWithBodyData(response,partyMsOptions,data)
        
})

app.post('/addSong',(request,response)=>{
        // extract from request
        data=JSON.stringify(request.body)
        // create new request
        partyMsOptions['path']='/addSong'
        partyMsOptions['method']='POST'
        partyMsOptions['headers']={
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'authorization':'Bearer '+getToken(request)
    
        }
        sendRequestWithBodyData(response,partyMsOptions,data)
    
})

app.post('/vote',(request,response)=>{
            // extract from request
            data=JSON.stringify(request.body)
            // create new request
            partyMsOptions['path']='/vote'
            partyMsOptions['method']='POST'
            partyMsOptions['headers']={
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'authorization':'Bearer '+getToken(request)
        
            }
            sendRequestWithBodyData(response,partyMsOptions,data)
        

})

app.get('/initialSongList',(request,response)=>{
        // extract from request
        data=request.query.party_name   
        // create new request
        partyMsOptions['path']='/initialSongList?party_name='+data
        partyMsOptions['method']='GET'

        sendRequest(response,partyMsOptions)
    

})
// statistcs and recommendations
// song_streaming

app.get('/main', (request, response) => {
    response.send("Hi!");

})
app.use(function (req, res, next) {
    send404Response(res);
  })

app.listen(8003, () => {
    console.log("Account Service is running");
});
