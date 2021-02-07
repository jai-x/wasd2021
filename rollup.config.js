import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import postcssurl from 'postcss-url';

const { nodecg } = require('./package.json');

const format = (input, output, name) => {
  return {
    input: input,
    output: {
      file: output,
      format: 'iife',
    },
    plugins: [
      nodeResolve(),                               // resolve es modules used with `import`
      commonjs(),                                  // resolve common js modules used with `import`
      postcss({                                    // resolve css files used with `import`
        extract: true,
        plugins: [ postcssurl({ url: 'inline' }) ] // inline base64 encode css `url` usages
      }),
      html({ title: name }),                       // auto-generate a html file with linked css and js bundles
    ],
  };
};

const gfxSrcs = nodecg.graphics.map((gfxObj) => {
  const name = path.dirname(gfxObj.file);

  const input = path.join('src', 'graphics', name, `${name}.js`);
  const output = path.join('graphics', name, 'bundle.js');

  return format(input, output, name);
});

const dashSrcs = nodecg.dashboardPanels.map((dashObj) => {
  const name = path.dirname(dashObj.file);

  const input = path.join('src', 'dashboard', name, `${name}.js`);
  const output = path.join('dashboard', name, 'bundle.js');

  return format(input, output, name);
});

export default [...gfxSrcs,  ...dashSrcs];
