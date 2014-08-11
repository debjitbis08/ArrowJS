'use strict';

var spawn = require('child_process').spawn;

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('build-dev', function () {
    return browserify({
            debug: true,
            entries: [__dirname + '/src/main.js'],
            standalone: 'Arrows'
        })
        .bundle()
        .pipe(source('arrow.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function () {
    return gulp.src(['./src/*.js', './test/*.js', './gulpfile.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['build-dev'], function(cb) {
    var mochaPhantomjs = spawn('node_modules/.bin/mocha-phantomjs', ['test/test.html']);
    mochaPhantomjs.stdout.pipe(process.stdout);
    mochaPhantomjs.stderr.pipe(process.stderr);
    mochaPhantomjs.on('exit', function(code){
        if (code === 127) { print('Perhaps phantomjs is not installed?\n'); }
        cb();
        process.exit(code);
    });
});
