/* Single source of truth for the public URL.
   Falls back to the Vercel deployment URL, then to localhost for dev.

   Uses truthiness rather than ??, because an env var that exists but is blank
   is a real case (an empty field in the Vercel dashboard) and `"" ?? x` keeps
   the empty string, which would make new URL() throw during the build. */
function firstUrl(...candidates: (string | undefined)[]) {
  for (const candidate of candidates) {
    const value = candidate?.trim()
    if (!value) continue
    const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`
    try {
      return new URL(withProtocol).origin
    } catch {
      /* malformed, try the next candidate */
    }
  }
  return 'http://localhost:3000'
}

export const siteUrl = firstUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_URL)

export const siteName = 'Yassin Koubeisy'
export const siteTitle = 'Yassin Koubeisy | Software Developer'
export const siteDescription =
  'Computer science student at Carleton University in Ottawa, specializing in AI, machine learning, and cybersecurity. Co-founder of Stratum Wealth.'
