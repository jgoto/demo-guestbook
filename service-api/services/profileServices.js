const {selectProfile, updateProfile} = require('../repositories/profileRepository');
const AppError = require('../errors/AppError');


async function viewProfile(uuid){
    if(!uuid || typeof uuid!=='string' || uuid.trim()===''){
        throw new AppError('No user id', 400); 
    }
    const results = await selectProfile(uuid);
        if(!results) { throw new AppError('Record not found', 404)};
        return results;
} 

module.exports = {viewProfile};