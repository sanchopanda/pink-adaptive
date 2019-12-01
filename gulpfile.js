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
var posthtml = require('gulp-posthtml');
var include = require("posthtml-include");
var imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");


gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
})

gulp.task("copy_js", function(){
  return gulp.src([
    "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
})

gulp.task("images", function(){
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLebel: 3}),
      imagemin.jpegtran({progressive:true}),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("build/img"));
    
    
});

gulp.task("webp", function() {
  let src = "build/img/**/*.{png,jpg,svg}"; // Where your PNGs are coming from.
  let dest = "build/img"; // Where your WebPs are going.

  return gulp.src(src)
    .pipe(imagemin([
      webp({
        quality: 80
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(dest));
});

gulp.task("html", function () {
return gulp.src("source/*.html")
.pipe(posthtml([
include()
]))
.pipe(gulp.dest("build"))
});

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
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]).on("change", server.reload);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("build/*.html").on("change", server.reload);
  gulp.watch("source/img/**/*.{png,jpg,svg}", ["images"]).on("change", server.reload);
  gulp.watch("build/img/**/*.{png,jpg}", ["webp"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["copy_js"]).on("change", server.reload);
});




gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "html",
    "style"
  );
});



