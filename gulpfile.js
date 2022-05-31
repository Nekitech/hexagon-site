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

// Объединение html файлов
const html = () => {
    return src('./src/index.html')
        .pipe(fileInclude())
        .pipe(dest('./public'))
        .pipe(browserSync.stream())

}
// SCSS
const scss = () => {
    return src('./src/style.scss', {sourcemaps: true})
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('./public/css', {sourcemaps: true}))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./public/css', {sourcemaps: true}))
}
// Наблюдение
const watcher = () => {
    watch('./src/**/*.html', html).on('all', browserSync.reload)
    watch('./src/**/*.scss', scss).on('all', browserSync.reload)
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

// Сборка
exports.dev = series(
    clear,
    parallel(html, scss),
    parallel(watcher, server)
)