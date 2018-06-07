var
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass= require('gulp-sass'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	clean = require('gulp-clean-css');

// Function css, js
let Common = {
	css(src, filename) {
		return gulp
			.src(src)
			// 이후 모든 카테고리에 해당하는 Task는 공통된 규칙을 따른다. /dev/scss/foldername/*.scss, /dev/scss/common.scss가 변경되면 해당 Task를 실행한다.
			.pipe(sourcemaps.init({loadMaps: true, debug: true}))
			// 소스맵 기록시작
			.pipe(concat(`${filename}.min.css`))
			// 파일 병합
			.pipe(sass().on('error', sass.logError))
			// Sass compile (에러발생시 로그)
			.pipe(clean({
			// minify 한다.
				keepBreaks: true
				// 개행옵션 추가
			}))
			.pipe(plumber({
				handleError: function (err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(sourcemaps.write('./maps'))
			// 소스맵 기록종료
			.pipe(gulp.dest('./dist/css'));
			// 해당 폴더로 저장.
	},
	// js(src, filename) {
	// 	return gulp
	// 		.src(src)
	// 		.pipe(sourcemaps.init({loadMaps: true, debug: true}))
	// 			.pipe(concat(`${filename}.min.js`))
	// 			.pipe(uglify())
	// 		.pipe(sourcemaps.write('./maps'))
	// 		.pipe(gulp.dest('./dist/js'));
	// },
	landing(src) {
		return gulp
			.src(src)
			.pipe(sourcemaps.init({loadMaps: true, debug: true}))
			// .pipe(concat('${filename}.min.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(clean({
				keepBreaks: true
			}))
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest('./dist/css/landing'));
	}
};

// Target : reset.scss, common.scss, gnb.scss, slick.scss, slick-theme.scss
gulp.task('common:css', function() {
	return Common.css(['./dev/scss/common.scss'], 'common')
});

// Uglify : common
// gulp.task('common:js', function() {
// 	return Common.js([
// 		'./dev/js/common/jquery.lazyload.min.js',
// 		'./dev/js/common/jquery.magnific-popup.js',
// 		'./dev/js/common/jquery.multiTab.js',
// 		'./dev/js/common/common.js',
// 		'./dev/js/common/listener.js',
// 		'./dev/js/tracking/CresendoScriptV60.js',
// 		'./dev/js/common/jquery.bxslider.min.js'
// 		], 'common');
// });

// Target : mainpage(online)
gulp.task('main:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/online.scss'
		], 'main');
});

// Target : mainpage(academy)
gulp.task('aca:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/academy.scss',
		'./dev/scss/register.scss'
		], 'aca');
});

// Uglify : main, ['common']
gulp.task('main:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/common/slick.js'
		], 'main')
});

// Target : Board
gulp.task('board:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/board.scss'
		], 'board');
});

// Uglify : board, ['common']
gulp.task('board:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/lecture/online.js',
		'./dev/js/common/layout.js'
		], 'board');
});

// Target : Customer
gulp.task('customer:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/customer.scss'
		], 'customer')
});

// Uglify : customer, ['common']
gulp.task('customer:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/common/slick.js'
		], 'customer')
});

// Target : Book
gulp.task('book:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/book.scss'
		], 'book')
});

// Uglify : book, ['common']
gulp.task('book:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/lecture/online.js',
		'./dev/js/common/layout.js'
		], 'book')
});

// Target : Lecture
gulp.task('lecture:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/lecture.scss'
		], 'lecture')
});

// Uglify : lecture, ['common']
gulp.task('lecture:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/lecture/online.js',
		'./dev/js/common/layout.js'
		], 'lecture')
});

// Target : Register
gulp.task('register:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/register.scss'
		], 'register')
});

// Uglify : register, ['common']
gulp.task('register:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/lecture/online.js'
		], 'register')
});

// Target : T_main
gulp.task('t_main:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/t_main.scss'
		], 't_main')
});

// Target : Teacher (editing)
gulp.task('teacher:css', ['common:css'], function() {
	return Common.css([
		'./dev/scss/common.scss',
		'./dev/scss/teacher.scss'
		], 'teacher')
});

// Uglify : teacher, ['common']
gulp.task('teacher:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/lecture/online.js',
		'./dev/js/common/layout.js'
		], 'teacher')
});

// Landing:compile
gulp.task('landing', function() {
	return Common.landing('./dev/scss/landing/**/*.scss');
});

// Target : reset.scss, common.scss, gnb.scss, slick.scss, slick-theme.scss
gulp.task('freepass:css', function() {
	return Common.css([
		'./dev/scss/common.scss'
		], 'freepass')
});

// Uglify : freepass, ['common']
gulp.task('freepass:js', function() {
	return Common.js([
		'./dist/js/common.min.js',
		'./dev/js/lecture/online.js',
		'./dev/js/common/layout.js'
		], 'freepass')
});

// Watch
gulp.task('css', function() {
	return gulp
		.watch(['./dev/scss/**/*.scss'], [
			'common:css',
			'main:css',
			'aca:css',
			'customer:css',
			'board:css',
			'book:css',
			'lecture:css',
			'freepass:css',
			't_main:css',
			'teacher:css'
			]);
		// 파일(watch 경로의 해당하는 파일)내용 변경이 감지되면 css Task를 실행
});

gulp.task('js', function() {
	return gulp
		.watch(['./dev/js/**/*.js'], [
			'common:js',
			'main:js',
			'customer:js',
			'board:js',
			'book:js',
			'lecture:js',
			'freepass:js',
			'teacher:js'
			]);
		// 파일(watch 경로의 해당하는 파일)내용 변경이 감지되면 js Task를 실행
});

gulp.task('set', ['common:css','main:css','customer:css','board:css','book:css','lecture:css','t_main:css','teacher:css','common:js','main:js','customer:js','board:js','book:js','lecture:js','teacher:js'], function() {
	return gulp
		.watch(['./dev/**/'], [
			'common:css',
			'main:css',
			'customer:css',
			'board:css',
			'book:css',
			'lecture:css',
			't_main:css',
			'teacher:css',
			'common:js',
			'main:js',
			'customer:js',
			'board:js',
			'book:js',
			'lecture:js',
			'teacher:js'
			]);
		// 파일(watch 경로의 해당하는 파일)내용 변경이 감지되면 css, js 모든 Task를 실행
});

// Default
gulp.task('default', ['css', 'js']);
// 기본실행 Task (cmd & bash : gulp) : Task 실행순서 (each dangi > sass > scripts > watch)