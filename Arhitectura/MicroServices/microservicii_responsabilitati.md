# Account service
- Login (dupa username;password)
- Register (necesita username password email)
-- Activate Account ( necesita email,cod verificare)
- Request a Change of Password (necesita email)
- Change the password (necesita email,cod verificare)

# Party management service
- Create Party
- Add Users to Party
- Delete Party
- Delete Users from Party
- Add Music to Party
- Get Song Details

- Vote song

# Song Streaming Service

- Upload music using express-fileupload
- Stream music using socket.io-stream

# Statistics and recommendations service

- Get user statistics
- Get party statistics
- Get ordered playlist (ordered by user preference)
- Set currently playing( used for party statistics and measurement of song appreciation(based on num of users dancing on the current song))
- Set user's dancing status(true or false)
