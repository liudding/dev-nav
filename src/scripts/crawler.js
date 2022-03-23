const Crawler = require('crawler');
var fs = require("fs");
const _ = require('lodash');
var cheerio = require("cheerio")
const mysql = require('mysql');


// const csv = fs.readFileSync('../data/apps.csv', 'utf8').toString()
// var apps = Papa.parse(csv, {
//     header: true
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dev-nav'
});


connection.connect();
connection.query('SELECT * FROM apps', function (error, results, fields) {
    if (error) throw error;

    // results = results.map(i => {
    //   i['tags'] = ( i.tags || '').split(',').filter(t => !!t);
    //   return i;
    // })

    // for (const app of results) {
    //   const str = JSON.stringify(app, null, true)
    //   fs.writeFileSync(`../data/apps/${app.id}.json`, str);
    // }

    // console.log(results.length)

    findLogosLocally(results);

    startCrawling(results)

});
connection.end();



function saveApp(app) {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'dev-nav'
    });

    conn.connect();
    conn.query('UPDATE apps SET name = ?, `desc` = ?, logo = ? WHERE id = ?', [app.name, app.desc, app.logo, app.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            throw error
        };
    });
    conn.end();
}



function findLogoByRegex(html) {
    const imgReg = /<img.*?(?:>|\/>)/gi;

    let images = html.match(imgReg).map(item => {
        return {
            html: item,
            score: 0,
        }
    });

    images.forEach(img => {
        const $img = cheerio.load(img.html);
        const src = $img('img').attr('src');
        const alt = $img('img').attr('alt');
        const cls = $img('img').attr('class');

        if (alt && alt.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }

        if (src && src.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }

        if (cls && cls.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }
    });

    images.sort((a, b) => {
        return a.score < b.score;
    });

    images = images.filter((img) => {
        return img.score > 0
    })

    return images;
}

function findLogo($) {

    // 找 PWA icon
    let icons = $('link[rel=icon]').map((i, ele) => {
        return {
            ele,
            score: 0,
        }
    }).get()

    let icons2 = $('link[rel=apple-touch-icon]').map((i, ele) => {
        return {
            ele,
            score: 0,
        }
    }).get()

    icons = icons.concat(icons2);

    if (icons && icons.length > 0) {

        icons.forEach(img => {
            const $img = $(img.ele);

            const src = $img.attr('href');
            const sizes = $img.attr('sizes');

            img.src = src;

            if (sizes && sizes.split("x").length > 0) {
                img.size = sizes.split("x")[0];
            }

            delete img['ele']
        })

        icons.sort((a, b) => {
            return a.size > b.size ? -1 : 1
        })

        return icons[0];
    }



    let images = $('img').map((i, ele) => {
        return {
            ele,
            score: 0,
        }
    }).get()

    images.forEach(img => {
        const $img = $(img.ele);

        const src = $img.attr('src');
        const alt = $img.attr('alt');
        const cls = $img.attr('class');

        img.src = src;
        img.alt = alt;

        if (alt && alt.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }

        if (src && src.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }

        if (cls && cls.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }
    })

    images = images.map(i => {
        delete i['ele']
        return i;
    })



    images.sort((a, b) => {
        return a.score < b.score;
    });

    images = images.filter((img) => {
        return img.score > 0
    })

    if (images && images.length) {
        return images[0];
    }


    return null;

}



const crawler = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;

            const title = $('title').text()
            const desc = $('meta[name=description]').attr('content')


            const app = res.options.app;

            if (!app['logo']) {
                const logo = findLogo($);
                if (logo) {
                    let logoUrl;
                    if (logo.src.startsWith('//')) {
                        logoUrl = logo.src;
                    } else if (logo.src.indexOf('http') >= 0) {
                        logoUrl = logo.src
                    } else {
                        logoUrl = `${res.options.uri}/${logo.src.replace('./', '')}`;
                        logoUrl = logoUrl.replace('://', '::::').replace('//', '/').replace('::::', '://')
                    }

                    app['logo'] = logoUrl;
                }
            }

            if (!app.name) {
                app.name = title;
            }

            if (!app.desc) {
                app.desc = desc
            }

            saveApp(app)
        }
        done();
    }
});

function findLogosLocally(apps) {
    apps.forEach((app, index) => {

        if (!app.logo && app.name) {
            const exts = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
            for (const ext of exts) {

                if ( fs.existsSync(`../../static/images/app-logos/${_.kebabCase(app.name)}.${ext}`)) {
                    app.logo = `/images/app-logos/${_.kebabCase(app.name)}.${ext}`;
                    saveApp(app)
                    break;
                }
            }
           
        }
    })
}


function startCrawling(apps) {
    apps.forEach((app, index) => {

        if (!app.url) {
           return;
        }

        if (!app.logo || !app.desc || !app.name) {
            crawler.queue([{
                uri: app.url,
                app: app,
            }]);
        }
    })
}





