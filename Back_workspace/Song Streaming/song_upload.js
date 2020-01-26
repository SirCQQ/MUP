const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const model = require("./song_streaming_model.js");


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

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/uploadSong', (request, response) => {

        try {   
        if(!request.files) {
            send403Response(response,"No file uploaded.");
        } else {
            console.log(JSON.stringify(request.body))
            let artist=request.body.artist;
            let title=request.body.title;
            let uploader_id=request.body.uploader_id;
            let party_id=request.body.party_id;
            //retrieve the uploaded file
            let songFile = request.files.song;
            
            //place the file in upload directory
            path='./uploads/' + songFile.name;
            songFile.mv(path);
            model.addSongToDb(artist,title,uploader_id,party_id,path)
            //send response
            response.send({
                status: true
            });
        }
    } catch (err) {
        console.log(err)
        send500Response(response)
    }
   
});


app.use(function (req, res, next) {
    send404Response(res);
})

const port = process.env.PORT || 3000;
app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

