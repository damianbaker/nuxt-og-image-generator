# nuxt-og-image-generator
# **Installation**

`nvm use 22.18.0`

`npm create nuxt@latest`

- minimal
- npm
- no

`cd nuxt-og-image-generator`

`npm run dev`

# Packages
To get the "Dynamic Social Share Cards" feature working, you need the core engine (satori), a helper to make writing the templates easier (satori-html), and the SVG-to-PNG converter (@resvg/resvg-js).

`npm install satori satori-html @resvg/resvg-js`

satori: The core engine. It takes a JSON-like object representing DOM nodes and calculates the layout to produce an SVG string.

satori-html: Satori cannot read raw HTML strings by default (it expects a complex object tree). This library allows you to write standard HTML strings (like < div class="bg-black">...< /div>) and automatically converts them into the object format Satori needs.

@resvg/resvg-js: While Satori outputs an SVG, platforms like Twitter, LinkedIn, and Facebook generally require (or strongly prefer) PNG or JPG files for Open Graph previews. This library is a high-performance Rust-based engine (wrapped in JS) that converts the Satori SVG into a PNG buffer.
