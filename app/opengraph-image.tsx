import { ImageResponse } from 'next/og'

/* Generated at build time, so link previews need no image asset in the repo. */
export const alt = 'Yassin Koubeisy, software developer in Ottawa'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#06070c',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* top rule */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#22d3ee',
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#6f78a0',
            }}
          >
            Ottawa, Ontario
          </div>
        </div>

        {/* name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 128, fontWeight: 800, color: '#e8eaf6', lineHeight: 1 }}>
            YASSIN
          </div>
          <div style={{ fontSize: 128, fontWeight: 800, color: '#6366f1', lineHeight: 1 }}>
            KOUBEISY
          </div>
          <div style={{ fontSize: 30, color: '#9ba3c7', marginTop: 28, maxWidth: 900 }}>
            CS at Carleton. AI, machine learning and cybersecurity. Co-founder of Stratum Wealth.
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['Python', 'Java', 'Next.js', 'Spring Boot', 'RAG'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#9ba3c7',
                border: '1px solid rgba(148,163,255,0.28)',
                padding: '10px 20px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
