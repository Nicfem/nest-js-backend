module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		indent: [
			'error',
			'tab',
			{ SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }
		],
		'linebreak-style': 0,
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-var': 'error',
		'prefer-const': 'error',
		'comma-dangle': ['error', 'never'],
		camelcase: 'error',
		'no-else-return': 'error',
		'no-multi-spaces': 'error',
		'no-whitespace-before-property': 'error',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		]
	}
}
