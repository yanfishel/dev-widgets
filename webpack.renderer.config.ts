import type { Configuration } from 'webpack';
import * as path from "node:path";

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
