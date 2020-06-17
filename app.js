const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const port = 80;

mongoose.connect('mongodb://localhost/registrationdetails', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/contactdetails', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const registrationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    class: String
  });

const contact = mongoose.model('contact', contactSchema);
const registration = mongoose.model('registration', registrationSchema);
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
app.get('/classinfo', (req, res)=>{
    res.status(200).render('classinfo.pug');
})
app.get('/register', (req, res)=>{
    res.status(200).render('register.pug');
})
app.get('/service', (req, res)=>{
    res.status(200).render('home.pug');
})

app.post('/contact', (req, res)=>{

    var contactdata = new contact(req.body);
    contactdata.save().then(()=>{
        res.send('Successfully saved!');
    }).catch(()=>{
        res.status(404).send('An error occured while saving the data!');
    })
})
app.post('/register', (req, res)=>{

    var registerdata = new registration(req.body);
    registerdata.save().then(()=>{
        res.send('Successfully saved!');
    }).catch(()=>{
        res.status(404).send('An error occured while saving the data!');
    })
})

app.listen(port, ()=>{
    console.log('Successfully running on port ' + port);
})