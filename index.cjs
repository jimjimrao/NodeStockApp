const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));

const key = 'pk_4ff4c2aeffc3428e9204ed61ae9cc776';
// Call API function
function call_api(finishedAPI,ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=' + key, {json: true}, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200){
            // console.log(body);
            finishedAPI(body);
        };
    });
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "hello!!!!";
// Set handlebar index GET route
app.get('/', (req, res) => {
    call_api(function(doneAPI){
        res.render('home',{
            stock: doneAPI
        });
    },"GOOG");
});

// Set handlebar index POST route
app.post('/', (req, res) => {
    call_api(function(doneAPI){
        // posted_stuff = req.body.stock_ticker
        res.render('home',{
            stock: doneAPI,
        });
    },req.body.stock_ticker);
});

// create about page route

app.get('/about.html', (req, res) => {
    res.render('about');
});



// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port' + PORT)) ;
