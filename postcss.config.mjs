/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    // Adds `-webkit-`, `-moz-`, etc. prefixes so glass surfaces
    // (backdrop-filter), gradient text (background-clip), masks, and other
    // modern CSS features render consistently in older Edge, in-app
    // browsers, and Chromium derivatives on non-macOS devices.
    autoprefixer: {},
  },
};

export default config;
