const gulp = require("gulp");
const livereload = require("gulp-livereload");

gulp.task("watch-all", ["build-app"], () => {
  livereload.listen();
  gulp.watch("./public/app/**/*.js", ["build-app"]);
});
