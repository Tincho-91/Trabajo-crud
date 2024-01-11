const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const {validationResult} = require("express-validator")



const getjson = () => {
	const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users
}



const controller = {
create: (req, res) => {
    res.render("users-create-form")
},

// Create -  Method to storem
store: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()) {
    const user = req.body;
    user.id = Date.now();
    const users = getjson();
    users.push(user)
    

    const json= JSON.stringify(users);
    fs.writeFileSync(usersFilePath,json, "utf-8");
    res.redirect(`/`);
} else {
    res.render("users-create-form",{
        errors: errors.array(),
        old:req.body
    })
}
}}

module.exports = controller;