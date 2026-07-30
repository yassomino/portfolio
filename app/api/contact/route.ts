import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/* Values land inside an HTML email, so escape before interpolating. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const LIMITS = { name: 100, email: 200, message: 5000 }

/* Best effort throttle. Serverless instances are not shared, so this trims
   casual abuse rather than a determined flood.

   Two buckets on purpose: a loose cap on all traffic stops hammering, and a
   tighter cap counts only messages that actually get sent, so someone who
   mistypes their email twice is not locked out of sending a real message. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 12
const MAX_SENDS = 3

function rateLimited(ip: string, bucket: 'req' | 'send', max: number) {
  const now = Date.now()
  const key = `${bucket}:${ip}`
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)

  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k)
    }
  }

  return recent.length > max
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (rateLimited(ip, 'req', MAX_REQUESTS)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    /* Honeypot: real people never fill a hidden field. Return success so bots
       do not learn they were caught. */
    if (typeof body.company === 'string' && body.company.length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Please fill in every field.' }, { status: 400 })
    }

    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      message.length > LIMITS.message
    ) {
      return NextResponse.json({ error: 'That message is too long.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: 'That email address looks wrong.' }, { status: 400 })
    }

    /* Only real, validated messages count against the send budget */
    if (rateLimited(ip, 'send', MAX_SENDS)) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again in a minute.' },
        { status: 429 }
      )
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Contact route: mail credentials are not configured')
      return NextResponse.json({ error: 'Mail is not configured.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      message: escapeHtml(message),
    }

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: 'yassinkoubeisy@gmail.com',
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#06070c;color:#e8eaf6;">
          <h2 style="color:#22d3ee;margin-bottom:8px;">New message from your portfolio</h2>
          <hr style="border:none;border-top:1px solid #222;margin:16px 0;"/>
          <p><strong style="color:#9ba3c7;">From:</strong> ${safe.name}</p>
          <p><strong style="color:#9ba3c7;">Email:</strong> <a href="mailto:${safe.email}" style="color:#6366f1;">${safe.email}</a></p>
          <hr style="border:none;border-top:1px solid #222;margin:16px 0;"/>
          <p><strong style="color:#9ba3c7;">Message:</strong></p>
          <p style="color:#e8eaf6;line-height:1.7;white-space:pre-wrap;">${safe.message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Failed to send. Please email me directly.' }, { status: 500 })
  }
}
