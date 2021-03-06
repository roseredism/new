var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');

var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('jshint', function(){
	gulp.src('./src/scripts/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function(){
	var imgSrc = 'img/**/*',
	imgDst = './build/img';
	
	gulp.src(imgSrc)
	.pipe(changed(imgDst))
	.pipe(imagemin())
	.pipe(gulp.dest(imgDst))
});

gulp.task('htmlpage', function() {
	var htmlSrc = '*.html',
	htmlDst = './build';
	
	gulp.src(htmlSrc)
	.pipe(changed(htmlDst))
	.pipe(minifyHTML())
	.pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function(){
	gulp.src('js/**/*')
	.pipe(concat('script.js'))
	.pipe(stripDebug())
	.pipe(uglify())
	.pipe(gulp.dest('./build/js/'));
});

gulp.task('styles', function(){
	gulp.src('css/*.css')
	.pipe(concat('styles.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./build/css'));
});

gulp.task('default',['imagemin','htmlpage','scripts', 'styles'], function(){
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });
 
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
 
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });
});