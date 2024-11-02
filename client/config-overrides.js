const { override } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
    (config) => {
        // Add fallbacks for Node.js core modules
        config.resolve.fallback = {
            ...config.resolve.fallback,
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'), // Added stream fallback
            crypto: require.resolve('crypto-browserify'), // Ensure crypto is also included
            process: require.resolve('process/browser'), // Ensure process fallback is included
        };

        // Add polyfills for modules
        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser', // Correctly define process
            })
        );

        return config;
    }
);
