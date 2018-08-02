// Plugins
const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const bulkSass = require("gulp-sass-bulk-import");
const prefixer = require("gulp-autoprefixer");
const sourceMaps = require("gulp-sourcemaps");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

// HTML

var htmlWatch = "**/*.html";

// CSS Folders

var styleSRC = "src/scss/dazzle.scss";
var styleDIST = "./dist/css/";
var styleWatch = "src/scss/**/*.scss";

// JS Folders

var jsSRC = "script.js";
var jsFolder = "src/js/";
var jsDIST = "./dist/js/";
var jsWatch = "src/js/**/*.js";
var jsFiles = [jsSRC];

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("style", function() {
  gulp
    .src(styleSRC)
    .pipe(sourceMaps.init())
    .pipe(bulkSass())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      prefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(styleDIST))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  jsFiles.map(function(entry) {
    return browserify({
      entries: [jsFolder + entry]
    })
      .transform(babelify, { presets: ["env"] })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(buffer())
      .pipe(sourceMaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourceMaps.write("./"))
      .pipe(gulp.dest(jsDIST))
      .pipe(browserSync.stream());
  });
});

gulp.task("default", ["style", "js"]);

gulp.task("watch", ["default", "browser-sync"], function() {
  gulp.watch(styleWatch, ["style", reload]);
  gulp.watch(jsWatch, ["js", reload]);
  gulp.watch(htmlWatch, reload);
});
