// const http = require('http');
//
// const server = http.createServer((req, res) =>{
//   res.status = 200;
//   res.setHeader('Content-Type',  'text/plan');
//   res.end("Hello World");
// });
//
// server.listen(5000, () => {
//   console.log('server is running on port 3000');
// });
const express = require('express');
const morgan = require('morgan');


const app = express();


//settings
app.set('AppName', 'Express tutorial');
app.set('port', 5000);
app.set('view engine', 'ejs');

 // function logger(req, res, next){
 //   console.log(`Route received ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
 // }




app.use(express.json());

app.use(morgan('dev'));


app.get('/', (req, res) => {
  const data  = [{name: 'warley'}, {name: 'oliveira'}, {name: 'emma'}];
  res.render('index.ejs', {
    data: data
  })
})


app.all('/user', (req, res, next) => {
  console.log('You passsed here');
  next();
});
app.get('/index', (req, res) => {
  res.send('<h1>Get Get</h1>')
});

app.get('/user', (req, res) => {
  res.json({
    username: 'Warley',
    lastname: 'Oliveira'
  })
});



app.post('/user/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params)
  res.send('<h1>Post Request Received</h1>');
});

app.put('/contact/:id', (req, res) => {
  console.log(req.body);
  res.send(`<h1>User ${req.params.id} updated/h1>`);
});

app.delete('/user/:userId', (req, res) => {
  res.send(`<h1>User ${req.params.userId} deleted</h1>`);
});


app.use(express.static('public'));

app.listen(app.get('port'), () =>{
  console.log(app.get('AppName'))
  console.log('Server running on', app.get('port'));
});
