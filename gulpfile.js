var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require('del');

var cp = require('child_process');
var browserify = require('browserify');
var through2 = require('through2');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

var paths = {
  client: 'src/app.js',
  server: ['src/server.js','src/**','!src/templates/**','!src/app.js'],
  images: 'assets/img/**/*',
  templates: 'src/templates/*.*',
  src: 'src/**/*',
  toClean: ['.tmp', 'dist/*', '!dist/.git'],
  dist:'./dist'
};


gulp.task("default",['copy','scripts']);

gulp.task("scripts",['client','backend']);

gulp.task('watch', function() {
  gulp.watch(paths.src, ['scripts']);
});

gulp.task('server', ['default'], function(cb) {

  var started = false;
  var server = (function startup() {
    var cp = require('child_process');
    var child = cp.fork('dist/server.js', {
      env:  process.env
    } );
    child.once('message', function(message){
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }
        if (!started) {
          started = true;
          gulp.watch(paths.src, function() {
            console.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });
          cb();
        }
      }
    });
    return child;
  })();

  process.on('exit', function(){server.kill('SIGTERM')});

})

gulp.task('backend',['babelize']);

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
        .pipe(gulp.dest(paths.dist));
});

gulp.task('babelize',function(){
  return gulp.src(paths.server)
    .pipe(babel())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch:scripts', function() {
  gulp.watch('src/**/*.*', ['scripts']);
});

gulp.task('copy', ['clean'], function () {
        return gulp.src(paths.templates)
          .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
      del(paths.toClean, {dot: true});
});
