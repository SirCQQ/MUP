// let login = require('')
// import { register } from "./fetchs"

function create_login() {
    // clear_body();
    let body = document.querySelector("body")
    body.innerHTML = `
     <div class="bothContainers">
        <div class="leftContainer">
            <div class="logo">
                <img src="../logoMUP/logoMUP.png">
            </div>
            <div class="describeApp">
                <div class="listDescribeApp">
                    <ul style="list-style-type:circle;">
                        <li>Get your Party started</li>
                        <li>Create or Join to a Party</li>
                        <li>Decide which tracks should be played</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rightContainer">
            <div class="loginRegisterLinks">
                <span>Login Form</span>
                <a href="./register">Don't have an account yet?</a>
            </div>
            <div class="loginForm">
                <form action="#" method="POST">
                    <div class="inputElements">
                        <input id="username" type="email" placeholder="E-mail" required>
                        <input id="password" type="password" placeholder="Password" required>
                    </div>
            </div>
            <div class="loginButtons">
                <button
                onclick="login()"
                
                  type="submit" >Login</button>
                </form>
            </div>
        </div>
    </div>
    `
}
function create_register() {
    let body = document.querySelector('body')
    body.innerHTML = ` <div class="bothContainers">
        <div class="leftContainer">
            <div class="logo">
                <img src="../logoMUP/logoMUP.png">
            </div>
            <div class="describeApp">
                <div class="listDescribeApp">
                    <ul style="list-style-type:circle;">
                        <li>Get your Party started</li>
                        <li>Create or Join to a Party</li>
                        <li>Decide which tracks should be played</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rightContainer">
            <div class="loginRegisterLinks">
                <span>Sing Up Form</span>
                <a href="./loginPage.html">Return to login form.</a>
            </div>
            <div class="registerForm">
                <form action="#" method="POST">
                    <div class="inputElements">
                        <input id='name' type="text" placeholder="Your Name" required>
                        <input id='email' type="email" placeholder="E-mail" required>
                        <input id='pass' type="password" placeholder="Password" required>
                        <input id='repass' type="password" placeholder="Confirm Password" required>
                    </div>
            </div>
            <div class="registerButtons">
                <button onclick="register();" type="submit">Register</button>
                <p style="color:red; display:none;" class='error'>Try again</p>
                </form>
            </div>
        </div>
    </div>`
}

function create_container() {
    let body = document.querySelector('body');
    body.innerHTML = `<div class="bothContainers">
        <div class="leftContainer">
        </div>
         <div class="rightContainer">
            </div>
        </div>
        `
    create_menue()

}

function create_menue() {
    let page = document.querySelector("div.leftContainer")
    page.innerHTML = ` <div class="logo">
                <img src="../logoMUP/logoMUP.png">
            </div>
            <div class="menu">
                <div class="menuItems">
                    <button onclick="history.pushState('haha', 'Main Page', '/');changePage();" class="menuButton" type="button">Main
                        page</button>
                    <button onclick="history.pushState('haha', 'My Parties', '/myParties');changePage();"class="menuButon" type="button">My Parties</button>
                    <button onclick="history.pushState('haha', 'Create Party', '/createParty');changePage();" class="menuButon" type="button">Create
                        Party</button>
                    <button onclick="logout()" class="menuButton" type="button">Logout</button>
                </div>
            </div>`
}

function create_main() {
    let right = document.querySelector("div.rightContainer")
    console.log(right)
    right.innerHTML = `
     <div class='logo'>
                <!-- logo -->
                <img src="../logoMUP/logoMUP.png" alt="logoMUP">
            </div>
            <div class="joinPartyElements">
                <!-- form which send to server -->
                <form action="#" method="POST">
                    <input type="text" class="center" placeholder="#Party Code" required>
                    <div class="buttonWrapper">
                        <button type="submit" class="center" id="joinPartyButton">Join A Party</button>
                    </div>
                </form>

                <!-- form( link) which send to the same page. -->
                <!--            for login/ register           -->
                <!-- <form action="./myPartiesPage.html">
                    <button type="submit" id="myPartiesButton">My Parties</button>
                </form> -->
                <!-- </div> -->
            </div>
            `;

}

function create_live_party(){
    let body=document.querySelector("body");
    body.innerHTML=`
    <img src="../logoMUP/logoMUP.png">
    <audio style="position:absolute; " controls src="http://localhost:3001/streamSong?song_id=Who%20Dat%20Boy">Ha </audio>
    <div class="livePartyCard">
        <div class="everySong">
            <span>Track's Name</span>
            <button type="button">❤</button>
        </div>
        <div class="actionButtons">
            <button onclick="changeLocation(\"/\");" type="button">Leave</button>
        </div>
    </div>`
    
}

function create_my_parties() {
    let right = document.querySelector("div.rightContainer")
    right.innerHTML = `
    <div class="allPartyCards">
                <div class="partyCard">
                    <div class="deleteParty">
                        <button onclick="change_location('/liveParty');" type="button">Start</button>
                    </div>
                    <div class="describeParty">
                        <span>Name of Party</span>
                        <span>#Party Code</span>
                    </div>
                    <div class="partyActions">
                        <button onclick="change_location('/manageParty');" type="button">Edit</button>
                        <button id="deletePartyButton" type="button">Delete</button>
                    </div>
                </div>
            </div>
            `
}

function create_create_party() {
    let right = document.querySelector("div.rightContainer")
    right.innerHTML = `
    <div class="describeParty">
				<span>Step One: Describe your party!</span>
				<input type="text" placeholder="Name" required>
				<textarea placeholder="Description"></textarea>
				<input type="url" placeholder="Location">
			</div>
			<div class="uploadSongs">
				<span>Step Two: Upload your fav tracks!</span>
				<div class="uploadTrack">
					<!-- Asta o sa fie barSearch, dar nu sunt convins cum vreti sa o implementati -->
					<input type="url" placeholder="Add Track">
					<button type="button">Upload</button>
				</div>
				<!-- Aici la fel ti-am scris, orientativ, pentru ca se face din JS -->
				<div class="pieseleAdaugate">
					<!-- aici va fi lista cu piesele adaugate, eventual add/ remove -->
				</div>
            </div>
            `

}



function clear() {
    clear_body();
}

function clear_body() {
    let body = document.querySelector("body");
    // console.log(body.childNodes)
    body.childNodes.forEach(child => {
        // console.log(child)
        // console.log(child.nodeName)
        if (child.nodeName !== "script") {
            body.removeChild(child);
        }
    });
}

function change_css(css) {
    let link = document.querySelector("link")
    link.href = "../css/" + css + ".css"
}

function page_load() {
    let head = document.querySelector("head")
    head.innerHTML = `<meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <link rel="stylesheet" href="">
      `
}

function changePage() {
    console.log(location.pathname)
    page_load()
    switch (location.pathname) {
        case "/login":
            change_css("loginPage")
            create_login();
            break;
        case "/register":
            change_css("registerPage")
            create_register();
            break;
        case "/":
            if(checkLogged())
                {change_css("mainPage")
                create_container();
                create_main();
                break;
                }
            else{
                change_location("/login")
                break;
            }

        case "/createParty":
            if(checkLogged())
            {change_css("manageParty")
            create_container();
            create_create_party();
            break;}
            else{
                change_location("/login")
                break;
            }

        case "/myParties":
            if(checkLogged())
            {change_css("myPartiesPage")
            create_container();
            create_my_parties();
            break;}
        else{
            change_location("/login")
            break;
        }

        case "/liveParty":
            if (checkLogged()){
                change_css("liveParty")
                create_live_party()
                change_song("http://localhost:3001/streamSong?song_id=Toss a coin to your witcher")
                break
            }
            else{
                change_location("/login")
                break;
            }

        default:
            change_css("mainPage")
            create_container();
            create_main();
            break;
    }

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


function checkLogged() {
    return getCookie("token") !== "";
}


function change_location(location){
    history.pushState('', '', location);
    changePage();
}
window.onload = changePage();

// onclick="location.href='./mainPage.html';"
// history.pushState('haha', 'Test', '/login');changePage();




function change_song(song){
    let audio=document.querySelector('audio')
                audio.onended=()=>{
                // audio.src='http://localhost:3001/streamSong?song_id=Toss a coin to your witcher'
                audio.src=song;
                audio.play()
}
}



