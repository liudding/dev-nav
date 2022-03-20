const mysql      = require('mysql');
const fs = require("fs");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'dev-nav'
});

connection.connect();

connection.query('SELECT * FROM apps', function (error, results, fields) {
  if (error) throw error;

  results = results.map(i => {
    i['tags'] = ( i.tags || '').split(',').filter(t => !!t);
    return i;
  })

  for (const app of results) {
    const str = JSON.stringify(app, null, true)
    fs.writeFileSync(`../data/apps/${app.id}.json`, str);
  }

});

connection.end();