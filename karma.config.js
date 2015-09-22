var _ = require('lodash'),
    path = require('path'),
    webpackConfig = require('./webpack.config'),
    testConfig = _.omit(webpackConfig, 'entry', 'output');

// Set up coverage loader
testConfig.module.preLoaders = [
  // Run normal babel loader on everything except source files
  {
    test: /\.js$/,
    exclude: [
      path.resolve('src/'),
      path.resolve('node_modules/')
    ],
    loader: 'babel?optional[]=runtime'
  },

  // Transpile and add coverage on source files using isparta
  {
    test: /\.js$/,
    include: path.resolve('src/'),
    loader: 'isparta'
  }
];

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

    files: [
      'node_modules/babel-core/browser-polyfill.js',
      'test/_setup.js'
    ],

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

    webpack: testConfig,

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
