import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';

export default [
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: ['test-page/*.ts'],
          defaultProject: './tsconfig.spec.json',
        },
      },
    },
  },
  {
    // Test files use any-typed spy calls, private member access, and DOM mocks
    // that are inherently dynamic — disabling unsafe rules here has no safety cost.
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.js', '**/*.mjs'],
  },
];
