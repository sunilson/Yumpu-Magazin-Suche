/*const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const admin = require("firebase-admin");


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.sendStatus(err.status || 500);
});

module.exports = app;
*/

const express = require('express');
const app = express();
const google = require('google')
const webshot = require('webshot');
const admin = require("firebase-admin");
const proxies = [
  "http://178.214.224.138:36127",
  "http://181.112.136.164:36127",
  "http://111.68.108.34:8080",
  "http://42.115.105.124:21776",
  "http://81.198.131.148:8080",
  "http://123.255.207.243:53281",
  "http://78.156.48.138:41258",
  "http://18.196.25.70:80",
  "http://192.99.226.30:80",
  "http://7213.148.222.155:53281",
  "http://212.237.15.108:8080",
]

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yumpu-magazine-scraper.firebaseio.com"
});

app.get('/searchGoogle', function (req, res, next) {
  const bucket = admin.storage().bucket("gs://yumpu-magazine-scraper.appspot.com");

  const language = "it"


  try {} catch (err) {
    console.log(err)
  }

  getMagazineLinks(language).then(searchResult => {
    console.log(searchResult)
    return res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    return res.sendStatus(400)
  })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  res.sendStatus(err.status || 500);
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening!');
});

async function getMagazineLinks(language) {
  return new Promise((resolve, reject) => {
    google.lang = language
    //google.tld = language
    google.resultsPerPage = 50
    google.requestOptions = {
      timeout: 10000,
      proxy: proxies[Math.floor(Math.random() * (proxies.length + 1))],
      jar: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en;q=0.5',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'DNT': 1
      }
    }
    var nextCounter = 0
    const result = []
    google(`site:yumpu.com/${language}/document/view Travel`, (err, res) => {
      if (err || !res) {
        console.log(err)
        reject(err)
      } else {
        for (var i = 0; i < res.links.length; ++i) {
          var link = res.links[i];
          if (link && link.href && link.href.startsWith(`https://www.yumpu.com/${language}/document/view`)) {
            result.push({
              title: link.title,
              url: link.href
            })
          }
        }
      }

      resolve(result)
      /*
      if (nextCounter < 1) {
        nextCounter += 1
        if (res.next) res.next()
      } else {
        resolve(result)
      }
      */
    })
  })
}

function getMagazineScreenshots(searchResult) {
  const promises = []
  searchResult.forEach(result => {
    promises.push(getScreenshot(result))
  });
  return Promise.all(...promises)
}

function getScreenshot({
  url,
  title
}) {
  return new Promise((resolve, reject) => {
    webshot(url.toString(), title + ".jpeg", {
      quality: 50
    }, function (err) {
      if (err) {
        console.log(err)
        reject(err)
      } else resolve(title + ".jpeg")
    });
  })
}