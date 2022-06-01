// Подключения
const {src, dest, watch, series, parallel} = require('gulp')

// Плагины
const fileInclude = require('gulp-file-include')
const browserSync = require('browser-sync').create()
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')

// Объединение html файлов
const html = () => {
    return src('./src/index.html')
        .pipe(fileInclude())
        .pipe(dest('./public'))
        .pipe(browserSync.stream())

}
// SCSS
const scss = () => {
    return src('./src/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('./public/css'))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./public/css'))
}

//js
const js = () => {
    return src('./src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(dest('./public/js'))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('./public/js'))
}

// img
const img = () => {
    return src('./src/img/*.*')
        .pipe(newer('./public/img'))
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest('./public/img'))
}

// Наблюдение
const watcher = () => {
    watch('./src/**/*.html', html).on('all', browserSync.reload)
    watch('./src/**/*.scss', scss).on('all', browserSync.reload)
    watch('./src/**/*.js', js).on('all', browserSync.reload)
    watch('./src/img/*.*', img).on('all', browserSync.reload)
}

// Удаление директории
const clear = () => {
    return del('./public')
}

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    }) 
}

// Экспорты
exports.html = html
exports.watch = watcher
exports.clear = clear
exports.scss = scss
exports.js = js
exports.img = img

// Сборка
exports.dev = series(
    clear,
    parallel(html, scss, js, img),
    parallel(watcher, server)
)