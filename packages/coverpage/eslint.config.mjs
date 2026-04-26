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
          allowDefaultProject: [
            'test-page/*.ts'
          ],
          defaultProject: './tsconfig.spec.json',
        }
      },
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.js', '**/*.mjs']
  }
];
