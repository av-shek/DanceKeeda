const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const port = 80;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view-engine', 'pug');
app.set('views', path.join(__dirname, 'pug'));

app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log('Successfully running on port ${port}');
})