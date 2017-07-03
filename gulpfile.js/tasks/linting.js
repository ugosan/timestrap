const gulp = require('gulp');

const eslint = require('gulp-eslint');
const sasslint = require('gulp-sass-lint');

const spawn  = require('child_process').spawn;


gulp.task('lint', ['lint:python', 'lint:sass', 'lint:es']);


gulp.task('lint:python', function(cb) {
    spawn(
        'pipenv',
        [
            'run',
            'flake8',
            '--exclude=venv,.venv,node_modules,migrations'
        ],
        {
            stdio: 'inherit'
        }
    ).on('exit', cb);
});


gulp.task('lint:sass', function() {
    return gulp.src('static_src/sass/**/*.s+(a|c)ss')
        .pipe(sasslint({
            rules: {
                'no-vendor-prefixes': 2,
                'no-ids': 0,
                'indentation': [
                    1,
                    {
                        'size': 4
                    }
                ],
                'property-sort-order': 0,
                'force-element-nesting': 0
            }
        }))
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError());
});


gulp.task('lint:es', function() {
    return gulp.src([
        'gulpfile.js/**/*.js',
        'timestrap/static_src/app.js',
        'timestrap/static_src/components/**/*.vue',
        'timestrap/static_src/mixins/**/*.js',
        'timestrap/static_src/plugins/**/*.js',])
        .pipe(eslint({
            'rules': {
                'indent': [
                    'error',
                    4
                ],
                'linebreak-style': [
                    'error',
                    'unix'
                ],
                'quotes': [
                    'error',
                    'single'
                ],
                'semi': [
                    'error',
                    'always'
                ]
            },
            'globals': [
                '$'
            ],
            'env': {
                'browser': true
            },
            'extends': 'eslint:recommended',
            'plugins': [
                'html'
            ],
            'parserOptions': {
                'ecmaVersion': 6,
                'sourceType': 'module'
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
