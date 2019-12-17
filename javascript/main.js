function changeContent(){
    let paragraf= document.querySelector('p')
    paragraf.innerText="Changed Content"
}



window.onload=()=>{
    console.log(location.pathname)
    let body = document.querySelector('body')
    let h = document.createElement('h1');
    h.innerText=`This is ${location.pathname}`
    body.appendChild(h)
}
