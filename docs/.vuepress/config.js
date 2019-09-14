module.exports = {
  title: 'Kalabox',
  description: 'One click local development for Drupal and WordPress.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'stylesheet', href: '/styles/overrides.css'}],
  ],
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-74237404-1',
    },
    'autometa': {
      site: {
        name: 'Kalabox',
        twitter: 'devwithlando',
      },
      canonical_base: 'https://kalabox.io',
    },
    'robots': {
      host: 'https://kalabox.io',
    },
    'sitemap': {
      hostname: 'https://kalabox.io',
      exclude: ['/404.html'],
    },
  },
  themeConfig: {
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: false,
    repo: 'kalabox/kalabox',
    repoLabel: 'GitHub',
    search: false,
  },
};
