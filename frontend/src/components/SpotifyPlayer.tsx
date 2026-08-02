import { useEffect, useState, useCallback } from 'react'
import api from '../api/client.ts'

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: { images: { url: string }[] }
}

interface SpotifyPlayerInstance {
  connect: () => Promise<boolean>
  disconnect: () => void
  togglePlay: () => Promise<void>
  nextTrack: () => Promise<void>
  previousTrack: () => Promise<void>
  addListener: (event: string, cb: (payload: any) => void) => void
}

interface SpotifyPlayerProps {
  playlistUri: string
}

// Carrega o script do Web Playback SDK uma unica vez.
function loadSpotifySdk(): Promise<any> {
  return new Promise((resolve) => {
    if (window.Spotify) return resolve(window.Spotify)
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)
    window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify)
  })
}

// Player customizado via Spotify Web API + Web Playback SDK.
// Fluxo: o access_token NUNCA e gerado no frontend -- ele vem pronto do
// backend (GET /api/spotify/token), que por sua vez guarda o refresh_token
// da conta Premium conectada e renova o access_token quando precisa.
// Requer que a pessoa dona da conta conectada tenha Spotify Premium.
export default function SpotifyPlayer({ playlistUri }: SpotifyPlayerProps) {
  const [player, setPlayer] = useState<SpotifyPlayerInstance | null>(null)
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [isPaused, setIsPaused] = useState(true)
  const [progressPct, setProgressPct] = useState(0)

  useEffect(() => {
    let spotifyPlayer: SpotifyPlayerInstance | undefined

    async function init() {
      const Spotify = await loadSpotifySdk()

      spotifyPlayer = new Spotify.Player({
        name: 'Isinha & JJ',
        getOAuthToken: async (cb: (token: string) => void) => {
          const res = await api.get<{ accessToken: string }>('/spotify/token')
          cb(res.data.accessToken)
        },
        volume: 0.6,
      })

      spotifyPlayer!.addListener('player_state_changed', (state: any) => {
        if (!state) return
        setTrack(state.track_window.current_track)
        setIsPaused(state.paused)
        setProgressPct((state.position / state.duration) * 100)
      })

      spotifyPlayer!.addListener('ready', ({ device_id }: { device_id: string }) => {
        api.post('/spotify/play', { deviceId: device_id, playlistUri })
      })

      await spotifyPlayer!.connect()
      setPlayer(spotifyPlayer!)
    }

    init()
    return () => spotifyPlayer?.disconnect()
  }, [playlistUri])

  const togglePlay = useCallback(() => player?.togglePlay(), [player])
  const nextTrack = useCallback(() => player?.nextTrack(), [player])
  const prevTrack = useCallback(() => player?.previousTrack(), [player])

  return (
    <div
      style={{
        background: '#3A2E22',
        borderRadius: 16,
        width: '100%',
        maxWidth: 400,
        padding: '18px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            backgroundImage: track ? `url(${track.album.images[0]?.url})` : 'none',
            backgroundSize: 'cover',
            background: !track ? 'linear-gradient(135deg,#F8D7E3,#F7B733)' : undefined,
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#FFFBF5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {track?.name || 'conectando ao Spotify...'}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#B8A88F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {track?.artists?.map((a) => a.name).join(', ') || ''}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ height: 3, background: '#5C4A38', borderRadius: 2 }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: '#F7B733', borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 12 }}>
        <button onClick={prevTrack} aria-label="Musica anterior" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <i className="ti ti-player-skip-back-filled" style={{ fontSize: 18, color: '#FFFBF5' }} />
        </button>
        <button
          onClick={togglePlay}
          aria-label={isPaused ? 'Tocar' : 'Pausar'}
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'var(--yellow-soft)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <i className={`ti ${isPaused ? 'ti-player-play-filled' : 'ti-player-pause-filled'}`} style={{ fontSize: 17, color: '#3A2E22' }} />
        </button>
        <button onClick={nextTrack} aria-label="Proxima musica" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <i className="ti ti-player-skip-forward-filled" style={{ fontSize: 18, color: '#FFFBF5' }} />
        </button>
      </div>

      <p style={{ margin: '12px 0 0', textAlign: 'center', fontSize: 10, color: '#6E6152' }}>
        tocando da playlist "nossa" · via Spotify
      </p>
    </div>
  )
}
