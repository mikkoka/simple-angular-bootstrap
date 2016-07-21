const gulp = require("gulp");
const del = require("del");
const annotate = require("gulp-ng-annotate");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const mainBowerFiles = require("main-bower-files");
const inject = require("gulp-inject");
const livereload = require("gulp-livereload");

gulp.task("clean:dist", function () {
  return del(["./dist/**/*"]);
});

gulp.task("build", ["clean:dist"], () => {
  return gulp.start(["build-js-min", "build-css", "build-html", "build-bower"])
});

gulp.task("build-js", () => {
  return gulp.src("./src/app/**/*.js")
    .pipe(concat("app.min.js"))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

gulp.task("build-js-min", () => {
  return gulp.src("./src/app/**/*.js")
    .pipe(concat("app.min.js"))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

gulp.task("build-css", () => {
  return gulp.src("./src/app/**/*.css")
    .pipe(concat("styles.css"))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

gulp.task("build-html", () => {
  return gulp.src("./src/app/components/**/*.html")
    .pipe(gulp.dest("./dist/templates"))
    .pipe(livereload());
});

gulp.task("build-bower", () => {
  return gulp.src(["./src/bower_components/**/*.min.*", "./src/bower_components/**/fonts/*"])
    .pipe(gulp.dest("./dist/bower"))
    .pipe(livereload());
});

gulp.task("inject", () => {
  const index = gulp.src('./src/index.html');
  const sources = gulp.src([
    './dist/bower/**/bootstrap.min.css',
    './dist/bower/**/font-awesome.min.css',
    './dist/bower/**/ionicons.min.css',
    './dist/bower/**/jquery.min.js', 
    './dist/bower/**/angular.min.js', 
    './dist/bower/**/angular-ui-router.min.js', 
    './dist/bower/**/bootstrap.min.js'], {read: false});
  return index.pipe(inject(sources), {
      transform: function (filepath, file, i, length) {
        return "asdf";
      }
    })
    .pipe(gulp.dest('./'));
});

      // transform: function (filepath) {
      //   // if (filepath.contains("/dist")) {
      //     return '<li><a href="' + filepath + '">' + filepath + '</a></li>';
      //   // }
      //   // // Use the default transform as fallback: 
      //   // return inject.transform.apply(inject.transform, arguments);
      // }