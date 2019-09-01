const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const htmlInjector = require("bs-html-injector");
const reload = browserSync.reload;

function styles() {
  return gulp.src('./gulp/scss/**/*.scss')
   .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
}

function server(done) {
  browserSync.use(htmlInjector, {
    files: "/*.html"
  });
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: true
  });
  done();
}

function watch() {
  gulp.watch('./gulp/scss/**/*.scss', styles).on('change',reload);
  gulp.watch("./*.html").on("change", reload);
  gulp.watch("./static/js/**/*.js").on("change", reload);
}

gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task("default", gulp.parallel(server, watch));