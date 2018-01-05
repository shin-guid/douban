'use strict'

/*载入Gulp模块*/
var gulp = require('gulp');
/*编译less*/
var less = require('gulp-less');
/*拼接文件*/
var concat = require('gulp-concat');
/*最小化css*/
var cssnano = require('gulp-cssnano');
/*自动添加浏览器前缀*/
var autoprefixer = require('gulp-autoprefixer');
/*最小化js*/
var uglify = require('gulp-uglify');
/*最小化HTML*/
var htmlmin = require('gulp-htmlmin');
/*重命名*/
var rename = require('gulp-rename');
/*本地服务器*/
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jsFiles = [
  './node_modules/angular/angular.js',
  './node_modules/angular-route/angular-route.js'
];

//合并、压缩来自npm的js资源文件
gulp.task('npmscripts', function() {
  gulp.src(jsFiles)
  .pipe(concat('npm.js'))
  .pipe(gulp.dest('./dist/js'))
  .pipe(rename('npm.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
})

/*注册样式编译任务*/
gulp.task('style',function() {
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(autoprefixer({
		browsers:['last 2 versions']
	}))
	.pipe(concat('app.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(reload({
		stream: true
	}));
});

/*注册脚本合并压缩任务*/
gulp.task('script',function() {
	gulp.src('src/**/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(reload({
		stream: true
	}));
});

/*注册图片复制任务*/
gulp.task('image',function() {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(reload({
		stream: true
	}));
});

/*注册HTML压缩任务*/
gulp.task('html',function() {
	gulp.src('src/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'))
	.pipe(reload({
		stream: true
	}));
	gulp.src(['src/**/*.html','!src/index.html'])
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/views'))
	.pipe(reload({
		stream: true
	}))
});

/*注册服务任务*/
gulp.task('myServer',function() {
	browserSync({
		notify: false,
		port: 2015,
		server: {
			baseDir: ['dist']
		}
	});


	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/**/*.js',['script']);
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/images/*.*', ['image']);
});

/*注册默认任务*/
gulp.task('default',['style','script','image','html','myServer'],function(){
	gulp.run('npmscripts');
});