import express from 'express';
import { engine } from 'express-handlebars';

import { services } from './data/services.data.js'
import path, { dirname } from 'path'
import { title } from 'process';

const app = express();

const __dirname = import.meta.dirname;

// public directory
app.use(express.static(path.join(__dirname, '/public')))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js/')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

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

    //   undefined

    if (!service) {
        return res.render('404', { title: "no se encuentra el servicio" })
    }

    return res.render('service', { service })

});

app.get('*', (req, res) => {
    return res.status(404).render('404', { title: 'no se encuentra la pagina' });
})

app.listen(5000, () => console.log('servidor encendido en http:/localhost:5000'))



