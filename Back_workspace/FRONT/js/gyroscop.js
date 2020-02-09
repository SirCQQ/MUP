let gyroscope = new Gyroscope({frequency: 10});

gyroscope.addEventListener('reading', e => {
    x=Math.abs(gyroscope.x)
    y=Math.abs(gyroscope.y)
    z=Math.abs(gyroscope.z)
    if (x>2||y>2||z>2){
        let body={
            user_id:getCookie("userid"),
            party_id:"VD2020",
            song_playing_id:getCookie("song_id"),
            is_dancing:true
        }
        //transmitem la canalul de comunicare 'UpdateSong', body-ul respectiv.
        socket.emit("updateSong",body);


        socket.on("getUpdateSong",(resp)=>{
            console.log(resp);
                    let result="";
                    result+=resp.song_list[0].song_id;
                    setCookie("song_id",result,7)
                    change_song(result)
                    // create_songList(resp)
        })
        // console.log(body);
        // body=JSON.stringify(body)
        // fetch("http://localhost:8004/sendUpdate",{
        //     method:"POST",
        //     body:body,
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // })
        // .then(resp=>resp.json())
        // .then(resp=>{
        //             console.log(resp);
        //             let result="";
        //             result+=resp.song_list[0].song_id;
        //             setCookie("song_id",result,7)
        //             change_song(result)
        //             // create_songList(resp)
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
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
                setCookie("song_id",song,7)
                // audio.src='http://localhost:3001/streamSong?song_id=+Toss a coin to your witcher'
                audio.src=song;
                audio.play()
}
}
