const gulp        = require('gulp'); /* импорт пакета галп */
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const rename      = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream()); /* после сохранения файла сасс страница будет обновляться */
});

gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles')); /* следит за обновлениями в файлах сасс */
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'icons', 'mailer', 'images'));
