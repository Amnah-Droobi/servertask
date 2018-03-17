const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
let firstFile = fs.readFileSync('./users.json', 'utf-8');
let users = JSON.parse(firstFile);
let secondFile = fs.readFileSync('./drug.json', 'utf-8');
let drugs = JSON.parse(secondFile);
//// read users.json file 
app.get('/users', (req, res) => res.json(users)
);
/// read drugs.json file 
app.get('/drugs', (req, res) => res.json(drugs)
);

//// return user with  specified id 
app.get('/users/:id', (req, res) => {
    let obj = {
        body: req.body,
        param: req.params,
        path: req.path,
        query: req.query,
    };
    let user = users[req.params.id]
    if (!user) {
        res.status(404).json("Not Found");
    } else {
        res.json(user);
    }
});

////// add users to array

app.post('/users/:name/:email/:gender', (req, res) => {

    let obj = {
        name: req.params.name,
        email: req.params.email,
        gender: req.params.gender,
    };

    users = users.push(obj);
    res.json(obj);
    users = fs.writeFileSync('/users.json', JSON.stringify(obj), function (err) {
        console.log(err);
    });

    res.json(users);

});

//// Deleted users 

app.delete('/users/:id', (req, res) => {
    let usersID = users.filter(u => (u.id == req.params.id));
    res.json(users.splice(users.indexOf(usersID[0]), 1));
    fs.writeFile('/users.json', JSON.stringify(users.indexOf(usersID[0])), function (err) {
        console.log(err);
    });
    //res.json(usersID); 
});
///// update users 
app.all('/users/:id/:full_name/:drug/:email/:gender/:age', (req, res) => {
    let ind=0;
   let obj = {
       full_name: req.params.full_name,
       drug: req.params.drug,
       email: req.params.email,
       gender: req.params.gender,
       age: req.params.age,

   }
   let usersId = users.filter(u => {
       if (u.id == req.params.id) {
           ind = u.id;
       }
   })
   let updatedUsers = users.splice(ind, 1, obj);
   res.json(updatedUsers)
   fs.writeFileSync('./users.json', JSON.stringify(updatedUsers), function (err) { console.log(err) })
   // res.json(obj);
});













app.listen(3000, () => console.log("done"));