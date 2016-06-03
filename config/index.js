import _debug from 'debug';

const debug = _debug('app:config');
debug('Loading configuration.');

// ----------------------------------
// Environment
// ----------------------------------
export const ENV = process.env.NODE_ENV || 'development';
export const CSSENV = process.env.CSS_ENV || 'postcss-only';
export const environConfig = {
  'process.env.NODE_ENV': JSON.stringify(ENV),
  'process.env.CSS_ENV': JSON.stringify(CSSENV),

  // Include them in .eslintrc as well
  __DEV__: ENV === 'development',
  __PROD__: ENV === 'production',
  __TEST__: ENV === 'test',
  __CSSMODULES__: CSSENV === 'css-modules',
};

// ----------------------------------
// Server Configuration
// ----------------------------------
export const serverConfig = {
  host: 'localhost',
  port: process.env.PORT || 8080,
};
