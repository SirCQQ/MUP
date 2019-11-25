# Party management service
### Se ocupa cu crearea,stergerea de party-uri si adaugarea de noi useri in diverse party uri; cu adaugarea de melodii in playlist ul unui party
### Collections:
## Parties
#### Fields:
* party_id
* party_name
* admin_id
* user_list
* song_list contine o lista de obiecte de forma:		{song_id:,
vote_count:},unde
-- vote_count:numarul total de vote uri din party pentru piesa cu id_ul song-id

## Songs
#### Fields:
* song_id
* artist
* title
* album
* year
* genre
