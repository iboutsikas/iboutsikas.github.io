import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';

export default [
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
        parserOptions: {
            tsconfigRootDir: import.meta.dirname,
            projectService: true,
        }
    },
    // Override or add rules here
    rules: {
        '@typescript-eslint/await-thenable': 'error',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    // Specifically disable typechecking for this file as it is
    // not part of the ts build
    files: ['eslint.config.mjs'],
  }
];
