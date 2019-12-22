const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://account_manager:LsoATtvOXmXmkkp2@mup-iiwhw.mongodb.net/test?retryWrites=true&w=majority";


hashPassword = function (password) {
    let hash = bcrypt.hashSync(password, 10);
    return hash;
}
//true if usename exists;false otherwise (resolve;resolve;reject if cannot conenct to db)
function checkUsername(name) {
    return new Promise(function (resolve, reject) {
        // create new client
        const client = new MongoClient(uri, { useNewUrlParser: true });
        // connect to mongodb server
        client.connect(err => {
            if(err)
                return reject(err);
            console.log("connected!");
            // select collection
            const collection = client.db("account_management").collection("user_credentials");

            // query
            line={}
            line.username=name
            collection.find(line).limit(1).count().then(result=>{
                if (result==0) resolve(false);
                else resolve(true);

            });
            client.close();
        });
    
        })

}
//true if mail exists;false otherwise (resolve;resolve;reject if cannot conenct to db)

function checkEmail(email) {
    return new Promise(function (resolve, reject) {
        // create new client
        const client = new MongoClient(uri, { useNewUrlParser: true });
        // connect to mongodb server
        client.connect(err => {
            if(err)
                return reject(err);
            console.log("connected!");
            // select collection
            const collection = client.db("account_management").collection("user_credentials");

            // query
            line={}
            line.email=email
            collection.find(line).limit(1).count().then(result=>{
                if (result==0) resolve(false);
                else resolve(true);

            });
            client.close();
        });
    
        })

}
//resolve true if user was added,reject err if cannot conn db or user could not be added

function addUser(name,pass,mail)
{   return new Promise(function (resolve, reject) {

    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("account_management").collection("user_credentials");
    // perform actions on the collection object
    if(err)
        reject(err)
    line={}
    line.username=name
    line.password=pass
    line.email=mail
    line.status=0
    collection.insertOne(line,function(err,result){
        if(err)
            reject(err);
        else
            resolve(true);
    });
    client.close();
    });

    })
}
// sends mail containing the activation code using nodemailer
// reject false if cannot send mail;resolve true otherwise
function sendMail(mail, code) {
    return new Promise(function (resolve, reject) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fiicatalog.verify@gmail.com',
                pass: '1rtU7AIC'
            }
        })

        var mailOptions = {
            from: 'fiicatalog.verify@gmail.com',
            to: mail,
            subject: 'Validation code',
            text: 'Use this code: ' + code + ' to validate your account!'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(false);
            } else {
                resolve(true);
                console.log('Email sent: ' + info.response);
            }
        });
    });

}
// generates a random code using randomstring.
// inserts generated code into codes table
// sends the code via nodemailer using the sendmail function
// resolve(true) if mail was successfully sent;resolve(false if couldnt be sent) reject err if err with opening db

function generateCode(email) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql');
        var randomString = require('randomstring');

        module.exports.getUsername(email).then(function (id) {
            const client = new MongoClient(uri, { useNewUrlParser: true });
            client.connect(err => {
            const collection = client.db("account_management").collection("verification");
            // perform actions on the collection object
            if(err)
                reject(false)
                
            let code = randomString.generate(20);
            console.log("codes:" + id + " " + code);

                line={}
                line.username=id
                line.activation_code=code
                collection.insertOne(line,function(err,result){
                    if(err)
                    reject(false);
                    else
                    resolve(true);
                });
                client.close();
                sendMail(email, code).then(function (bool) {
                    if (bool) resolve(true);
                    else resolve(false);
                }).catch((err) => setImmediate(() => { console.log(err); reject(-1); }));
            });

        });


    });

}

module.exports.validateCode = function (mail, code) {
    return new Promise(function (resolve, reject) {

        module.exports.getUsername(mail).then(function (userId) {
            console.log("user id:" + userId);
            const client = new MongoClient(uri, { useNewUrlParser: true });
            client.connect(err => {
            const collection = client.db("account_management").collection("verification");
            // perform actions on the collection object
            if(err)
                reject(err)
;            line={}
            line.username=name
            line.code=code
            collection.find(line).limit(1).count().then(result=>{
                if (result==0) resolve(false);
                else {
                    collection.deleteMany(line);
                    resolve(true);
                }

            });
            client.close();
            });
            
        }); 
    });

}
module.exports.activateAccount = function (mail) {
    return new Promise(function (resolve, reject) {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
        const collection = client.db("account_management").collection("user_credentials");
        // perform actions on the collection object
        if(err)
            reject(false)
    
        line.email=mail
        collection.updateOne(line,{$set:{status:1}},function(err,result){
            if(err)
            reject(false);
            else
            resolve(true);
        });
        client.close();
        });
    })
}
module.exports.checkStatus = function (username) {
    return new Promise(function (resolve, reject) {
        // create new client
        const client = new MongoClient(uri, { useNewUrlParser: true });
        // connect to mongodb server
        client.connect(err => {
            if(err)
                return reject(err);
            console.log("connected!");
            // select collection
            const collection = client.db("account_management").collection("user_credentials");

            // query
            line={}
            line.username=username
            collection.find(line).limit(1).then(result=>{
                if (result.status==0)
                {
                    resolve(false)
                }
                else resolve(true);

            });
            client.close();
        });

    })
}


module.exports.login = function (user_name, password) {
    return new Promise(function (resolve, reject) {
       // create new client
       const client = new MongoClient(uri, { useNewUrlParser: true });
       // connect to mongodb server
       client.connect(err => {
        if(err)
            return reject(err);
        console.log("connected!");
        // select collection
        console.log("username:"+user_name);
        const collection = client.db("account_management").collection("user_credentials");

        // query
        line={}
        line.username=user_name
        line.status=1
        collection.find(line).limit(1).then(result=>{
            if (result.status==0)
            {
                resolve(false)
            }
            else
            {
                let hash=result.password;
                console.log("password:"+hash);
                if(hash)
                resolve(bcrypt.compareSync(password,hash));
                else reject(false);
            }

        });
        client.close();
        });

    })
}
module.exports.updatePassword = function (email, password) {
    return new Promise(function (resolve, reject) {
      // create new client
      const client = new MongoClient(uri, { useNewUrlParser: true });
      // connect to mongodb server
      client.connect(err => {
       if(err)
           return reject(false);
       console.log("connected!");
       // select collection
       console.log("unhashed pass:"+password);
        let hash = hashPassword(password);
        console.log("new password:"+hash);

       const collection = client.db("account_management").collection("user_credentials");

       // query
       line={}
       line.email=email
       setter={}
       setter.password=password
       collection.updateOne(line,{$set:setter},function(err,result){
        if(err)
        reject(false);
        else
        resolve(true);
        });
        client.close();
        });

   }).catch((err) => setImmediate(() => { console.log(err); }));
}

module.exports.getUsername = function (email) {
    return new Promise(function (resolve, reject) {
        // create new client
        const client = new MongoClient(uri, { useNewUrlParser: true });
        // connect to mongodb server
        client.connect(err => {
        if(err)
            return reject(err);
        console.log("connected!");
        // select collection
        const collection = client.db("account_management").collection("user_credentials");

        // query
        line={}
        line.email=email
        collection.find(line).limit(1).then(result=>{
            
            resolve(result.username );
        });
        client.close();
        });

    })
}
module.exports.getId = function (username) {
    return new Promise(function (resolve, reject) {
        // create new client
        const client = new MongoClient(uri, { useNewUrlParser: true });
        // connect to mongodb server
        client.connect(err => {
        if(err)
            return reject(err);
        console.log("connected!");
        // select collection
        const collection = client.db("account_management").collection("user_credentials");

        // query
        line={}
        line.username=username
        collection.find(line).limit(1).then(result=>{
            
            resolve(result._id);
        });
        client.close();
        });

    })
}
module.exports.register = function (name, pass, email) {
    return new Promise(function (resolve, reject) {
        console.log("register " + name + " " + email + " " + pass);

        checkEmail(email).then(function (bool) {
            if (bool) reject('account already exists');
            else {

                checkUsername(name).then(function (bool1) {
                    if (bool1) reject('username already taken');
                    else {
                        addUser(name, email, pass).then(function (bool2) {
                            if (bool2) {
                                generateCode(email).then(function (bool3) {
                                    console.log("sent email generated code " + bool3);
                                    if (bool3) resolve('added succesfully');
                                    else reject("cannot resolve");
                                }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
                            }
                        }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
                    }
                }).catch((err) => setImmediate(() => { console.log(err); reject(err); }));
            }
        });
    })
}
module.exports.changePassword = function (email) {
    return new Promise(function (resolve, reject) {
        checkEmail(email).then(function (bool) {
            if (bool) {

                generateCode(email).then(function (bool1) {
                    console.log("code generated");
                    if (bool1) resolve(true);
                    resolve(false);
                });
            }
        })


    })
}
module.exports.changePassValidate = function (email, code, password) {
    return new Promise(function (resolve, reject) {


        module.exports.validateCode(email, code).then(function (bool) {
            if (bool) {
                module.exports.updatePassword(email,password).then(function (bool1) {
                    resolve(bool1);
                });
            }
            else resolve(false);
        });
    });
}


