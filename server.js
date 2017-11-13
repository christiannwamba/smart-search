const Express = require('express');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');
var algoliasearch = require('algoliasearch');
const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multipart middleware to
// parse files
const multipartMiddleware = multipart();

// Replace credentials
// with your Cloudinary credentials
cloudinary.config({
  cloud_name: 'cloud_name',
  api_key: 'key',
  api_secret: 'secret'
});

// Configure Algolia
// with your Algolia credentials
var algoliaClient = algoliasearch(
  'id',
  'key'
);
var algoliaIndex = algoliaClient.initIndex('index');

app.post('/upload', multipartMiddleware, function(req, res) {
  // Upload image to cloudinary
  cloudinary.v2.uploader.upload(
    // File to upload
    req.files.image.path,
    // AWS tagging transformation
    // Activate here by selecting a plan:
    // https://cloudinary.com/console/addons#aws_rek_tagging
    { categorization: 'aws_rek_tagging' },
    // Callback function
    function(err, result) {
      if (err) return res.send(err);
      res.json({ data: result });
    }
  );
});

app.post('/save', function(req, res) {
  // index record
  console.log(req.body)
  algoliaIndex.addObject(req.body, function(err, content) {
    if (err) return res.send(err);
    res.json(content);
  });
});

// app.listen('4000', () => console.log('Listening'));

module.exports = Webtask.fromExpress(app);
