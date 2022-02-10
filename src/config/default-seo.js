/**
 * The default SEO Meta tags configuration
 * @type {{description: string, title: string, openGraph: {site_name: string, description: string, title: string, url: string}, titleTemplate: string}}
 */

const defaultSeoConfig = {
  title: 'Reframe. Positivise. Democratise. Mental Health.',
  titleTemplate: '%s | Thrive Cafe',
  description: `Welcome to ThriveCafe. Let's explore a program based approach to mental health with Thrive Skills for the workplace, and for life!`,
  openGraph: {
    url: `https://${process.env.NEXT_PUBLIC_SITE_URL}`,
    title: 'Reframe. Positivise. Democratise. Mental Health. | ThriveCafe',
    description: `Welcome to ThriveCafe. Let's explore a program based approach to mental health with Thrive Skills for the workplace, and for life!`,
    site_name: 'ThriveCafe',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
}

export default defaultSeoConfig
