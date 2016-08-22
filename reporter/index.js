/**
 * @file reporter/index
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 */
'use strict';

var path = require('path');

/** @ignore */
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

/**
 * @description creates mocha reporter instance
 *
 * @class
 * @name Reporter
 *
 * @param {!Object} runner
 */
module.exports = function (runner) {
  var Reporter = require(path.join(
    'mocha/lib/reporters', process.env.MOCHA_REPORTER || 'spec'
  ));
  var reporter = new Reporter(runner); // eslint-disable-line no-unused-vars
  if (process.env.npm_config_coverage) {
    runner.on('end', reportCoverage);
  }
};
