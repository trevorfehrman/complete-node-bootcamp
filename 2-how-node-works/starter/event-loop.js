const fs = require('fs');

setTimeout(() => console.log('timer 1 done yo'), 0);
setImmediate(() => console.log('immediate done'));

fs.readFile('test-file.txt', () => {
  console.log('i/o finished');
});

console.log('top level');
