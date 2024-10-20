
const express = require('express');
const app = express(); 
const cors = require('cors'); 


require('dotenv').config();
 



app.use(express.json()); 
app.use(cors()); 

//{origin: '*'} allows cross origin access anywhere




app.get('/getLinks', async (req, res) => {

    console.log('/getLinks api req successful')
    const search = req.query.q;

    if (search) {

            const result =  await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&q=${search}&type=video&part=snippet&maxResults=15`);
        
            const r = await result.json(); 
            const e = await r.items; 
            const listOfLinks = e.map(i => i.id.videoId);
        
            res.status(200).send(listOfLinks); 
    } else {
        res.status(400).json({'msg': 'fetching links failed'});
    }
    


})

app.listen(process.env.PORT, () => {
    console.log('listening to requests on port', process.env.PORT); 
})