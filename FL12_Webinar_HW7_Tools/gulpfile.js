const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'dist',
    },
  });
  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('styles', () => gulp.src('src/scss/**/*.scss')
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(rename({ suffix: '.min', prefix: '' }))
  .pipe(autoprefixer())
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream()));

gulp.task('html', () => gulp.src('src/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream()));

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('images', () => gulp.src('src/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img')));


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'images')); // for development
// gulp.task('default', gulp.parallel('styles', 'html', 'images')); // for compiling
