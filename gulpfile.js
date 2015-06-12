var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');


var paths = {
  scripts: ['src/**/*.js', '!src/templates/**/*'],
  images: 'assets/img/**/*',
  templates: 'src/templates/*.*',
  toClean: ['.tmp', 'dist/*', '!dist/.git']
};

gulp.task("default",['copy','scripts']);

gulp.task('scripts',['babelize']);

gulp.task('babelize',function(){
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  //gulp.watch(paths.images, ['images']);
});

gulp.task('copy', ['clean'], function () {
        return gulp.src(paths.templates)
          .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
      del(paths.toClean, {dot: true});
});
