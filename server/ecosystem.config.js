module.exports = {
	apps: [
		{
			name: 'banner_manager_server',
			script: './src/main.ts',
			watch: ['src'],
			ignore_watch: ['node_modules'],
			interpreter: 'node_modules/.bin/ts-node',
			node_args: ['--require=tsconfig-paths/register'],
		},
	],
};