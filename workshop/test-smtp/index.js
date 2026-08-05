/**
 * SMTP connection tester.
 *
 * Usage:
 *   npm install
 *   cp .env.example .env   # then fill it in
 *   npm start              # verify credentials only
 *   npm start -- --send    # verify + send a real test email to SMTP_TO
 */

const nodemailer = require('nodemailer')

require('dotenv').config({ path: `${__dirname}/.env` })

const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env

const shouldSend = process.argv.includes('--send')

const fail = (message) => {
  console.error(`\x1b[31m✖ ${message}\x1b[0m`)
  process.exit(1)
}

const ok = (message) => console.log(`\x1b[32m✔ ${message}\x1b[0m`)

// const missing = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'].filter(
// 	(key) => !process.env[key]
// )
// if (missing.length) {
// 	fail(`Missing env vars: ${missing.join(', ')} (see .env.example)`)
// }

const port = Number(SMTP_PORT)
// Implicit TLS on 465; STARTTLS everywhere else. SMTP_SECURE overrides.
const secure = SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  logger: process.env.SMTP_DEBUG === 'true',
  debug: process.env.SMTP_DEBUG === 'true',
})

const explain = (error) => {
  const code = error.code || error.responseCode
  const hints = {
    EAUTH: 'Bad username/password. For Gmail/Yahoo use an app password, not your login password.',
    ECONNECTION: 'Could not open a socket. Check host/port, firewall, or VPN.',
    ETIMEDOUT: 'Connection timed out. The port is likely blocked (ISPs often block 25).',
    ESOCKET: 'TLS handshake failed. Try flipping SMTP_SECURE (465 = true, 587 = false).',
    EDNS: 'Hostname did not resolve. Check SMTP_HOST for typos.',
    EENVELOPE: 'Server rejected the sender or recipient address. Check SMTP_FROM / SMTP_TO.',
    535: 'Authentication rejected by the server.',
  }
  return hints[code] || ''
}

const main = async () => {
  console.log(`Connecting to ${SMTP_HOST}:${port} (secure: ${secure}) as ${SMTP_USER}...`)

  try {
    await transporter.verify()
    ok('SMTP connection and credentials are valid.')
  } catch (error) {
    console.error(`\ncode: ${error.code || 'n/a'}`)
    if (error.response) console.error(`server said: ${error.response}`)
    const hint = explain(error)
    if (hint) console.error(`hint: ${hint}`)
    fail(`SMTP verify failed: ${error.message}`)
  }

  if (!shouldSend) {
    console.log('\nRun with --send to also deliver a test email.')
    return
  }

  const to = SMTP_TO || SMTP_USER
  const from = SMTP_FROM || SMTP_USER
  const stamp = new Date().toISOString()

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: `SMTP test ${stamp}`,
      text: `This is a test message sent at ${stamp} via ${SMTP_HOST}:${port}.`,
      html: `<p>This is a test message sent at <strong>${stamp}</strong> via ${SMTP_HOST}:${port}.</p>`,
    })

    ok(`Test email accepted for delivery to ${to}`)
    console.log(`messageId: ${info.messageId}`)
    if (info.accepted?.length) console.log(`accepted:  ${info.accepted.join(', ')}`)
    if (info.rejected?.length) console.log(`rejected:  ${info.rejected.join(', ')}`)
    if (info.response) console.log(`response:  ${info.response}`)
    console.log('\nCheck the inbox (and spam folder) to confirm actual delivery.')
  } catch (error) {
    console.error(`\ncode: ${error.code || 'n/a'}`)
    if (error.response) console.error(`server said: ${error.response}`)
    const hint = explain(error)
    if (hint) console.error(`hint: ${hint}`)
    fail(`Sending failed: ${error.message}`)
  }
}

main()
