var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');


var browserify = require('browserify');
var through2 = require('through2');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = {
  client: 'src/app.js',
  server: ['src/server.js','src/**','!src/templates/**','!src/app.js'],
  images: 'assets/img/**/*',
  templates: 'src/templates/*.*',
  toClean: ['.tmp', 'dist/*', '!dist/.git']
};

gulp.task('client', function () {
    return gulp.src(paths.client)
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, { debug: true })
                .transform(require('babelify'))
                .bundle(function (err, res) {
                    if (err) { return next(err); }

                    file.contents = res;
                    next(null, file);
                });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task("scripts",['client','server']);

gulp.task("default",['copy','scripts']);

gulp.task('server',['babelize']);

gulp.task('babelize',function(){
  return gulp.src(paths.server)
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['scripts']);
  //gulp.watch(paths.images, ['images']);
});

gulp.task('copy', ['clean'], function () {
        return gulp.src(paths.templates)
          .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
      del(paths.toClean, {dot: true});
});
