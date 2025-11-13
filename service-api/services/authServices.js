const supabase = require('../util/supabaseClient');
const jwt = require('jsonwebtoken');

async function login(email, password){
    try {
        const {data, error} = await supabase.auth.signInWithPassword({
            'email': email,
            'password': password 
        })
        const token = jwt.sign(
            {
                email: data.user.email,
                id: data.user.id
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        if(error) throw error;
        return token;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {login};