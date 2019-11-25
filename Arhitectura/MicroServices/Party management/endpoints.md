# Party management service
### Se ocupa cu crearea,stergerea de party-uri si adaugarea de noi useri in diverse party uri; cu adaugarea de melodii in playlist ul unui party

## Create Party
### Request:
<b>POST /party?party_name=""</b> 
### Response:
<b>200,Content-Type:application/json</b>
{
	party_id:
}
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Delete Party
### Request:
<b>DELETE /party?party_name=""</b> 
### Response:
<b>200</B>
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Add Users to a Party
### Request:
<b>POST /addUser?username=""&party_name=""</b> 
### Response:
<b>200</B>
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Delete Users from a Party
### Request:
<b>DELETE /deleteUser?username=""&party_name=""</b> 
### Response:
<b>200</B>
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Add song to party
### Request:
<b>POST /addSong?artist=""&title="" </b> 
### Response:
<b>200</B>
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Vote a song
### Request:
<b>POST /vote?song_id=""</b> 
### Response:
<b>200</B>
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Get song details from song title
### Request:
<b>GET /song?title=""</b> 
### Response:
<b>200,Content-Type:application/json</b>
{artist:,
title:,
album:,
year:,
genre:
}
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Get the initial(unordered) playlist
(used by the Statistics and recommendation microservice)
### Request:
<b>GET /initialSongList?party_id=""</b> 
### Response:
<b>200,Content-Type:application/json</b>
{party_id:,
user_list:[]-lista de obiecte de forma:
&nbsp; {
&nbsp;&nbsp; user_id:,
&nbsp;&nbsp; is_dancing:false
&nbsp; }
song_list:[]-lista de obiecte de forma:
&nbsp; {
&nbsp;&nbsp; song_id:,
&nbsp;&nbsp; artist:,
&nbsp;&nbsp; title:,
&nbsp;&nbsp; album:,
&nbsp; &nbsp; year:,
&nbsp; &nbsp; genre:,
&nbsp; &nbsp; vote_count:
 &nbsp; }
}
error codes:403 for wrong credentials;401 for no credentials;500 server error
