var gulp = require('gulp'), // Gulp
  connect = require('gulp-connect-php'), // php server
  browserSync = require('browser-sync'), // BrowserSync
  reload = browserSync.reload, // Reload
  watch = require('gulp-watch'), // Watcher
  path = require('path'), // Path
  prefixer = require('gulp-autoprefixer'), //Autoprefixer
  sass = require('gulp-sass'), // Sass/scss to css
  sourcemaps = require('gulp-sourcemaps'); // Sourcemaps
  
var path = {
  build: { 
      css: 'css/',
  },
  src: { 
      style: 'scss/main.scss',
      js: 'js/main.js',
  },
  watch: {
      style: 'scss/**/*.scss',
      js: 'js/**/*.js',
  },
    clean: './build'
};
  
gulp.task('css', function () {
  gulp.src(path.src.style) 
    .pipe(sourcemaps.init()) 
    .pipe(sass()) 
    .pipe(prefixer()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src(path.src.js) 
        .pipe(reload({stream: true})); 
});

// Run Server
gulp.task('serve', function () {
  connect.server({
    port: 4038
  }, function () {
    browserSync.init({
      proxy: '127.0.0.1:4038'
    });
  });
});

//Watch
gulp.task('watch', function () {
  "use strict";
   
  gulp.watch(['./scss/**/*.scss', './css/**/*.css'], ['css']);
  gulp.watch(['./js/**/*.js'], ['js']);
  gulp.watch(['./**/*.php']).on('change', reload);
});

gulp.task('start', ['serve', 'js', 'css', 'watch']);
