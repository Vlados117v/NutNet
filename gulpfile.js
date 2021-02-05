


// Установить все доп плагины из файла package.json нужно прописать npm install из него
var gulp = require('gulp');
var rename = require("gulp-rename"); //npm install gulp-rename или глобально для всего npm install -g gulp-rename
var sass = require("gulp-sass"); //npm install gulp-rename или глобально для всего npm install -g gulp-sass
var browserSync = require('browser-sync').create(); //npm install -g browser-sync
var reload = browserSync.reload; // из документации. для обновления страницы
var autoprefixer = require("gulp-autoprefixer"); // кроссплатформа





//################################################################//
//################# Из SCSS и SASS в CSS ############################//
//################################################################//



function css_style(done){
	gulp.src('scss/**/*.scss') // выбирает файл (любой файл scss)
	.pipe(sass({  //применяем функцию sass, можно и пустую
		errorLogToConsole: true,
		outputStyle: 'compressed'
	}))
	.on("error",console.error.bind(console))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(rename('style.css')) // переименовываем выходной файл
	.pipe(gulp.dest('css/')) //сохраняем 
	done(); 
}	

// функция отслеживатель
function watch_sass(){
	gulp.watch("./scss/**/*",css_style);  //watch("при изменении этих файлов",запускаем эту функцию) при изменении любых файлов
	//в этой папке. можно установить нужное расширение при желании  gulp.watch("./**/*.html").on("change", reload);
}	

//################################################################//
//################# Спрайты  ############################//
//################################################################//

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('path/to/output/'));
});

//################################################################//
//################# Синхронизация с браузером ############################//
//################################################################//



function sync(){  // инициализация плагина
	browserSync.init({
        server: {
            baseDir: "./" //папка с нашим проектом
        }
    });

}
function watch_sync(){
	gulp.watch("./**/*.html").on("change", reload); //при изменении html
	gulp.watch("./**/*.css").on("change", reload);	//при изменении css
	gulp.watch("./**/*.js").on("change", reload);	//при изменении js
	gulp.watch("./**/*.php").on("change", reload);		//при изменении php	 //watch("при изменении этих файлов").on("change", запускаем)
}


//########################################################################################################################################//
//########################!!!!!!!!!!!!!!!!!!!!!!!!!!! Вызовы !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!####################//
//########################################################################################################################################//



// Вызов из SASS в CSS, запуск синхронизации с браузером, запуск постоянного отслеживания изменений для релоуда страницы
gulp.task("default", gulp.parallel(watch_sass,sync,watch_sync));  //вызов по дефолту по команде gulp. Gulp.series(несколько функций)//gulp.task(css_style); вызов gulp css_style
gulp.task(css_style);




//########################################################################################################################################//
//########################!!!!!!!!!!!!!!!!!!!!!!!!!!! Энциклопедия !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!####################//
//########################################################################################################################################//

	gulp.src('scss/**/*.scss') // выбирает файл (любой файл scss)
	.pipe(rename('style.css')) // переименовываем выходной файл. Нужно подключать var rename = require("gulp-rename");
	 //npm install gulp-rename или глобально для всего npm install -g gulp-rename
	.pipe(gulp.dest('css/')) //сохраняем 
	gulp.watch("./**/*.php").on("change", reload);		//при изменении php	 
	//watch("при изменении этих файлов").on("change", эту функцию)