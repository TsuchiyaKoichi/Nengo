module.exports = function(grunt) {
	
	grunt.initConfig({
		karma: {
		    unit: {
		        configFile: 'karma.conf.js'
		    }
		},

		jshint: {
			files: ['src/*.js'],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint'])
}