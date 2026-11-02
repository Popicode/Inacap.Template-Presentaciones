import unocss from '@unocss/eslint-config/flat';
import configPrettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import promise from 'eslint-plugin-promise';
import regexp from 'eslint-plugin-regexp';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import typescript from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

const SRC_GLOB = '**/*.{js,cjs,mjs,ts,cts,mts,vue}';
const TYPESCRIPT_GLOB = '**/*.{ts,cts,mts,vue}';
const VUE_GLOB = '**/*.vue';
const CODE_STYLE_GLOB = '**/*.{js,mjs,cjs,ts,cts,mts,vue,json}';

const ERROR = 'error';
const WARN = 'warn';
const OFF = 'off';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: [
			'**/dist/**/*',
			'**/.slidev/**/*',
			'**/.reports/**/*',
			'src/public/**/*',
			'samples/**/*',
			'**/node_modules/**/*',
		],
	},

	// #region ecmascript
	{
		files: [SRC_GLOB],
		languageOptions: {
			ecmaVersion: 2025,
			globals: { ...globals.browser, ...globals.node },
			sourceType: 'module',
		},
		rules: {
			'array-callback-return': ERROR,
			complexity: [WARN, 15],
			'default-case-last': WARN,
			'default-param-last': WARN,
			eqeqeq: WARN,
			'func-style': [WARN, 'declaration', { allowArrowFunctions: true }],
			'max-params': [WARN, 5],
			'no-async-promise-executor': ERROR,
			'no-console': [WARN, { allow: ['info', ERROR, WARN] }],
			'no-constant-binary-expression': ERROR,
			'no-debugger': WARN,
			'no-duplicate-case': ERROR,
			'no-else-return': WARN,
			'no-lonely-if': WARN,
			'no-self-compare': WARN,
			'no-throw-literal': ERROR,
			'no-unneeded-ternary': WARN,
			'no-useless-return': ERROR,
			'no-var': ERROR,
			'object-shorthand': WARN,
			'prefer-arrow-callback': WARN,
			'prefer-const': WARN,
			'prefer-template': WARN,
			'quote-props': [WARN, 'as-needed'],
			'require-await': ERROR,
			yoda: WARN,
		},
	},
	// #endregion

	// #region typescript
	typescript.configs.strict[0],
	{
		files: [TYPESCRIPT_GLOB],
		languageOptions: {
			parser: typescript.parser,
		},
		rules: {
			...typescript.configs.strict[1].rules,
			'@typescript-eslint/explicit-function-return-type': OFF,
			'@typescript-eslint/explicit-module-boundary-types': OFF,
			'@typescript-eslint/no-empty-object-type': OFF,
			'@typescript-eslint/no-explicit-any': OFF,
			'@typescript-eslint/no-extraneous-class': OFF,
			'@typescript-eslint/no-non-null-assertion': OFF,
			'@typescript-eslint/consistent-type-imports': [
				WARN,
				{
					fixStyle: 'inline-type-imports',
					prefer: 'type-imports',
				},
			],
			'@typescript-eslint/no-unused-vars': [
				WARN,
				{
					args: 'after-used',
					argsIgnorePattern: '^_.*',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_.*',
					ignoreRestSiblings: true,
					varsIgnorePattern: '^_.*',
				},
			],
		},
	},
	// #endregion

	// #region vue
	...vue.configs['flat/recommended'],
	{
		files: [VUE_GLOB],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				ecmaFeatures: { jsx: false },
				extraFileExtensions: ['.vue'],
				parser: typescript.parser,
				sourceType: 'module',
			},
		},
		rules: {
			'vue/block-lang': [ERROR, { script: { lang: 'ts' } }],
			'vue/block-order': [
				ERROR,
				{ order: ['script', 'template', 'style'] },
			],
			'vue/component-api-style': [ERROR, ['script-setup']],
			'vue/component-name-in-template-casing': [ERROR, 'PascalCase'],
			'vue/custom-event-name-casing': [ERROR, 'camelCase'],
			'vue/define-macros-order': [
				WARN,
				{ order: ['defineProps', 'defineEmits', 'defineSlots'] },
			],
			'vue/html-self-closing': [
				WARN,
				{
					html: {
						component: 'always',
						normal: 'always',
						void: 'always',
					},
				},
			],
			'vue/multi-word-component-names': OFF,
			'vue/no-unused-refs': WARN,
			'vue/prefer-true-attribute-shorthand': WARN,
			'vue/require-default-prop': OFF,
		},
	},
	// #endregion

	// #region sonar
	{
		files: [SRC_GLOB],
		plugins: { sonarjs },
		rules: {
			'sonarjs/cognitive-complexity': [WARN, 16],
			'sonarjs/no-collapsible-if': ERROR,
			'sonarjs/no-duplicate-string': [WARN, { threshold: 5 }],
			'sonarjs/no-duplicated-branches': ERROR,
			'sonarjs/no-identical-conditions': ERROR,
			'sonarjs/no-identical-expressions': ERROR,
			'sonarjs/no-identical-functions': ERROR,
			'sonarjs/no-inverted-boolean-check': ERROR,
			'sonarjs/no-redundant-boolean': ERROR,
			'sonarjs/no-small-switch': ERROR,
			'sonarjs/prefer-single-boolean-return': ERROR,
			'sonarjs/prefer-while': ERROR,
		},
	},
	// #endregion

	// #region promise
	{
		files: [SRC_GLOB],
		plugins: { promise },
		rules: {
			'promise/catch-or-return': ERROR,
			'promise/no-multiple-resolved': ERROR,
			'promise/no-nesting': WARN,
			'promise/param-names': WARN,
			'promise/prefer-await-to-then': WARN,
		},
	},
	// #endregion

	// #region unicorn
	{
		files: [SRC_GLOB],
		plugins: { unicorn },
		rules: {
			'unicorn/catch-error-name': WARN,
			'unicorn/error-message': ERROR,
			'unicorn/explicit-length-check': WARN,
			'unicorn/new-for-builtins': ERROR,
			'unicorn/no-for-each': WARN,
			'unicorn/no-instanceof-array': WARN,
			'unicorn/prefer-array-find': WARN,
			'unicorn/prefer-array-some': WARN,
			'unicorn/prefer-dom-node-append': ERROR,
			'unicorn/prefer-includes': WARN,
			'unicorn/prefer-modern-dom-apis': ERROR,
			'unicorn/prefer-node-protocol': ERROR,
			'unicorn/prefer-number-properties': WARN,
			'unicorn/prefer-query-selector': WARN,
			'unicorn/prefer-string-slice': WARN,
			'unicorn/throw-new-error': ERROR,
			'unicorn/filename-case': [
				WARN,
				{
					cases: { kebabCase: true, pascalCase: true },
					// allow conventional double-underscore folders (__tests__, __mocks__, __msw__)
					ignore: [/^__[a-z]+__$/u],
				},
			],
		},
	},
	// #endregion

	// #region perfectionist
	{
		files: [SRC_GLOB],
		plugins: { perfectionist },
		rules: {
			'perfectionist/sort-exports': WARN,
			'perfectionist/sort-named-exports': WARN,
			'perfectionist/sort-named-imports': WARN,
			'perfectionist/sort-imports': [
				WARN,
				{
					newlinesBetween: 'ignore',
					type: 'alphabetical',
				},
			],
		},
		settings: {
			perfectionist: {
				ignoreCase: false,
				order: 'asc',
				type: 'natural',
			},
		},
	},
	// #endregion

	// #region regexp
	{
		files: [SRC_GLOB],
		plugins: { regexp },
		rules: {
			'regexp/no-dupe-disjunctions': ERROR,
			'regexp/no-empty-capturing-group': ERROR,
			'regexp/no-useless-backreference': ERROR,
			'regexp/no-useless-flag': WARN,
			'regexp/prefer-character-class': ERROR,
			'regexp/prefer-d': ERROR,
			'regexp/prefer-w': ERROR,
		},
	},
	// #endregion

	// #region unocss
	{
		files: [VUE_GLOB],
		plugins: unocss.plugins,
		rules: {
			'unocss/order': WARN,
			'unocss/order-attributify': WARN,
		},
	},
	// #endregion

	// #region prettier
	// turns OFF every stylistic rule (core + vue/html-indent + ts) that would
	// fight Prettier, then re-enables a single `prettier/prettier` reporter.
	configPrettier,
	{
		files: [CODE_STYLE_GLOB],
		...prettier,
		rules: { 'prettier/prettier': WARN },
	},
	// #endregion
];
