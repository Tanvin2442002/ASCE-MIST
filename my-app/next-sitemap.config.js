/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://asce-ce.mist.ac.bd/', // Update if different
  generateRobotsTxt: true,
  outDir: './public',
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin',
    '/admin/*',
    '/admin/**',
    '/app/admin',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/*'] },
    ],
  },
};