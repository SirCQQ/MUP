


function register() {
    let username = document.getElementById('name')
    let email = document.getElementById('email')
    let pass = document.getElementById('pass')
    let repass = document.getElementById('repass')

    // console.log(username.value, email.value, pass.value, repass.value)
    if (repass.value !== pass.value) {
        return;
    }
    let boddy={
        "username": username.value,
        "password": pass.value,
        "email": email.value
    }
    let body=JSON.stringify(boddy)
    fetch("http://localhost:8003/register", {
        method: "POST",
        body:body,
        headers:{
            "Content-Type":"application/json"
        }
    })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.status==='added succesfully')
            {
                change_location('/login')
            }
        })

}





function login() {
    let username=document.getElementById("username")
    let password=document.getElementById("password")
    // console.log(username.value,password.value)
    let vals={
        "username":username.value,
        "password":password.value
    }



    let body_to_send=JSON.stringify(vals)
    fetch("http://localhost:8003/login",{
        method:"POST",
        body:body_to_send
        ,headers:{
            "Content-Type":"application/json"
        }
    })
        .then(resp=>resp.json())
        .then(resp=>{
            // console.log(resp)
            if(resp.token){
                let d = new Date();
                d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                let expires = "expires="+d.toUTCString();
                setCookie("token",resp.token,7)
                setCookie("userid",username.value,7)
                change_location("/")
            }
        })

}
function change_location(location){
    history.pushState('', '', location);
    changePage();
}

function logout(){
    setCookie('token','',0)
    change_location('/login')
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function get_song_list(){
    fetch("http://localhost:8003/songList?party_name=VD2020")
    .then(resp=>resp.json())
    .then(resp=>{
        console.log(resp);
    })
}