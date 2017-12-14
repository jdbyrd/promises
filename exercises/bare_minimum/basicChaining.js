/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
const helpers = require('./promisification');
const moreHelpers = require('./promiseConstructor');

const writeFilePathFunc = (jsonStuff, path, callback) => {
  fs.writeFile(path, JSON.stringify(jsonStuff), 'utf8', (err) => {
    if (err) { callback(err, null); }
    callback(null, null);
  });
};

const writeFilePathAsync = Promise.promisify(writeFilePathFunc);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return moreHelpers.pluckFirstLineFromFileAsync(readFilePath)
    .then( username => helpers.getGitHubProfileAsync(username) )
    .then( jsonStuff => writeFilePathAsync(jsonStuff, writeFilePath) )
    .catch((err) => { throw err; });
};
// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
