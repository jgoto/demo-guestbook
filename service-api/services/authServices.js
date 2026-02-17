const supabase = require('../util/supabaseClient');
const jwt = require('jsonwebtoken');

/**
 * Logs a user in using Supabase email/password authentication
 * 
 * @param {string} email - User email address
 * @param {string} password - User password
 * @returns {Promise<{ id: string, token: string } | undefined>}
 * 
 * @description
 * On success, return an object containing the user ID and a signed JWT
 */
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
        return {
            'id': data.user.id,
            'token': token
        };
    } catch (error) {
        console.error(error);
    }
}

module.exports = {login};