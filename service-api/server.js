const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors());
app.use(express.json());
const postRoutes = require('./routes/postRoutes')

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/ping', (req, res) => {
    return res.json({message: "Pong"});
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});