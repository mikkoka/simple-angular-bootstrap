const gulp = require("gulp");
const annotate = require("gulp-ng-annotate");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const livereload = require("gulp-livereload");

gulp.task("build-app", () => {
  return gulp.src("public/app/**/*.js")
    .pipe(concat("app.min.js"))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

gulp.task("htmlify", () => {
  gulp.src('public/app/**/*.html')
    // .pipe(htmlify())
    .pipe(gulp.dest('dist/'));
})

var mainBowerFiles = require('main-bower-files');

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest("./dist/"));
});

var inject = require('gulp-inject');
// var angularFilesort = require('gulp-angular-filesort’);

gulp.task('index', function () {
  var target = gulp.src('./index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/*.js', './dist/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('inject', function() {
  var injectFiles = gulp.src('dist/*.js').pipe(angularFilesort());
  var injectOptions = {
    ignorePath: ['src']
  };

  return gulp.src('src/*.html')
    .pipe(inject(injectFiles))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('build'));
});

// var $ = require('gulp-load-plugins')();
// var wiredep = require('wiredep').stream;
// gulp.task('inject', function() {
//
// var wiredepOptions = {
//   directory: 'public/bower_components',
//   exclude: [/bootstrap-sass-official/, /bootstrap\.css/]
// };
//
// return gulp.src('public/app/**/*.html')
//   .pipe(wiredep(wiredepOptions))
//   .pipe(gulp.dest('dist'));
// });
