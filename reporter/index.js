
var path = require('path');

function reportCoverage() {
  var coverageVar = '__coverage__';
  if (coverageVar in global) {
    var istanbul = require('istanbul');
    var reporters = process.env.ISTANBUL_REPORTERS || 'text-summary,html';
    var options = { dir: process.env.ISTANBUL_REPORT_DIR || '.tmp/coverage'};

    var collector = new istanbul.Collector();
    collector.add(global[coverageVar]);

    process.stdout.write('\n');
    reporters.split(',').forEach(function(reporter) {
      istanbul.Report.create(reporter, options).writeReport(collector, true);
    });
    process.stdout.write('\n');
  }
}

module.exports = function (runner) {
  var Reporter = require(path.join(
    'mocha/lib/reporters', process.env.MOCHA_REPORTER || 'spec'
  ));
  var reporter = new Reporter(runner); // eslint-disable-line no-unused-vars
  runner.on('end', reportCoverage);
};
