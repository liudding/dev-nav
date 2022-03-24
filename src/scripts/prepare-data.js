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
    if (app.mac) {
      app.tags.push('mac');
    }

    if (app.win) {
      app.tags.push('win');
    }

    if (app.domestic) {
      app.tags.push('国产');
    }

    const str = JSON.stringify(app, null, true)
    fs.writeFileSync(`src/data/apps/${app.id}.json`, str);
  }

});

connection.end();