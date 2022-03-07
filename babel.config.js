module.exports = api => {
    const preset = {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
        plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-class-properties',
            [
                'module-resolver',
                {
                    alias: {
                        '@adapters': './src/adapters',
                        '@core': './src/core',
                        '@external': './src/external',
                        '@main': './src/main',
                        '@shared': './src/shared'
                    }
                }
            ]
        ],
        sourceMaps: true
    }

    if (!api.env('test')) {
        preset.ignore = ['**/*.spec.ts', '**/*.test.ts', '**/__test__/*', '**/__mock__/*']
    }

    return preset
}
