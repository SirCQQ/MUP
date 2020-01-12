function create_live_party_page() {
  clear();
  add_css_link("../css/liveParty.css");
  let body = document.querySelector("body");
  let logo_img = document.createElement("img");
  let live_party_card_div = document.createElement("div");
  let songs_div = document.createElement("div");
  let track_name_span = document.createElement("span");
  let like_button = document.createElement("button");
  let action_buttons_div = document.createElement("div");
  let suggest_track_button = document.createElement("button");
  let leave_button = document.createElement("button");

  logo_img.src = "../logoMUP/logoMUP.png";
  logo_img.alt = "MUP Logo";

  live_party_card_div.classList.add("livePartyCard");
  songs_div.classList.add("everySong");
  track_name_span.innerText = "Track's Name";
  like_button.innerText = "❤";
  action_buttons_div.classList.add("actionButtons");
  suggest_track_button.innerText = "Suggest a track";
  leave_button.innerText = "Leave";

  songs_div.appendChild(track_name_span);
  songs_div.appendChild(like_button);

  action_buttons_div.appendChild(suggest_track_button);
  action_buttons_div.appendChild(leave_button);

  live_party_card_div.appendChild(songs_div);
  live_party_card_div.appendChild(action_buttons_div);

  body.appendChild(logo_img);
  body.appendChild(live_party_card_div);
}

function create_main_page() {
  /**
   * adding stylesheets
   */
  let header = document.querySelector("head");
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "../css/mainPage.css";
  header.appendChild(link);
  /**
   * Declarations
   */
  let body = document.querySelector("body");
  let main_div = document.createElement("div");
  let logo = document.createElement("div");
  let logo_img = document.createElement("img");
  let party_elems = document.createElement("div");
  let join_party_form = document.createElement("form");
  let party_code_input = document.createElement("input");
  let button_div = document.createElement("div");
  let join_button = document.createElement("button");
  let my_parties_form = document.createElement("form");
  let my_parties_button = document.createElement("button");
  /**
   * Building elements
   */
  main_div.classList.add("mainPageElements");
  logo.classList.add("logo");
  logo_img.src = "../logoMUP/logoMUP.png";
  logo_img.alt = "logo MUP";

  party_elems.classList.add("joinPartyElements");
  join_party_form.action = "#";
  join_party_form.method = "POST";
  party_code_input.type = "text";
  party_code_input.placeholder = "#Party Code";
  party_code_input.required = "true";
  button_div.classList.add("buttonWrapper");
  join_button.type = "submit";
  join_button.id = "joinPartyButton";
  join_button.innerText = "Join A Party";
  my_parties_form.action = "./myPartiesPage.html";
  my_parties_button.type = "submit";
  my_parties_button.id = "myPartiesButton";
  my_parties_button.innerText = "My Parties";
  /**
   * Appending in the right order
   */
  logo.appendChild(logo_img);

  button_div.appendChild(join_button);
  join_party_form.appendChild(party_code_input);
  join_party_form.appendChild(button_div);
  my_parties_form.appendChild(my_parties_button);
  party_elems.appendChild(join_party_form);
  party_elems.appendChild(my_parties_form);

  main_div.appendChild(logo);
  main_div.appendChild(party_elems);

  body.appendChild(main_div);

  // console.log(main_div);
  console.log(body);
}

function create_register_page() {
  /**Clear and add links */
  clear();
  add_css_link("../css/registerPage.css");
  /**Declare the page elems */

  let body = document.querySelector("body");
  let main_container_div = document.createElement("div");
  main_container_div.classList.add("bothContainers");
  main_container_div.appendChild(create_left_div_for_register_and_login());
  main_container_div.appendChild(create_right_div_for_register());
  body.appendChild(main_container_div);
}

function create_parties_page() {
  /**clearing the body and css links  */

  clear();
  /**
   * adding the new css link
   */
  add_css_link("../css/myPartiesPage.css");

  /**
   * declaring the new elements for body
   */
  let body = document.querySelector("body");

  let main_div = document.createElement("div");

  let left_container_div = document.createElement("div");

  let logo_div = document.createElement("div");

  let logo_img = document.createElement("img");

  let menu_div = document.createElement("div");

  let menu_items_div = document.createElement("div");

  let my_parties_button = document.createElement("button");

  let create_party_button = document.createElement("button");

  let logout_button = document.createElement("button");

  /**
   * right container comes here
   */

  let right_container_div = document.createElement("div");

  /**
   * adding atributes for new elements
   */
  main_div.classList.add("bothContainers");

  left_container_div.classList.add("leftContainer");

  logo_div.classList.add("logo");

  logo_img.src = "../logoMUP/logoMUP.png";
  logo_img.alt = "MUP logo";

  menu_div.classList.add("menu");

  menu_items_div.classList.add("menuItems");

  my_parties_button.classList.add("menuButton");
  my_parties_button.type = "button";
  my_parties_button.innerHTML = "My Parties";

  create_party_button.classList.add("menuButton");
  create_party_button.type = "button";
  create_party_button.onclick = ""; //change uri to create a party
  create_party_button.innerText = "Creaty Party";

  logout_button.classList.add("menuButton");
  logout_button.type = "button";
  logout_button.innerText = "Logout";

  right_container_div.classList.add("rightContainer");
  /**Assembling the elements  */

  logo_div.appendChild(logo_img);
  menu_items_div.appendChild(my_parties_button);
  menu_items_div.appendChild(create_party_button);
  menu_items_div.appendChild(logout_button);

  menu_div.appendChild(menu_items_div);

  left_container_div.appendChild(logo_div);
  left_container_div.appendChild(menu_div);
  main_div.appendChild(left_container_div);
  main_div.appendChild(right_container_div);
  body.appendChild(main_div);
}

function create_login_page() {
  clear();
  add_css_link("../css/registerPage.css");
  // add_css_link("../css/loginPage.css");
  let body = document.querySelector("body");
  let main_div = document.createElement("div");
  main_div.classList.add("bothContainers");

  main_div.appendChild(create_left_div_for_register_and_login());
  main_div.appendChild(create_right_div_for_login());
  body.appendChild(main_div);
}

function create_left_div_for_register_and_login() {
  let left_container_div = document.createElement("div");
  let logo_div = document.createElement("div");
  let logo_img = document.createElement("img");
  let describe_app_div = document.createElement("div");
  let list_describe_app_list = document.createElement("div");
  let describe_list = document.createElement("ul");
  let elem_list_1 = document.createElement("li");
  let elem_list_2 = document.createElement("li");
  let elem_list_3 = document.createElement("li");

  /**Adding attributes to elems  */
  left_container_div.classList.add("leftContainer");
  logo_div.classList.add("logo");
  logo_img.src = "../logoMUP/logoMUP.png";
  logo_img.alt = "MUP logo";
  describe_app_div.classList.add("describeApp");
  list_describe_app_list.classList.add("listDescribeApp");
  describe_list.style = "list-style-type:circle;";
  elem_list_1.innerText = "Get your Party started";
  elem_list_2.innerText = "Create or Join to a Party";
  elem_list_3.innerText = "Decide which tracks should be played";

  /**Assembling the page  */
  logo_div.appendChild(logo_img);

  describe_list.appendChild(elem_list_1);
  describe_list.appendChild(elem_list_2);
  describe_list.appendChild(elem_list_3);
  list_describe_app_list.appendChild(describe_list);
  describe_app_div.appendChild(list_describe_app_list);

  left_container_div.appendChild(logo_div);
  left_container_div.appendChild(describe_app_div);
  return left_container_div;
}

function create_right_div_for_register() {
  let right_container_div = document.createElement("div");
  let login_links_div = document.createElement("div");
  let sign_up_span = document.createElement("span");
  let login_return_a = document.createElement("a");

  let register_form_div = document.createElement("div");
  let register_form = document.createElement("form");
  let input_elements_div = document.createElement("div");
  let name_input = document.createElement("input");
  let email_input = document.createElement("input");
  let passward_input = document.createElement("input");
  let re_passward_input = document.createElement("input");
  let register_button_div = document.createElement("div");
  let register_button = document.createElement("button");

  right_container_div.classList.add("rightContainer");

  login_links_div.classList.add("loginRegisterLinks");

  sign_up_span.innerText = "Sing Up Form";

  login_return_a.href = "#";
  login_return_a.innerText = "Return to login form";

  register_form_div.classList.add("registerForm");
  register_form.action = "#";
  register_form.method = "POST";

  input_elements_div.classList.add("inputElements");

  name_input.type = "text";
  name_input.required = "true";
  name_input.placeholder = "Your name";

  email_input.type = "email";
  email_input.required = "true";
  email_input.placeholder = "E-mail";

  passward_input.type = "password";
  passward_input.required = "true";
  passward_input.placeholder = "Password";

  re_passward_input.type = "password";
  re_passward_input.required = "true";
  re_passward_input.placeholder = "Confirm Password";

  register_button_div.classList.add("registerButtons");

  register_button.type = "submit";
  register_button.innerText = "Register";

  login_links_div.appendChild(sign_up_span);
  login_links_div.appendChild(login_return_a);

  input_elements_div.appendChild(name_input);
  input_elements_div.appendChild(email_input);
  input_elements_div.appendChild(passward_input);
  input_elements_div.appendChild(re_passward_input);

  register_button_div.appendChild(register_button);

  register_form.appendChild(input_elements_div);
  register_form.appendChild(register_button_div);

  register_form_div.appendChild(register_form);

  right_container_div.appendChild(login_links_div);
  right_container_div.appendChild(register_form_div);
  return right_container_div;
}

function create_right_div_for_login() {
  let right_container_div = document.createElement("div");
  let login_links_div = document.createElement("div");
  let sign_up_span = document.createElement("span");
  let login_return_a = document.createElement("a");

  let login_form_div = document.createElement("div");
  let input_div = document.createElement("div");
  let login_form = document.createElement("form");
  let emain_input = document.createElement("input");
  let pass_input = document.createElement("input");
  let login_button_div = document.createElement("div");
  let login_button = document.createElement("button");

  /**
   * Building the elements
   */
  right_container_div.classList.add("rightContainer");

  login_links_div.classList.add("loginRegisterLinks");

  sign_up_span.innerText = "Login Form";

  login_return_a.href = "#";
  login_return_a.innerText = "Don't have an account yet?";

  login_form_div.classList.add("form");

  login_form.action = "#";
  login_form.method = "POST";

  input_div.classList.add("inputElements");

  emain_input.type = "email";
  emain_input.placeholder = "E-mail";
  emain_input.required = "true";
  pass_input.type = "password";
  pass_input.placeholder = "Password";
  pass_input.required = "true";

  login_button_div.classList.add("buttons");
  login_button.innerText = "Login";
  login_button.type = "submit";

  /**
   * Putting all together
   */
  login_links_div.appendChild(sign_up_span);
  login_links_div.appendChild(login_return_a);

  login_button_div.appendChild(login_button);
  input_div.appendChild(emain_input);
  input_div.appendChild(pass_input);

  login_form.appendChild(input_div);
  login_form.appendChild(login_button_div);
  login_form_div.appendChild(login_form);

  right_container_div.appendChild(login_links_div);
  right_container_div.appendChild(login_form_div);
  return right_container_div;
}

function clear() {
  clear_body();
  clear_links();
}

function clear_body() {
  let body = document.querySelector("body");
  body.childNodes.forEach(child => {
    if (child.nodeName !== "SCRIPT") {
      body.removeChild(child);
    }
  });
}

function clear_links() {
  let head = document.querySelector("head");
  head.childNodes.forEach(elem => {
    if (elem.nodeName === "link") {
      head.removeChild(elem);
    }
  });
}

function add_css_link(css_file_name) {
  let head = document.querySelector("head");
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = css_file_name;
  head.appendChild(link);
}

function changePage() {
  console.log(location.pathname);
  //   if (location.pathname === "/index/") {
  // create_main_page();
  // create_register_page();
  // create_login_page();
  // create_live_party_page();
  create_parties_page();
  console.log("Login page");
  //   }
}

window.onload = changePage();

/**
 * This is for testing do not use
 */
function create_element(elem_info) {
  let elem = document.createElement(elem_info.elem_type);
  elem.classList.add(elem_info.class_name);
  elem_info.innerText ? (elem.innerText = elem_info.innerText) : null;
  return elem;
}

// history.pushState("haha", "Test", "/login");