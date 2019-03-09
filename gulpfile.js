"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var run = require('run-sequence');
var del = require("del");
var rename = require("gulp-rename");
var csso = require('gulp-csso');
var posthtml = require('posthtml');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');


gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
})

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    //.pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

/*gulp.task("html", function () {
return gulp.src("source/*.html")
.pipe(posthtml([
include()
]))
.pipe(gulp.dest("build"));
});*/

gulp.task('svgm', function () {
    return gulp.src('source/img/icon-*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/img'));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy"
  );
});


