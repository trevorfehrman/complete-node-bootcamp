const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avocadeo ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("file writte");

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Data has been written');
//       });
//     });
//   });
// });

///SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //OVERVEIW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'html'
    });

    const cardsHtml = dataObj.map(cardData => replaceTemplate(tempCard, cardData)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //PRODUCT
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'html'
    });
    const product = dataObj[query.id];
    console.log(query.id);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello, World!'
    });
    res.end('<h1>not found babyyyyy</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Yarrrrrrrr port 8000 yarrrrr');
});
