async function routeSendContact(req, res){
    const post = {
        user_id: req.body.user_id,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        ip: req.ip,
        user_agent: req.headers['user-agent']
    };
    console.log(post);
    return res.status(200).json({message: "Thank you for contacting us"});
}

module.exports = {routeSendContact}