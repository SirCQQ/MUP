# Statistics and recommendations service
### Furnizeaza si actualizeaza statistici referitoare la playlist-uri si useri si folosindu-se de aceste statistici alege piesele ce urmeaza sa fie puse.

## Get user details
### Request:
<b>GET /userDetails?username=""</b> 
### Response:
<b>200,Content-Type:application/json</b>
{
time_dancing:,
favorite_song:,
least_favorite_song:
songs_danced:
preferred_styles:
}
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Get party details
### Request:
<b>GET /partyDetails?party_name=""</b> 
### Response:
<b>200,Content-Type:application/json</b>
{
total_time_danced:,
 favorite_song:,
 least_favorite_song:,
 currently_playing:,
 user_list:[]-lista de forma:
&nbsp; {
&nbsp;&nbsp; user_id:,
&nbsp;&nbsp; is_dancing:false/true
&nbsp; }
}
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Get song list
this list is the list ordered by preference.
### Request:
<b>GET /songList?party_name=""</b> 
### Response:
<b>200,Content-Type:application/json</b>
{
song_list:[]-lista de obiecte de forma
{song_id:,song_score:,}
}
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Set current_song
set the song currently playing
### Request:
<b>POST /currently_playing?song_id=""
</b> 
### Response:
<b>200,</b>
error codes:403 for wrong credentials;401 for no credentials;500 server error

## Set user is dancing
set the song currently playing
### Request:
<b>POST /isDancing?user_id=""&party_id=""&value=true/false
</b> 
### Response:
<b>200,</b>
error codes:403 for wrong credentials;401 for no credentials;500 server error