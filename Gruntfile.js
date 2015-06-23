module.exports = function(grunt) {
	
	grunt.initConfig({
		karma: {
		    unit: {
		        configFile: 'karma.conf.js'
		    }
		}
	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [])
}