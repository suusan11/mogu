const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require("gulp-plumber");

//BrowserSync
gulp.task("browserSyncTask", function () {
    browserSync({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task('default', gulp.series('browserSyncTask', function () {
    gulp.watch('./scss/**/*.scss', gulp.task('scss'));
    gulp.watch('**/*.html', gulp.task('html'));
}));

gulp.task('scss', function() {
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.reload({ stream:true }))
});


gulp.task('html', function() {
    gulp.src(['**/*.html'])
        .pipe(browserSync.reload({ stream:true }))
});
