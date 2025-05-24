import { configApp } from '@adonisjs/eslint-config'
export default [
  ...configApp(),
  {
    rules: {
      'max-len': ['warn', { code: 150, ignoreStrings: true, ignoreTemplateLiterals: true }],
    },
  },
]
