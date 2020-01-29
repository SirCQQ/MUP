const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const model = require("./song_streaming_model.js");

const ms = require('mediaserver')
function send500Response(response, text = "Internal server error") {
   response.status(500);
   response.send("Error 500:" + text);
}
function send401Response(response, text = "Unauthorized") {
   response.status(401);
   response.send("Error 401:" + text);
}
function send403Response(response, text = "Send valid query params") {
   response.status(403);
   response.send("Error 403:" + text);
}
function send404Response(response) {
   response.status(404);
   response.send("Error 404:Page not found");
}


app.use(cors());
app.get('/streamSong', (request, response) => {
   song_id = request.query.song_id
   if (song_id) {
      model.getSongLocation(song_id).then((path)=>{
         if(path)
         {


            ms.pipe(request, response, path)
         }
         else send500Response(response);


      })
      .catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
 
   }
   else send403Response(response);
});



app.use(function (req, res, next) {
   send404Response(res);
})

const port = process.env.PORT || 3001;
app.listen(port, () =>
   console.log(`App is listening on port ${port}.`)
);

