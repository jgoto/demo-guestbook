async function routeSendContact(req, res){
    const contact = {
        user_id: req.body.user_id !== undefined ? req.body.user_id : '',
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        ip: req.ip,
        user_agent: req.headers['user-agent'],
        ...(req.body.company ? {honeypot: req.body.company} : {})
    };
    console.log(contact);
    return res.status(200).json({message: "Thank you for contacting us"});
}

module.exports = {routeSendContact}