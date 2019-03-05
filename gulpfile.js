const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const bs = require('browser-sync').create();

function sassBuild() {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream())
}

function browserSync(done) {
    bs.init({

        server: {
            baseDir: "./",
        },
        port: 8080
    });
    done();
}

function reload(done) {
    bs.reload();
    done();
}

function watchAllFiles() {
    gulp.watch('scss/**/*.scss', sassBuild);
}

const watch = gulp.parallel(watchAllFiles, browserSync);

exports.watch = watch;
exports.default = watch;
