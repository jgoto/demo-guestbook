const {login} = require('../services/authServices');

async function routeLogin(req, res){
    try {
        const {email, password} = req.body;
        const token = await login(email, password);
        res.json({token})
    } catch (error) {
        console.error("Something went wrong" + error);
    }
    
}

module.exports = {routeLogin};