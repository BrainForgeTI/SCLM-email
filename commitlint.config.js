module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w+:)\s(\w+)(?:\(([^)]*)\))?:\s(.+)$/u,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },
  rules: {
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'emoji-empty': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'emoji-empty': ({ emoji }) => {
          const validEmojis = [
            ':tada:',
            ':sparkles:',
            ':bug:',
            ':books:',
            ':test_tube:',
            ':wheelchair:',
            ':recycle:',
            ':construction:',
            ':wrench:',
            ':heavy_minus_sign:',
            ':heavy_plus_sign:',
            ':truck:',
          ];

          return [
            Boolean(emoji && validEmojis.includes(emoji.trim())),
            '❌ Commit message error: "emoji" is missing or invalid',
          ];
        },
      },
    },
  ],
};
