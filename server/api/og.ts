// server/api/og.ts
import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'

export default defineEventHandler(async (event) => {
  // 1. Get the query (e.g., ?title=My%20Post)
  const { title, idproduct, discountvalue, discountcode } = getQuery(event)

  // 2. Load the font data
  // Satori cannot use "system fonts" (like Arial or Roboto installed on your laptop) because it runs in a serverless environment where those fonts don't exist.
  //To make this work, you must feed Satori raw font data (usually by reading a .ttf or .woff file from your public folder using fs or fetch).
  // We fetch the raw .ttf or .woff buffer from Google Fonts
  const fontData = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff')
    .then((res) => res.arrayBuffer())

  // 3. Define the markup
  const markup = html`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; background-color: #0f172a; color: white; font-family: 'Inter', sans-serif;">
      <h1 style="font-size: 30px; text-align: center;">
        ${title}
      </h1>
      <img src="https://assets.prestashop3.com/addons/pico/${idproduct}.jpg" alt="Social Preview" style="max-width: 150px; max-height: 150px;" />

      <!-- Discount block -->
      <div style="margin-top: 8px; display: flex; align-items: center; gap: 16px; background: linear-gradient(90deg,#071024 0%,#0b1220 100%); padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.04);">
        <div style="display: flex; flex-direction: column; align-items: flex-start;">
          <span style="font-size: 18px; color: #93c5fd; font-weight: 600;">Special Offer</span>
          <span style="font-size: 28px; font-weight: 800; color: #ffffff; margin-top: 4px;">${discountvalue}% OFF</span>
        </div>
        <div style="margin-left: 12px; padding: 8px 12px; background: #06b6d4; color: #002233; font-weight: 800; border-radius: 8px; font-size: 28px;">
          ${discountcode}
        </div>
      </div>
      <p style="font-size: 24px; color: #94a3b8;">
        Generated dynamically with Nuxt & Satori
      </p>
    </div>
  `

  // 4. Generate the SVG with Satori
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        style: 'normal',
        weight: 700,
      },
    ],
  })

  // 5. Convert SVG to PNG using Resvg
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const png = resvg.render()
  const pngBuffer = png.asPng()

  // 6. Set Cache Headers
  // This tells browsers & Twitter: "Keep this image for 1 hour. Don't ask me for it again until then."
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')

  // 7. Return the image
  setHeader(event, 'Content-Type', 'image/png')
  return pngBuffer
})