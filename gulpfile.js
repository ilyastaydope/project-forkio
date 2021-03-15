const gulp = require('gulp')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')

const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass');

const paths = {
    src: {
        scss: './src/scss/**/*.scss',
        js: './src/js/*.js',
        img: './src/img/**/*'
    },
    build: {
        css: './dist/css/',
        js: './dist/js/',
        img: './dist/img/',
        self: './dist/'
    }
}

const buildJS = () => (
    gulp.src(paths.src.js)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.build.js))
    .pipe(browserSync.stream())
)

const buildCSS = () => (
    gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 3 versions'] }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream())
)

const buildIMG = () => (
    gulp.src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.build.img))
    .pipe(browserSync.stream())
)

const cleanBuild = () => (
    gulp.src(paths.build.self, { allowEmpty: true })
    .pipe(clean())
)

const watcher = () => {
    browserSync.init({
        server: { baseDir: './' }
    })
    gulp.watch(paths.src.scss, buildCSS).on('change', browserSync.reload)
    gulp.watch(paths.src.js, buildJS).on('change', browserSync.reload)
    gulp.watch(paths.src.img, buildIMG).on('change', browserSync.reload)
}

const build = gulp.series(
    buildCSS,
    buildJS
)

gulp.task('dev', watcher)
gulp.task('build', gulp.series(cleanBuild, build, buildIMG))