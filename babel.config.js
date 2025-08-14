module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: `.${process.env.NODE_ENV}.env`,
        safe: true,
        allowUndefined: false,
      },
    ],
  ],
};