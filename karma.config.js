const _ = require('lodash');
const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000,
    singleRun: true,

    files: ['test/_setup.js'],

    preprocessors: {
      'test/_setup.js': ['webpack']
    },

    frameworks: ['mocha', 'chai-sinon'],
    reporters: ['spec', 'coverage', 'threshold'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai-sinon',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-threshold-reporter',
      'karma-webpack'
    ],

    webpack: _.omit(webpackConfig, 'entry', 'output'),

    webpackMiddleware: {
      noInfo: true,
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
      subdir: '.'
    },

    thresholdReporter: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  });
};
