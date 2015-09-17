// Test entry file that pulls in all the spec files. Keeps tests to a single
// bundle, and allows us to use webpack in the tests.

// Make Promise globally available
require('expose?Promise!bluebird');

// Require all the test files
const testsContext = require.context('./', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// Require all the source files (to get full coverage)
const componentsContext = require.context('../src/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
