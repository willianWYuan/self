const gulp = require('gulp');
const connect = require('gulp-connect');
const combiner = require('stream-combiner2');


const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant'); //png图片压缩插件


const zip = require('gulp-zip');
const replace = require('gulp-replace');
const htmlreplace = require('gulp-html-replace');
const minihtml = require('gulp-minify-html');
const header = require('gulp-header');
const footer = require('gulp-footer');
const jade = require('gulp-jade');


const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');


const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const map = require('map-stream');

const concat = require('gulp-concat');
const order = require('gulp-order');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');



// const customerReporter = map(function(file, cb) {
// 	if (!file.jshint.success) {
// 		//打印出错误信息  
// 		console.log("	jshint fail in:" + file.path);
// 		file.jshint.results.forEach(function(err) {
// 			if (err) {
// 				console.log("		在 " + file.path + " 文件 " + err.error.line + "-" + err.error.character + " 错误: " + err.error.reason);
// 			}
// 		});
// 	}
// });


// gulp.task('lint', function() {
// 	gulp.src('./src/*.js')
// 		.pipe(jshint())
// 		//.pipe(jshint.reporter('default'))
// 		//.pipe(customerReporter)
// })
// 


gulp.task('imgs', function() {
	gulp.src('./src/img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()] //使用pngquant来压缩png图片
		}))
		.pipe(gulp.dest('./dist/img'))
})

gulp.task('index', function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'))
})


gulp.task('views', function() {
	var stream = gulp.src('./src/views/*.jade')
		//.pipe(minihtml())
		//.pipe(replace('title', 'foo'))
		.pipe(jade({
			pretty: true
		}))
		.pipe(rename('demo.html'))
		.pipe(gulp.dest('./dist/views'))
		.pipe(connect.reload());
	return stream;
})


gulp.task('csss', function() {
	gulp.src('./src/css/regroup.css')
		// .pipe(sass())
		.pipe(autoprefixer())
		.pipe(minify())
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
})


gulp.task('scripts', ['views'], function() {
	gulp.src(['./src/js/*.js', '!./src/e.js'])
		.pipe(order([
			"c.js",
			'*.js'
		]))
		.pipe(concat('all.js'))
		.pipe(babel())
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
})



gulp.task('server', function() {
	connect.server({
		root: './dist',
		//host: '192.168.1.88',
		port: 3000,
		livereload: true
	})
})



gulp.task('default', ['views', 'csss', 'scripts', 'index', 'server'], function() {
	gulp.watch('./src/views/*.jade', ['views'])
	gulp.watch('./src/css/*.scss', ['csss'])
	gulp.watch('./src/js/*.js', ['scripts'])

	// var watcher = gulp.watch('./src/**');
	// watcher.on('change', function (ev){
	// 	console.log('File' + ev.path + ' was ' + ev.type + ',running task..')
	// 	gulp.run(['scripts', 'csss'])
	// })
})


// gulp.task('default', function() {
// 	var combined = combiner.obj([

// 		gulp.src('./js/*.js'),
// 		concat('all.js'),
// 		babel(),
// 		gulp.dest('./dist'),
// 		rename('all.min.js'),
// 		uglify(),
// 		gulp.dest('./dist')
// 	]);


// 	combined.on('error', console.error.bind(console));

// 	return combined;
// })
// 
// 





