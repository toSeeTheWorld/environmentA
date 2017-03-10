var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// 静态服务器
gulp.task('server', ['sass', 'jsWatch'], function() {
    browserSync.init({
        server: 'public',   //静态服务器
        index: 'hello.html' //设置打开页面(默认index.html)
    });
    gulp.watch('public/**/*.js', ['jsWatch']);  //匹配public下各级文件夹的js文件
    gulp.watch('public/**/*.scss', ['sass']);
    gulp.watch('public/**/*.html').on('change', reload);
});

// scss
gulp.task('sass', function() {
    return gulp.src('public/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('public/css/stylesheets'))   //destination(目的地)
        .pipe(reload({stream: true}));
});
// js
gulp.task('jsWatch',function(){
    gulp.src('public/**/*.js')
        .pipe(browserSync.stream());
});

//////////
gulp.task('default', ['server']);
