/* Single source of truth for the public URL.
   Falls back to the Vercel deployment URL, then to localhost for dev. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const siteName = 'Yassin Koubeisy'
export const siteTitle = 'Yassin Koubeisy | Software Developer'
export const siteDescription =
  'Computer science student at Carleton University in Ottawa, specializing in AI, machine learning, and cybersecurity. Co-founder of Stratum Wealth.'
