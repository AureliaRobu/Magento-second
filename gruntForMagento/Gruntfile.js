const gruntSetup = function(grunt) {
    'use strict';

    var path = require('path'),
        themes = require('./gruntForMagento/configs/_themes.js'),
        configDir = './gruntForMagento/configs',
        taskDir = './gruntForMagento/tasks/',
        tasks = [
            'prod',
            'compile',
            'dev',
            'css',
            'img',
            'js'
        ],
        defaultTasks;

    /**
     * Instantiate `time-grunt` to display task performance.
     */
    require('time-grunt')(grunt);

    tasks.forEach(function(task, idx) {
        require(taskDir + task)(grunt);
    });

    /**
     * Instantiate `load-grunt-config` to automatically load
     * configuration files from `configDir`.
     */
    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, configDir),
        init: true,
        jitGrunt: {
            staticMappings: {
                browsersync: 'browserSync',
                sprite: 'grunt-spritesmith'
            }
        }
    });

    defaultTasks = {

        // Default Task that Runs grunt-watch
        default() {
            for(let name in themes) {
                if(themes[name].grunt) {
                    grunt.task.run('clean:' + name);
                    grunt.task.run('exec:' + name);
                    grunt.task.run('concurrent:' + name + 'Sprite');
                    grunt.task.run('concurrent:' + name + 'Compile');
                }
            }
            grunt.task.run('jshint:appCode');
            grunt.task.run('babel:appCode');
            grunt.task.run('exec:cache');
            grunt.task.run('watch');
        },

        noexec() {
            for(let name in themes) {
                if(themes[name].grunt) {
                    grunt.task.run('concurrent:' + name + 'Sprite');
                    grunt.task.run('concurrent:' + name + 'Compile');
                }
            }
            grunt.task.run('jshint:appCode');
            grunt.task.run('babel:appCode');
            grunt.task.run('exec:cache');
            grunt.task.run('watch');
        },

        sync(name) {
            grunt.task.run('concurrent:' + name + 'Sprite');
            grunt.task.run('concurrent:' + name + 'Compile');
            grunt.task.run('jshint:appCode');
            grunt.task.run('babel:appCode');
            grunt.task.run('browserSync');
            grunt.task.run('watch');
        }
    };

    for(let taskName in defaultTasks) {
        grunt.registerTask(taskName, defaultTasks[taskName]);
    }
};

module.exports = gruntSetup;
