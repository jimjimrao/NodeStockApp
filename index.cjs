const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

// APIk3y pk_4ff4c2aeffc3428e9204ed61ae9cc776

const key = 'pk_4ff4c2aeffc3428e9204ed61ae9cc776';
request('https://cloud.iexapis.com/stable/stock/aapl/quote?token=' + key, {json: true}, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        console.log(body);
    };
});


// Set Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "hello!!!!";
// Set handlebar routes
app.get('/', (req, res) => {
    res.render('home',{
        stuff: otherstuff
    });
});

// create about page route

app.get('/about.html', (req, res) => {
    res.render('about');
});



// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port' + PORT)) ;
