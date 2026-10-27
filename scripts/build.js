'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const sass = require('sass');

const cartridge = path.resolve(__dirname, '../cartridges/plugin_luckydraw/cartridge');
const entries = ["luckydraw-countdown.js"];
const styles = ["luckydraw.scss"];

// The browser modules are plain jQuery code from the storefront page; they need no framework bundle.
const compiler = webpack({
    mode: 'production',
    entry: Object.fromEntries(entries.map(function (file) { return [file.replace(/\.js$/, ''), path.join(cartridge, 'client/default/js', file)]; })),
    output: { path: path.join(cartridge, 'static/default/js'), filename: '[name].js' }
});

styles.forEach(function (file) {
    const css = sass.compile(path.join(cartridge, 'client/default/scss', file), { style: 'compressed' }).css;
    fs.mkdirSync(path.join(cartridge, 'static/default/css'), { recursive: true });
    fs.writeFileSync(path.join(cartridge, 'static/default/css', file.replace(/\.scss$/, '.css')), css);
});

compiler.run(function (error, stats) {
    compiler.close(function (closeError) {
        if (error || closeError || stats.hasErrors()) {
            console.error(error || closeError || stats.toString({ all: false, errors: true }));
            process.exitCode = 1;
            return;
        }
        console.log('Built ' + entries.length + ' script(s) and ' + styles.length + ' stylesheet(s) in cartridge/static/default.');
    });
});
