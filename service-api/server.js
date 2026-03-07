const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const registerRoutes = require('./routes/index');
const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));
app.use(express.json());

registerRoutes(app);

app.get('/ping', (req, res) => {
    return res.json({message: "Pong"});
});

app.get('/python-ping', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3002/ping');
        const data = await response.json();
        res.json({python: data})        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'cannot reach python service'});
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});