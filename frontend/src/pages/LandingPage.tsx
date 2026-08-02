import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpotifyPlayer from '../components/SpotifyPlayer.tsx'

// Landing inspirada em dearyou.com.br, mas com a nossa propria linguagem:
// envelope que se abre, contador de tempo juntos, fotos, playlist,
// declaracao, e as referencias de vida de voces dois (enfermagem,
// programacao, Europa, fe, e um toque discreto de Senhor dos Aneis).
// Full-bleed: cada secao ocupa 100% da largura da tela.
const STARTED_AT = new Date('2024-05-18') // ajustem para a data real de voces

function useTimeTogether() {
  const now = new Date()
  let years = now.getFullYear() - STARTED_AT.getFullYear()
  let months = now.getMonth() - STARTED_AT.getMonth()
  let days = now.getDate() - STARTED_AT.getDate()
  if (days < 0) { months -= 1; days += 30 }
  if (months < 0) { years -= 1; months += 12 }
  return { years, months, days }
}

function Photo({ tone }: { tone: string }) {
  return <div style={{ width: '100%', aspectRatio: '1', borderRadius: 14, background: tone }} />
}

export default function LandingPage() {
  const [opened, setOpened] = useState(false)
  const { years, months, days } = useTimeTogether()
  const navigate = useNavigate()

  if (!opened) {
    return (
      <div
        className="page-shell"
        style={{
          background: 'linear-gradient(160deg, var(--pink-soft) 0%, var(--yellow-soft) 55%, var(--pink) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <button
          onClick={() => setOpened(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <i className="ti ti-mail-heart" style={{ fontSize: 44, color: 'var(--pink-deep)' }} />
          <p className="display" style={{ marginTop: 18, fontSize: 30 }}>voce recebeu um convite</p>
          <p style={{ margin: '10px 0 0', fontSize: 13, color: '#7A5A0C', letterSpacing: 0.5 }}>toque para abrir</p>
        </button>
      </div>
    )
  }

  return (
    <div className="page-shell">

      <section className="section-full" style={{ background: 'linear-gradient(160deg, var(--pink-soft) 0%, var(--yellow-soft) 60%, var(--pink) 100%)', padding: 'clamp(56px,10vw,110px) 0 clamp(40px,8vw,72px)' }}>
        <div className="section-inner" style={{ textAlign: 'center', maxWidth: 560 }}>
          <p style={{ margin: 0, fontSize: 13, letterSpacing: 2, color: 'var(--pink-deep)', textTransform: 'uppercase' }}>um jardim so nosso</p>
          <p className="display" style={{ margin: '14px 0 14px', fontSize: 'clamp(38px,7vw,58px)', lineHeight: 1.05 }}>Isinha &amp; JJ</p>
          <p style={{ margin: '0 auto 28px', maxWidth: 420, fontSize: 15, color: 'var(--pink-deep)', lineHeight: 1.7 }}>
            um lugar so nosso pra guardar fotos, flores e as pequenas historias que a gente vai vivendo -- dia apos dia, com gratidao por cada um deles.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            {([['anos', years], ['meses', months], ['dias', days]] as const).map(([label, value]) => (
              <div key={label} style={{ background: 'var(--cream)', borderRadius: 12, padding: '12px 18px', minWidth: 64 }}>
                <p className="display" style={{ fontSize: 24, color: 'var(--pink-deep)' }}>{String(value).padStart(2, '0')}</p>
                <p style={{ margin: 0, fontSize: 10, color: 'var(--neutral-muted)', letterSpacing: 1 }}>{label}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 11, color: '#7A5A0C' }}>e contando...</p>
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 920, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(24px,5vw,56px)', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: 2, color: 'var(--pink-strong)', textTransform: 'uppercase' }}>um comeco</p>
            <p className="display" style={{ fontSize: 'clamp(24px,4vw,32px)', marginBottom: 14 }}>toda historia bonita comeca em algum lugar pequeno</p>
            <p style={{ fontSize: 14, color: 'var(--neutral-text)', lineHeight: 1.8 }}>
              entre plantoes, linhas de codigo e sonhos de viagem, a gente foi construindo isso aqui -- um cantinho que guarda o que a gente vive, com fe de que ainda vem muita coisa boa por vir.
            </p>
          </div>
          <Photo tone="linear-gradient(135deg, var(--pink), var(--yellow))" />
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--pink-soft)', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 920 }}>
          <p className="display" style={{ fontSize: 'clamp(24px,4vw,30px)', textAlign: 'center', marginBottom: 24 }}>nossas fotos</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
            {['#F4A6C6', '#F7B733', '#F0997B', '#EDC9DC', '#FCE68A', '#D4537E', '#F8D7E3', '#DFAE6E'].map((c, i) => (
              <Photo key={i} tone={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-full" style={{ background: '#3A2E22', padding: 'clamp(48px,8vw,72px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 480, textAlign: 'center' }}>
          <p style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: 2, color: 'var(--yellow-soft)', textTransform: 'uppercase' }}>a trilha da gente</p>
          <SpotifyPlayer playlistUri={import.meta.env.VITE_SPOTIFY_PLAYLIST_URI} />
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 920, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <div style={{ background: 'var(--pink-soft)', borderRadius: 18, padding: 28 }}>
            <i className="ti ti-heartbeat" style={{ fontSize: 26, color: '#72243E' }} />
            <p className="display" style={{ fontSize: 22, margin: '14px 0 8px', color: 'var(--pink-deep)' }}>enfermagem</p>
            <p style={{ margin: 0, fontSize: 13, color: '#7A2E4C', lineHeight: 1.7 }}>
              Isinha cuida de gente todo santo dia -- e mesmo cansada, ainda sobra colo e carinho pra cuidar da gente tambem.
            </p>
          </div>
          <div style={{ background: 'var(--yellow-soft)', borderRadius: 18, padding: 28 }}>
            <i className="ti ti-code" style={{ fontSize: 26, color: '#633806' }} />
            <p className="display" style={{ fontSize: 22, margin: '14px 0 8px', color: 'var(--yellow-deep)' }}>programacao</p>
            <p style={{ margin: 0, fontSize: 13, color: '#7A5A0C', lineHeight: 1.7 }}>
              JJ construiu esse cantinho linha por linha, pensando em cada detalhe pequeno -- porque ela merece um lugar feito so pra ela.
            </p>
          </div>
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--pink-deep)', padding: 'clamp(56px,9vw,96px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 640, textAlign: 'center' }}>
          <i className="ti ti-feather" style={{ fontSize: 18, color: 'var(--yellow-soft)' }} />
          <p className="display" style={{ fontSize: 'clamp(24px,4.5vw,34px)', color: 'var(--yellow-soft)', margin: '18px 0 0', lineHeight: 1.4 }}>
            "voce e a minha parte favorita de todos os dias -- e nao ha caminho pequeno demais quando se caminha acompanhado."
          </p>
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--yellow-soft)', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 920, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(24px,5vw,56px)', alignItems: 'center' }}>
          <Photo tone="linear-gradient(135deg, var(--yellow), var(--pink))" />
          <div>
            <p style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: 2, color: 'var(--yellow-deep)', textTransform: 'uppercase' }}>um sonho</p>
            <p className="display" style={{ fontSize: 'clamp(24px,4vw,32px)', marginBottom: 14, color: 'var(--yellow-deep)' }}>a Europa nos espera</p>
            <p style={{ fontSize: 14, color: '#7A5A0C', lineHeight: 1.8 }}>
              um mapa de lugares pra visitar, um dia, os dois juntos -- ruas antigas, cafes pequenos e o tanto de historia que a gente ainda vai escrever la fora.
            </p>
          </div>
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,72px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 480, textAlign: 'center' }}>
          <i className="ti ti-sparkles" style={{ fontSize: 18, color: 'var(--pink-strong)' }} />
          <p style={{ margin: '14px 0 0', fontSize: 14, fontStyle: 'italic', color: 'var(--neutral-text)', lineHeight: 1.8 }}>
            gratos por cada dia -- entregando nossos planos e caminhos nas maos de Jesus, um passo de cada vez.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 0.5, background: 'var(--border)' }} />
            <i className="ti ti-leaf" style={{ fontSize: 14, color: '#B4A984' }} />
            <div style={{ flex: 1, height: 0.5, background: 'var(--border)' }} />
          </div>
          <p style={{ margin: 0, fontSize: 11, fontStyle: 'italic', color: 'var(--neutral-muted)' }}>
            "nao ha caminho pequeno demais quando se caminha acompanhado."
          </p>
          <button
            onClick={() => navigate('/sobre')}
            style={{ background: 'none', border: 'none', marginTop: 20, fontSize: 12, color: 'var(--pink-strong)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            sobre o OurLorien
          </button>
        </div>
      </section>

      <section className="section-full" style={{ background: 'linear-gradient(160deg, var(--pink) 0%, var(--yellow-soft) 100%)', padding: 'clamp(56px,9vw,96px) 0' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <p className="display" style={{ fontSize: 'clamp(24px,4.5vw,32px)', marginBottom: 20 }}>pronta pra entrar no jardim?</p>
          <button className="btn-primary" onClick={() => navigate('/login')} style={{ fontSize: 15, padding: '13px 30px' }}>
            entrar no jardim <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />
          </button>
        </div>
      </section>

    </div>
  )
}
