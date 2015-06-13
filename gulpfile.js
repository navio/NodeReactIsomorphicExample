var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var paths = {
  scripts: ['src/**/*.js', '!src/templates/**/*'],
  images: 'assets/img/**/*',
  templates: 'src/templates/*.*',
  toClean: ['.tmp', 'dist/*', '!dist/.git']
};

function compile(watch) {
  var bundler = watchify(browserify('./src/app.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('build', function() { return compile(); });

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
