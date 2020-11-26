module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // 'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js']
      }
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'react-hook/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
  },
};
