const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');



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
    const user = req.body;
    user.id = Date.now();
    const users = getjson();
    users.push(user)
    

    const json= JSON.stringify(users);
    fs.writeFileSync(usersFilePath,json, "utf-8");
    res.redirect(`/`);
}
}

module.exports = controller;