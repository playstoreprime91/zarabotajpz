const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const entitiesRouter = require('./entities');


const app = express();
app.use(cors());
app.use(bodyParser.json());


// mount
app.use('/api/entities', entitiesRouter);


// health
app.get('/health', (req, res) => res.json({ ok: true }));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Entities API listening on', PORT));
