const gulp = require("gulp");
const annotate = require("gulp-ng-annotate");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const mainBowerFiles = require("main-bower-files");
const livereload = require("gulp-livereload");

gulp.task("build-js", () => {
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
})

gulp.task("build-bower", () => {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest("./dist/bower"))
    .pipe(livereload());
});