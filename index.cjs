const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

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


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port' + PORT)) ;
