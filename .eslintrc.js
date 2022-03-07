module.exports = {
    env: {
        node: true
    },
    parser: '@typescript-eslint/parser',
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier', 'eslint-plugin-import-helpers'],
    rules: {
        // base
        'no-console': 'error',
        'no-useless-constructor': 'off',
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

        // prettier
        'prettier/prettier': 'error',

        // import plugin
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/prefer-default-export': 'off',
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'always',
                groups: ['module', '/^@server/shared/', '/^@/', ['parent', 'sibling', 'index']],
                alphabetize: { order: 'asc', ignoreCase: true }
            }
        ]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                sourceType: 'module'
            },
            extends: ['plugin:@typescript-eslint/recommended'],
            plugins: ['@typescript-eslint'],
            rules: {
                // base
                'no-shadow': 'off',

                // typescript
                '@typescript-eslint/no-shadow': ['error'],
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/explicit-function-return-type': ['off'],
                '@typescript-eslint/no-namespace': ['off'],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        argsIgnorePattern: '^_'
                    }
                ],
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'interface',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^I[A-Z]',
                            match: true
                        }
                    }
                ],
                '@typescript-eslint/explicit-module-boundary-types': [
                    'warn',
                    {
                        allowArgumentsExplicitlyTypedAsAny: true
                    }
                ],

                // import plugin
                'import/no-named-as-default': 'warn',
                'import/no-named-as-default-member': 'warn',
                'import/no-default-export': 'warn',
                'import/extensions': [
                    'error',
                    'ignorePackages',
                    {
                        ts: 'never'
                    }
                ]
            }
        },
        {
            files: ['**/core/entities/*.ts'],
            rules: {
                'import/export': 'off',
                'no-use-before-define': 'off'
            }
        },
        {
            files: ['*.test.ts'],
            rules: {
                'import/no-extraneous-dependencies': 'off'
            }
        }
    ],
    settings: {
        'import/resolver': {
            typescript: {
                project: 'tsconfig.json'
            }
        }
    }
}
