// Karma configuration
// Generated on Sat Nov 21 2015 18:31:32 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

//
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	  'vendor/assets/bower_components/jquery/dist/jquery.js',
	  'vendor/assets/bower_components/angular/angular.js',
	  'vendor/assets/bower_components/angular-animate/angular-animate.js',
	  'vendor/assets/bower_components/angular-aria/angular-aria.js',
	  'vendor/assets/bower_components/angular-mocks/angular-mocks.js',
	  'vendor/assets/bower_components/angular-material/angular-material.js',
	  'vendor/assets/bower_components/angular-material/angular-material-mocks.js',
	  'vendor/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
	  'vendor/assets/bower_components/angular-devise/lib/devise.js',
	  'vendor/assets/bower_components/angular-bootstrap/ui-bootstrap.js',
	  'vendor/assets/bower_components/angular-messages/angular-messages.js',
	  'vendor/assets/bower_components/angular-cookies/angular-cookies.js',
	  'vendor/assets/bower_components/angular-touch/angular-touch.js',
	  'vendor/assets/bower_components/ng-file-upload/angular-file-upload.js',
	  'vendor/assets/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
	  'vendor/assets/bower_components/ngImgCrop/compile/unminified/ng-img-crop.js',
	  'app/assets/javascripts/app.js',
      'app/assets/javascripts/**/*.js',
      'app/assets/test/**/*_spec.js',
      'app/assets/javascripts/**/*.html'

    ],

    preprocessors: {
        'app/assets/javascripts/**/*.html': ['ng-html2js']
    },
    
    ngHtml2JsPreprocessor: {
	  //   prependPrefix: '/app/'
	  //stripPrefix: ".*/code_base/murnow",
	  //stripPrefix: '/Users/ekaitz/code_base/murnow/app/assets/javascripts',
	  //prependPrefix: '/app/',
	  //prependPrefix: '/app/',
      moduleName: 'templates'
   
      // Function that transforms the path to look exactly like 
      // you have it in templateUrl in your Angular code
      //
      // Mine looks like this
      
     //  cacheIdFromPath: function(filepath) {
     //   return '/app/assets/' + filepath;
    //}
      //cacheIdFromPath: function(filepath) {
	    //  console.log("karma, cacheIdFromPath " + filepath);
        //return filepath.match(/\/app\/assets\/javascripts\/.*\.html/);
       // return filepath.match('app/assets/javascripts/','');
     // }
    },


    // list of files to exclude
    exclude: [
    ],





    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
