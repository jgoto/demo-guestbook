const authRoutes = require('./authRoutes');
const avatarRoutes = require('./avatarRoutes');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');

function registerRoutes(app){
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/avatar', avatarRoutes);
}

module.exports = registerRoutes