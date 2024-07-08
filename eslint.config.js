import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      indent: ['error', 2],
    },
  },
  {
    rules: {
      'vue/no-mutating-props': [
        'error',
        { shallowOnly: true },
      ],

      'indent': ['error', 2],
    },
    ignores: ['node_modules', '*.d.ts'],
  },
)
