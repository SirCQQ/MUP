## REGISTER
### Request:
<b>POST /register</b> 
{
	"username":,
	"password":,
	"email":
}
### Response:
<b>200,Content-Type:application/json</b>
{
	"status":message
}
message poate fi:
"account already exists";"username already taken","added succesfully"

error codes:500 server error


## LOGIN
### Request:
<b>POST /login</b>
{
	"username":,
	"password":,
}
### Response:
<b>200,Content-Type:application/json</b>
{
	"token":json-webtoken
}
error codes:403 for wrong credentials;401 for not offering credentials properly;500 for server error


## CHANGE PASSWORD-REQUEST FOR IT
### Request:
<b>POST /changePassword</b>
{
	"email":
}
### Response:
<b>200,Content-Type:application/json</b>
{
	"status":true/false
}
,unde :
	true-codul folosit pentru resetarea parolei a fost trimis
	false-codul nu s-a trimis

error code: 500 for server error

## CHANGE PASSWORD-ACTUAL PASSWORD UPDATE
### Request:
<b>POST /changePasswordValidate </b>
{
	"email":email addr,
	"code":code received on email add,
	"password":new_password,
}
### Response:
<b>200,Content-Type:application/json </b>
{
	"status":true/false
}
,unde:
	true-daca parola a fost resetata cu succes
	false-altfel
error codes:500


## GET USER ID (from a username)
### Request:
<b>GET /getId?username="username"</b>
### Response:
<b>200,Content-Type:application/json </b>
{
	"id":user_id
}
error codes:500 server error,403 pentru lipsa username in query


## GET USERNAME (from a user id)
### Request:
<b>GET /getUsername?userId=</b>
### Response:
<b>200,Content-Type:application/json</b>
{
	"username":username
}
error codes:500 server error,403 pentru lipsa userid in query

