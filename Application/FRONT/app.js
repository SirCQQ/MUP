let express = require("express")

// mongoose.connect("mongodb://localhost/MUPUsers",{useNewUrlParser:true,  useUnifiedTopology: true })
// const db= mongoose.connection
// db.on('error',(err)=>{console.log(err)})
//
// db.once('open',()=>{
//     console.log("Connected to database")
// })
//

let app = express()
// app.use(express.static("index"))

app.get("/css/*", (req, res) => {
    console.log(__dirname + req.path)
    res.sendFile(__dirname + req.path)
})

app.get("/logoMup/*", (req, res) => {
    console.log(__dirname + req.path)
    res.sendFile(__dirname + req.path)
})
app.get("/backgrounds/*", (req, res) => {
    console.log(__dirname + req.path)
    res.sendFile(__dirname + req.path)
})

app.get("/js/*", (req, res) => {
    console.log(__dirname + req.path)
    res.sendFile(__dirname + req.path)
})

// app.post()



app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index/index.html")
})

app.listen(5500,function () {
    console.log("Open at port 5500")
})