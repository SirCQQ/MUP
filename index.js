let express =require('express');
const app = express();
const path=require("path");
const port = 3000;

/**pentru /javascript/main.js returneaza main.js
 *Trebuie facut ceva de genul pentru fiecare ruta ex css, js, jpg etc  
 *Ceva general de preferat cu regex 
 */ 
app.get('/javascript/main.js',(req, res) => {
        res.sendFile(path.join(__dirname+'/javascript/main.js'))   
    })
/** 
 * Asta ar trebuii lasata asa, iar mai departe restul rutelor trebuie
 * facute pentru API 
 * 
 *  Orice ruta e, returneaza index.html  */   
app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname+'/index.html'))   
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))