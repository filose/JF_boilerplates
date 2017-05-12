import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import es2015Preset from 'babel-preset-es2015';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import gutil from 'gulp-util';

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './dist',
      middleware: [historyApiFallback()],
    },
    ghostMode: false,
  });
});

gulp.task('scripts', () => {
  browserify({
    entries: ['./src/js/index'],
    debug: true,
    transform: [
      babelify.configure({
        presets: [es2015Preset],
      }),
    ],
  })
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('eslint', () => {
  gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('styles', () => {
  gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass', 'node_modules/breakpoint-sass/stylesheets'],
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
    }))
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('watch', ['serve', 'eslint', 'scripts', 'styles'], () => {
  gulp.watch(['./src/js/*', './src/js/**/*'], ['eslint', 'scripts']);
  gulp.watch('./src/sass/**/*.scss', ['styles']);
});
