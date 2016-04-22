import express from 'express';

const PORT = 8000; //@TODO move to conf
console.log('NODE_ENV', process.env.NODE_ENV);
const DEV = process.env.NODE_ENV === 'development';

const app = express();

app.set('views', './views')
app.set('view engine', 'pug')


//compile a list of css & js files to load on page
const STATIC_ASSETS = {
    js: [],
    css: []
};

//dev mode - use webpack dev server
if (DEV) {
    STATIC_ASSETS.js.push('http://localhost:3000/static/bundle.js')

//prod mode - read manifset generated by webpack
} else {
    let manifest = require('./assets.json');
    STATIC_ASSETS.css.push(manifest.main.css);
    STATIC_ASSETS.js.push(manifest.main.js);
}

app.get('*', function (req, res) {
    res.render('index', {DEV, STATIC_ASSETS});
});

app.listen(PORT, function() {
    console.log(`app started on port ${PORT}`);
});