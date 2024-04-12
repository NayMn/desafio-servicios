import express from 'express';
import { engine } from 'express-handlebars';

import { services } from './data/services.data.js'

const app = express();

// public directory
app.use(express.static('public'))

app.use('/css', express.static('node_modules/bootstrap/dist/css/'))
app.use('/js', express.static('node_modules/bootstrap/dist/js/'))
app.use('/js', express.static('node_modules/jquery/dist'))


// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { title: "home page 2.0" });
});


// creacion de ruta
app.get('/services', (req, res) => {
    res.render('services', { services: services });
});
// responder con informacion dinamica
app.get('/services/:name', (req, res) => {

    const nameUrl = req.params.name //qa

    // buscar con find en un array:
    const service = services.find((item) => item.url === `/services/${nameUrl}`)

    console.log(service)
    return res.render('service', { service })


})


app.listen(5000, () => console.log('servidor encendido en http:/localhost:5000'))



