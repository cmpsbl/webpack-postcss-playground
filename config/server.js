import _debug from 'debug';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { serverConfig, ENV, CSSENV } from './index';
import webpackConfig from '../webpack.config';

const debug = _debug('app:server');
const { port, host } = serverConfig;

debug(`Creating a Webpack dev server for:
  - ${ENV.toUpperCase()}
  - ${CSSENV.toUpperCase()}`);
const app = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  outputPath: webpackConfig.output.path,
  hot: true,
  historyApiFallback: true,
  progress: true,
  stats: {
    colors: true,
    chunks: false,
    errorDetails: true,
  },
});

debug(`Listening the server at http://${host}:${port}.`);
app.listen(port, host, (err) => {
  if (err) {
    return debug(err);
  }

  return debug('Running the server. This will take a moment...');
});
