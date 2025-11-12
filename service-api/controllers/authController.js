const supabase = require('../util/supabaseClient');
const jwt = require('jsonwebtoken');

async function routeLogin(req, res){
    try {
        const {username, password} = req.body;
        console.log(username + ": " + password);    
    } catch (error) {
        console.error("Something went wrong");
    }
    
}

module.exports = {routeLogin};