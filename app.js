const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('search.ejs');
});

app.get('/table', (req, res) => {
  res.render('table.ejs');
});

app.get('/dash', (req, res) => {
  res.render('dash.ejs');
});

app.post('/registros', (req, res) => {
  res.render('results.ejs', { results: data });
});

app.get('/error', (req, res) => {
  res.render('error.ejs');
})

app.get('/logo', (req, res) => {
  res.readFile('/public/images/logo.png')
})

app.get('/styles', (req, res) => {
  res.sendFile(__dirname + '/public/css/styles.css')
})

app.get('/stylesdash', (req, res) => {
  res.sendFile(__dirname + '/public/css/style.css');
});

let data = [];

fs.readFile('data.csv', 'utf8', (err, csvData) => {
  if (err) throw err;
  Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      data = results.data;
    }
  });
});


app.post('/search', (req, res) => {
  let entrada1 = req.body.NOMBRE;
  let entrada2 = req.body.ID;
  let entrada3 = req.body.CORREGIMIENTO;
  let entrada4 = req.body.PROVINCIA;
  let entrada5 = req.body.PARTIDO;
  let entrada6 = req.body.DISTRITO;

  let entradas = [entrada1, entrada2, entrada3, entrada4, entrada5, entrada6];
  let countEntradas = entradas.filter(e => e).length; // Cuenta cuántas entradas tienen valor

  if (countEntradas !== 1) {
    return res.redirect('/error'); // Redirige a una página de error si más de una entrada tiene valor
  }

  let filtered_data = [];
  //PROVINCIA;CIRCUITO;DISTRITO;CORREGIMIENTO;CENTRO DE VOTACION;CEDULA;NOMBRE;FECHA;EDAD;SEXO;PARTIDO;CELULAR;DIRECCION

  // PROVINCIA;DISTRITO;CORREGIMIENTO;CENTRO DE VOTACION;CEDULA;NOMBRE;FECHA;SEXO;CELULAR;DIRECCION
  if (entrada1) {
    filtered_data = data.filter(row => String(row['NOMBRE']).toLowerCase().includes(entrada1.toLowerCase()));
  } else if (entrada2) {
    filtered_data = data.filter(row => String(row['CEDULA']).toLowerCase().includes(entrada2.toLowerCase()));
  } else if (entrada3) {
    filtered_data = data.filter(row => String(row['CORREGIMIENTO']).toLowerCase().includes(entrada3.toLowerCase()));
  } else if (entrada4) {
    filtered_data = data.filter(row => String(row['PROVINCIA']).toLowerCase().includes(entrada3.toLowerCase()));
    filtered_data = filtered_data.splice(0, 1000);
  } else if (entrada5) {
    filtered_data = data.filter(row => String(row['PARTIDO']).toLowerCase() === entrada5.toLowerCase());
    filtered_data = filtered_data.splice(0, 1000);
  } else if (entrada6) {
    filtered_data = data.filter(row => String(row['DISTRITO']).toLowerCase() === entrada6.toLowerCase());
    filtered_data = filtered_data.splice(0, 1000);
  }

  res.render('results.ejs', { results: filtered_data });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
