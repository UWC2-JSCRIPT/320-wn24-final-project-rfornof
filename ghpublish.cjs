var ghpages = require('gh-pages');
console.log('publishing to gh-pages');
ghpages.publish('dist', function(err) {});