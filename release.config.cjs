module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: './package',
      },
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false,
      },
    ],
    '@semantic-release/git',
  ],
};
