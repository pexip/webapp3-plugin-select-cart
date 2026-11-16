import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { PLUGIN_ID } from './src/constants'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  const port = Number(env.VITE_DEV_SERVER_PORT) || 5173
  const infinityTarget = env.VITE_INFINITY_TARGET
  const isDev = mode === 'development'

  if (isDev && !infinityTarget) {
    console.error('\n❌ Configuration Error: Missing Pexip Infinity URL ❌\n')
    console.error(
      'To run the dev server, create a .env file in the project root with:\n'
    )
    console.error(
      'VITE_INFINITY_TARGET=https://your-pexip-infinity-server.com\n'
    )
    console.error('See .env.example for reference or README.md for details.\n')
    throw new Error('VITE_INFINITY_TARGET is not defined in .env file')
  }

  // Branding manifest that loads the plugin from the local dev server
  const manifest = JSON.stringify({
    images: {},
    translations: {},
    plugins: [
      {
        src: `https://localhost:${port}`,
        sandboxValues: ['allow-same-origin', 'allow-downloads', 'allow-popups'],
        id: PLUGIN_ID
      }
    ]
  })

  return {
    base: './',
    build: {
      target: 'esnext'
    },
    plugins: [
      mkcert(),
      {
        name: 'inline-manifest',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use(
            '/webapp3/branding/manifest.json',
            (_, res) => {
              res.setHeader('Content-Type', 'application/json')
              res.end(manifest)
            }
          )
        }
      }
    ],
    server: {
      open: '/webapp3/',
      allowedHosts: ['localhost'],
      host: 'localhost',
      strictPort: true,
      port,
      ...(infinityTarget && {
        hmr: {
          host: new URL(infinityTarget).hostname,
          protocol: 'wss',
          port,
          clientPort: port
        },
        proxy: {
          '/api': {
            target: infinityTarget,
            changeOrigin: true,
            secure: false
          },
          '/webapp3': {
            target: infinityTarget,
            changeOrigin: true,
            secure: false
          }
        }
      })
    }
  }
})
