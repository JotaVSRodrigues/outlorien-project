/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SPOTIFY_PLAYLIST_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// O Web Playback SDK do Spotify injeta isso no objeto window em runtime;
// declaramos aqui so pra o TypeScript parar de reclamar.
interface Window {
  Spotify: any
  onSpotifyWebPlaybackSDKReady: () => void
}
