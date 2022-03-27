const Crawler = require('crawler');
var fs = require("fs");
const _ = require('lodash');
var cheerio = require("cheerio")
const dayjs = require("dayjs");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('src/data/appsdb');

db.serialize(function () {
    db.all("SELECT * FROM apps", function (err, rows) {
        findLogosLocally(rows);

        startCrawling(rows)
    })
});


db.close();


function saveApp(app) {
    var db = new sqlite3.Database('src/data/appsdb');

    var stmt = db.prepare("UPDATE apps SET name = ?, `desc` = ?, logo = ?, updated_at =? WHERE id = ?");
    stmt.run([app.name, app.desc, app.logo, dayjs().format('YYYY-MM-DD HH:mm:ss'), app.id]);
    stmt.finalize();
    db.close();
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

        if (!src || src.length >= 255) {
            return;
        }

        img.src = src;
        img.alt = alt;

        if ($img.attr('id') && $img.attr('id').toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1.5;
        }

        if (alt && alt.toLocaleLowerCase().indexOf('logo') >= 0) {
            img.score += 1;
        }

        if (src.toLocaleLowerCase().indexOf('logo') >= 0 ||
            src.toLocaleLowerCase().indexOf('apple-icon') >= 0) {
            img.score += 1;
        }

        if (src.toLocaleLowerCase().indexOf('favicon')) {
            img.score += 0.5;
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
    strictSSL: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
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
                if (title.indexOf(' - ') > 0) {
                    title = title.split(' - ')[0];
                }
                app.name = title.trim();
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

                if (fs.existsSync(`../../static/images/app-logos/${_.kebabCase(app.name)}.${ext}`)) {
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





