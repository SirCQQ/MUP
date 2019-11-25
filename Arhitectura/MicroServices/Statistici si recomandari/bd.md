# Statistics and recommendations service
### Furnizeaza si actualizeaza statistici referitoare la playlist-uri si useri si folosindu-se de aceste statistici alege piesele ce urmeaza sa fie puse.

### Collections:
## User stats
#### Fields:
* user_id
* time_dancing
* favorite_song
* least_favorite_song
* songs_danced
* preferred_styles -va contine o lista de stiluri de dans preferate(cele ma dansate)


## Party stats
#### Fields:
* party_id
* total_time_danced
* favorite_song
* least_favorite_song
* currently_playing
* user_list:[]-lista de forma:
&nbsp; {
&nbsp;&nbsp; user_id:,
&nbsp;&nbsp; is_dancing:false/true
&nbsp; }
## User to songs
#### Fields
* user_id
* song_list lista ce contine obiecte de forma:
{song_id:,
artist:,
album:,
genre:,
times_liked:,
times_uploaded:,
time_danced:}
## Party to songs
#### Fields
* party_id
* song_list lista ce contine obiecte de forma:
{song_id:,
song_score:
played:,
},unde song_score indica gradul de apreciere al unei melodii si este folosit pentru a determina ce piesa urmeaza sa fie pusa 