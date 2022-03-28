const fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('src/data/appsdb');

fs.existsSync('src/data/apps') || fs.mkdirSync('src/data/apps');


db.serialize(function () {
  db.all("SELECT * FROM apps", function (err, rows) {
    saveAppsToJson(rows)
  })
});


db.close();


function saveAppsToJson(results) {

  results = results.map(i => {
    i['tags'] = (i.tags || '').split(',').filter(t => !!t);
    return i;
  })

  for (const app of results) {
    if (!app.name) {
      continue;
    }
    
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
}