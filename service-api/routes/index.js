const authRoutes = require('./authRoutes');
const avatarRoutes = require('./avatarRoutes');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');
const contactRoutes = require('./contactRoutes');

function registerRoutes(app){
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/avatar', avatarRoutes);
    app.use('/api/contact', contactRoutes);
}

module.exports = registerRoutes