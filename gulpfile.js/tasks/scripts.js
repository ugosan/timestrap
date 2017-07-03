const gulp = require('gulp');
const concat = require('gulp-concat');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const vueify = require('vueify');
const browserify = require('browserify');

const scriptsFiles = require('../config.js').scriptsFiles;


gulp.task('scripts', ['scripts:vendor', 'scripts:app']);


gulp.task('scripts:vendor', () => {
    return gulp.src(scriptsFiles)
        .pipe(concat('bundle-vendor.js'))
        .pipe(gulp.dest('timestrap/static/js/'));
});


gulp.task('scripts:app', () => {
    gulp.src('timestrap/static_src/app.js', { read: false })
        .pipe(tap(function(file) {
            file.contents = browserify(file.path)
                .transform(vueify)
                .bundle()
                .on('error', function(err) {
                    console.log(err.toString());
                    this.emit('end');
                });
        }))
        .pipe(buffer())
        .pipe(concat('bundle-app.js'))
        .pipe(gulp.dest('timestrap/static/js/'));
});
