const gulp = require("gulp");
const livereload = require("gulp-livereload");

gulp.task("watch-all", ["build-js", "build-css", "build-html", "build-bower"], () => {
  livereload.listen();
  gulp.watch("./src/app/**/*.js", ["build-js"]);
  gulp.watch("./src/app/**/*.css", ["build-css"]);
  gulp.watch("./src/app/**/*.html", ["build-html"]);
  // gulp.watch("./src/img/**/*", ["build-img"]);
  // gulp.watch("./src/bower_components/**/*", ["build-bower"]);
});
