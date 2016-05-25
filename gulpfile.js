var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    rename    = require('gulp-rename'),
    minifycss = require('gulp-minify-css');

gulp.task('default', function(){
  gulp.run('html');
  gulp.run('css');
  gulp.run('js');
  gulp.run('server');
});

gulp.task('server', [], function() {
    return connect.server({
        root: [ 'public' ],
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(['./src/views/*.html', './src/views/**/*.html'])
        .pipe(gulp.dest('public/'));
});

gulp.task('css', function() {
  gulp.src('src/stylesheets/*.css')
    .pipe(autoprefixer({
            browsers: ['last 5 Chrome versions', 'iOS > 0', 'Android > 0', '> 5%'],
            cascade: true,
            remove: true
        }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('js', function() {
  gulp.src(['./src/javascripts/*.js','./src/javascripts/**/*.js'])
    .pipe(gulp.dest('public/assets/js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest('public/assets/js'));
    //.pipe(notify({ message: 'Scripts task complete' }));
});

// 自动加载：gulp-liveload、gulp-connect
// 自学 SCSS 语法 http://sass-lang.com