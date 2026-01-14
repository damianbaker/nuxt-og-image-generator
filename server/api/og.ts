// server/api/og.ts
import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'

export default defineEventHandler(async (event) => {
  // 1. Get the query (e.g., ?title=My%20Post)
  const { title } = getQuery(event)

  // 2. Load the font data
  // We fetch the raw .ttf or .woff buffer from Google Fonts
  const fontData = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff')
    .then((res) => res.arrayBuffer())

  // 3. Define the markup
  const markup = html`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; background-color: #0f172a; color: white; font-family: 'Inter', sans-serif;">
      <h1 style="font-size: 60px; text-align: center;">
        ${title || 'Hello World'}
      </h1>
      <img src="https://assets.prestashop3.com/addons/pico/2376.jpg" alt="Social Preview" style="max-width: 150px; max-height: 150px;" />
      <p style="font-size: 30px; color: #94a3b8;">
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

  // 6. Return the image
  setHeader(event, 'Content-Type', 'image/png')
  return pngBuffer
})