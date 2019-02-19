module.exports = function (plop) {
	plop.setGenerator('component', {
		description: 'Create a component',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'What\'s the name?',
			validate: function (value) {
				if ((/.+/).test(value)) { return true; }
				return 'name is required';
			}
		}],
		actions: [{
			type: 'add',
			path: './src/components/{{properCase name}}/{{properCase name}}.jsx',
			templateFile: 'plop_templates/component/js.hbs'
		},{
    	type: 'add',
			path: './src/components/{{properCase name}}/{{properCase name}}.test.js',
			templateFile: 'plop_templates/component/test.js.hbs'
    },{
    	type: 'add',
			path: './src/components/{{properCase name}}/{{properCase name}}.scss',
			templateFile: 'plop_templates/component/scss.hbs'
    }]
	});
  	plop.setGenerator('container', {
		description: 'Create a container',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'What\'s the name?',
			validate: function (value) {
				if ((/.+/).test(value)) { return true; }
				return 'name is required';
			}
		}],
		actions: [{
			type: 'add',
			path: './src/containers/{{properCase name}}/{{properCase name}}.jsx',
			templateFile: 'plop_templates/container/js.hbs'
		},{
    	type: 'add',
			path: './src/containers/{{properCase name}}/{{properCase name}}.test.js',
			templateFile: 'plop_templates/container/test.js.hbs'
    },{
    	type: 'add',
			path: './src/containers/{{properCase name}}/{{properCase name}}.scss',
			templateFile: 'plop_templates/container/scss.hbs'
    },{
    	type: 'add',
			path: './src/containers/{{properCase name}}/{{properCase name}}.css',
			templateFile: 'plop_templates/container/scss.hbs'
    }]
	});
};