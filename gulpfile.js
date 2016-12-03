//引入gulp
var gulp=require('gulp');

//引入concat合并插件
var concat=require('gulp-concat');

//引入压缩插件
var uglify=require('gulp-uglify');
//引入webserver插件
var webserver=require('gulp-webserver');
//引入sass插件
var sass=require('gulp-sass');
//引入minify 压缩css文件
var minify=require('gulp-minify-css');
//引入gulp-webpack插件
var webpack=require('gulp-webpack');
//引入重命名插件
var named=require('vinyl-named');
//引入rev
var rev=require('gulp-rev');
//引入rev-collector
var revCollector=require('gulp-rev-collector');
var url=require('url');
var fs=require('fs');
//构建一个copy文件的任务
gulp.task('copy-index',function(){
	gulp.src('./index.html')
		.pipe(gulp.dest('./app/'))
})
//构建一个合并的任务
gulp.task('concat',function(){
	gulp.src(['./app/src/scripts/libs/script1.js','./app/src/scripts/libs/script2.js'])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./app/src/diet'))
})
//构建一个压缩任务
gulp.task('uglify',function(){
	gulp.src('./app/src/scripts/libs/jquery1.3.js')
		.pipe(uglify())
		.pipe(gulp.dest('./app/src/diet'))
})

//创建一个服务
gulp.task('webserver',function(){
	gulp.src('./')
		.pipe(webserver({
			port:8080,
			livereload:true,  //页面保存浏览器自动刷新
			directoryListing:{  //目录结构的配置
				enable:true,  //显示目录
				path:'./'  //显示具体路径下的目录
			},
			 middleware:function(req,res,next){
                var urlObj = url.parse(req.url,true);
                switch(urlObj.pathname){
                	case '/api/getLivelist.php':
                	res.setHeader("Content-type","application/json");
                	fs.readFile('./mock/livelist.json','utf-8',function(err,data){
                        res.end(data);
                	});
                	return;
                	case '/api/getLivelistmore.php':
                	res.setHeader("Content-type","application/json");
                	fs.readFile('./mock/livelist-more.json','utf-8',function(err,data){
                        res.end(data);
                	});
                    return;
                }
                next();
            }
		}))
})
var sassFiles=['./app/src/styles/**/*.scss'];
var cssFiles=['./app/src/styles/*.css'];
var jsFiles=['./app/src/scripts/app.js'];
// 编译scss
gulp.task('sass',function(){
	gulp.src(sassFiles)
		.pipe(sass())
		.pipe(minify())
		.pipe(gulp.dest('./app/prd/styles'))
})
//编译css
gulp.task('css',function(){
	gulp.src(cssFiles)
		.pipe(minify())
		.pipe(gulp.dest('./app/prd/styles'))
})
//实现js的模块化
gulp.task('packjs',function(){
	gulp.src(jsFiles)
		.pipe(named())
		.pipe(webpack({
			output:{
				filename:'[name].js'
			},
			modules:{
				loaders:[
					{
						test:/\.js$/,
						loader:'imports?defind=>false'
					}
				]
			}
		}))
		.pipe(uglify().on('error',function(e){
			console.log('\x07',e.lineNumber,e.message);
			return this.end();
		}))
		.pipe(gulp.dest('./app/prd/scripts'))
})
var cssDist=['./app/prd/styles/app.css'];
var jsDist=['./app/prd/scripts/app.js'];
// 版本控制
gulp.task('ver',function(){
	gulp.src(cssDist)
		.pipe(rev())    //生成name + md5 文件名
		.pipe(gulp.dest('./app/prd/styles'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./app/ver/styles'))
	gulp.src(jsDist)
		.pipe(rev())    //生成name + md5 文件名
		.pipe(gulp.dest('./app/prd/scripts'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./app/ver/scripts'))
})
// 让html文件自动将入口文件的文件名替换为md5加密之后的名称
gulp.task('html',function(){
	gulp.src(['./app/ver/**/*.json','./app/*.html'])
		.pipe(revCollectr())
		.pipe(gulp.dest('./app'))
})
//监听文件
gulp.task('watch',function(){
	gulp.watch('./index.html',['copy-index']);
	// gulp.watch('./app/src/scripts/libs/*.js',['concat']);
	gulp.watch(sassFiles,['sass']);
	gulp.watch(cssFiles,['css']);
	gulp.watch('./app/src/scripts/**/*.js',['packjs'])
})
gulp.task('min',['ver','html'])
gulp.task('default',['watch','webserver']);