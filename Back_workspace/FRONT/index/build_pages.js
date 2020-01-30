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
                <a href="./registerPage.html">Don't have an account yet?</a>
            </div>
            <div class="loginForm">
                <form action="#" method="POST">
                    <div class="inputElements">
                        <input type="email" placeholder="E-mail" required>
                        <input type="password" placeholder="Password" required>
                    </div>
            </div>
            <div class="loginButtons">
                <button onclick="location.href='./mainPage.html';" type="submit">Login</button>
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
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="E-mail" required>
                        <input type="password" placeholder="Password" required>
                        <input type="password" placeholder="Confirm Password" required>
                    </div>
            </div>
            <div class="registerButtons">
                <button onclick="location.href='./loginPage.html';" type="submit">Register</button>
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
                    <button onclick="location.href='./mainPage.html';" class="menuButton" type="button">Main
                        page</button>
                    <button class="menuButon" type="button">My Parties</button>
                    <button onclick="location.href='./manageParty.html';" class="menuButon" type="button">Create
                        Party</button>
                    <button onclick="location.href='./loginPage.html';" class="menuButton" type="button">Logout</button>
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


function clear() {
    clear_body();
    clear_links();
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
        case "/index/":
            change_css("mainPage")
            create_container();
            create_main();
            break;
        default:
            change_css("mainPage")
            create_container();
            create_main();
            break;
    }

}

window.onload = changePage();


// history.pushState("haha", "Test", "/login");