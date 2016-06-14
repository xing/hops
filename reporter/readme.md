
# Hops Mocha Reporter

Hops uses a custom mocha reporter that supports both test and coverage reporting. It can be configured using a couple of environment variables:

### Configuration

##### `MOCHA_REPORTER`

If set to any of the stock mocha [reporters](https://mochajs.org/#reporters), this setting controls test result reporting. The default value is `spec`.

##### `ISTANBUL_REPORTERS`

If set to any of the stock istanbul [reporters](https://github.com/gotwarlost/istanbul/tree/master/lib/report), this setting controls test coverage reporting. The default value is 'text-summary,html'.

##### `ISTANBUL_REPORT_DIR`

This can be set to any directory that you want to use to save code coverage reports to. The default value is `.tmp/coverage`.
