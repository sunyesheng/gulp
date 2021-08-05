// gulp提供的方法
// src 获取要处理的文件
// dest 输出文件
// task 建立任务
// watch 监控文件的变化

// gulp 插件 html文件压缩 压缩css JavaScript转换语法 less语法转换 公共文件包含 浏览器实现同步

// 引入gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include')
const less = require('gulp-less');
const csso = require('gulp-csso')
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


// 任务的名称 任务的回调函数
gulp.task('first', (done) => {
    console.log('45')
    // 1.使用gulp.src获取要处理的文件
    gulp.src('./src/css/base.css')
    //2.将获取的要处理文件复制到dist目录下
        .pipe(gulp.dest('dist/css'))
    done();
});

// html 1.压缩html文件 2.抽取文件公共代码
gulp.task('htmlmin', (done) => {
    gulp.src('./src/*.html')
        // 先抽取公共代码 然后压缩
        .pipe(fileinclude())
        // 压缩文件中的html中的代码
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
    done();
});

//css 1.less语法转换为css 2.css压缩
gulp.task('cssmin', (done) => {
    gulp.src(['./src/css/*.less','./src/css/*.css'])
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'))
    done();
})

//js 1.es6功能的转换 代码压缩
gulp.task('jsmin', (done) => {
    gulp.src('./src/js/*.js')
        .pipe(babel({
            //可以判断代码的运行环境 将代码转换为当前运行环境所支持的代码环境
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
    done()
})

// 复制文件夹
gulp.task('copydir', (done) => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'))
    
    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
    done()
})

// 构建任务 
gulp.task('default', gulp.series('first', 'htmlmin', 'cssmin', 'jsmin', 'copydir', (done) => {
    console.log('====================================');
    console.log('hello world');
    console.log('====================================');
    done()
}))