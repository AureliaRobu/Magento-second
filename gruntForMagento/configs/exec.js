'use strict';

let combo = require('./_combo'),
    themes = require('./_themes'),
    themeOptions = {},
    execOptions = {};

for(let name in themes) {
    themeOptions[name] = {
        cmd: combo.collector.bind(combo, name)
    };
}

execOptions = {
    all : {
        cmd: function () {
            let cmdPlus = (/^win/.test(process.platform) == true) ? ' & ' : ' && ',
                command;

            command = Object.keys(themes).map((name, idx) => {
                return combo.collector(name);
            }).join(cmdPlus);

            return 'echo ' + command;
        }
    },
    cache: {
        cmd: 'vendor/bin/cache-clean.js config layout block_html full_page'
    },
    block: {
        cmd: 'vendor/bin/cache-clean.js block_html layout full_page'
    },
    xml: {
        cmd: 'vendor/bin/cache-clean.js block_html layout full_page'
    }
};

module.exports = Object.assign(themeOptions, execOptions);
