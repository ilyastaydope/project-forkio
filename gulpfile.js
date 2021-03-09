const gulp = require("gulp")
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
sass.compiler = require('node-sass');
const paths = {
    src: {
        scss: "./src/scss/**/*.scss",
        js: "./src/js/*.js",
        img: "./src/img/**/*"
    },
    build: {
        css: "./build/css/",
        js: "./build/js/",
        img: "./build/img/",
        self: "./build/"
    }
}
const buildJS = () => (
    gulp.src(paths.src.js)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.build.js))
    .pipe(browserSync.stream())
)
const buildCSS = () => (
    gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
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
        server: {
            baseDir: "./"
        }
    })
    gulp.watch(paths.src.scss, buildCSS).on("change", browserSync.reload)
    gulp.watch(paths.src.js, buildJS).on("change", browserSync.reload)
    gulp.watch(paths.src.img, buildIMG).on("change", browserSync.reload)
}
const build = gulp.series(
    buildCSS,
    buildJS,
    watcher
)

gulp.task("clean", cleanBuild)
gulp.task("buildCSS", buildCSS)
gulp.task("buildJS", buildJS)
gulp.task("default", gulp.series(cleanBuild, gulp.parallel(build)))