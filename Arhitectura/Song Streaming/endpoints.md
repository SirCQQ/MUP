# Song streaming service
### Se ocupa cu uploadul de fisiere audio si stream-uirea acestora
## Upload a song
### Request:
<b>POST /addSong?artist=""&title="" </b> 
Requests in form of a content type:<b> multipart/form</b>
### Response:
<b>200</B>
error codes:403 for wrong credentials;401 for no credentials;500 server error