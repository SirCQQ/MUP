let gyroscope = new Gyroscope({frequency: 10});

gyroscope.addEventListener('reading', e => {
    // console.log("Angular velocity along the X-axis " + gyroscope.x);
    // console.log("Angular velocity along the Y-axis " + gyroscope.y);
    // console.log("Angular velocity along the Z-axis " + gyroscope.z);
    x=Math.abs(gyroscope.x)
    y=Math.abs(gyroscope.y)
    z=Math.abs(gyroscope.z)
    if (x>2||y>2||z>2){
        let body={
            user_id:getCookie("userid"),
            party_id:"VD2020",
            song_id:getCookie("song_id"),
            is_dancing:true
            
        }
        body=JSON.stringify(body)
        fetch("http://localhost:8004/sendUpdate",{
            method:"POST",
            body:body,
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(resp=>resp.json())
        .then(resp=>{
                    console.log(resp);
                    let result="";
                    result+=resp.song_list[0].song_id;
                    change_song(result)
          
        })
    }
});
gyroscope.start();



function get_song_list(){
    fetch("http://localhost:8003/songList?party_name=VD2020")
    .then(resp=>resp.json())
    .then(resp=>{
        console.log(resp);
    })
}


function change_song(song){
    let audio=document.querySelector('audio')
                audio.onended=()=>{
                setCookie("sond_id",song,7)
                // audio.src='http://localhost:3001/streamSong?song_id=+Toss a coin to your witcher'
                audio.src='http://localhost:3001/streamSong?song_id='+song;
                audio.play()
}
}