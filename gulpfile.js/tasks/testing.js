const gulp = require('gulp');

const spawn = require('child_process').spawn;


gulp.task('test', (cb) => {
    const command = [ 'run', 'python', 'manage.py', 'test' ];
    const args = process.argv;

    if (args[3] == '--test' && args[4]) {
        command.push(args[4]);
    }

    spawn(
        'pipenv',
        command,
        {
            stdio: 'inherit'
        }
    ).on('exit', (code) => {
        process.exit(code);
    });
});


gulp.task('coverage', (cb) => {
    spawn(
        'pipenv',
        [
            'run',
            'coverage',
            'run',
            '--source=core,api',
            'manage.py',
            'test'
        ],
        {
            stdio: 'inherit'
        }
    ).on('exit', (code) => {
        if (code != 0) process.exit(code);
        spawn(
            'pipenv',
            [
                'run',
                'coverage',
                'report',
                '-m'
            ],
            {
                stdio: 'inherit'
            }
        ).on('exit', (code) => {
            if (code != 0) process.exit(code);
            return cb;
        });
    });
});
