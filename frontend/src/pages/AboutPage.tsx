import { useNavigate } from 'react-router-dom'

// Pagina "Sobre" -- explica o nome OurLorien e o espirito do projeto.
// Full-bleed, seguindo o mesmo padrao de secoes da landing page.
export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="page-shell" style={{ background: 'var(--cream)' }}>

      <section className="section-full" style={{ background: 'linear-gradient(160deg, var(--yellow-soft) 0%, var(--pink-soft) 100%)', padding: 'clamp(56px,10vw,96px) 0 clamp(40px,7vw,64px)' }}>
        <div className="section-inner" style={{ textAlign: 'center', maxWidth: 560 }}>
          <i className="ti ti-leaf" style={{ fontSize: 22, color: 'var(--pink-deep)' }} />
          <p className="display" style={{ margin: '16px 0 10px', fontSize: 'clamp(34px,6vw,48px)' }}>OurLorien</p>
          <p style={{ margin: 0, fontSize: 13, letterSpacing: 1, color: 'var(--pink-deep)', textTransform: 'uppercase' }}>
            sobre esse cantinho
          </p>
        </div>
      </section>

      <section className="section-full" style={{ padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 620 }}>
          <p className="display" style={{ fontSize: 'clamp(22px,4vw,28px)', marginBottom: 16 }}>por que esse nome?</p>
          <p style={{ fontSize: 14, color: 'var(--neutral-text)', lineHeight: 1.9 }}>
            o nome vem de Lorien, a floresta dourada de um dos livros favoritos da gente -- um refugio onde o tempo
            parece parar, onde tudo fica mais bonito, mais calmo, mais em paz. um lugar protegido, guardado, feito
            pra quem chega nele descansar.
          </p>
          <p style={{ fontSize: 14, color: 'var(--neutral-text)', lineHeight: 1.9, marginTop: 16 }}>
            a gente quis um cantinho assim, só nosso -- por isso <strong>OurLorien</strong>. um lugar pra guardar
            fotos, flores e as pequenas historias do nosso dia a dia, longe da correria, com a nossa cara: amarelo,
            rosa, e um bocado de carinho em cada detalhe.
          </p>
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--pink-soft)', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 920, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <div style={{ background: 'var(--cream)', borderRadius: 18, padding: 26 }}>
            <i className="ti ti-heartbeat" style={{ fontSize: 22, color: '#72243E' }} />
            <p className="display" style={{ fontSize: 19, margin: '12px 0 6px', color: 'var(--pink-deep)' }}>quem e a Isinha</p>
            <p style={{ margin: 0, fontSize: 13, color: '#5F4854', lineHeight: 1.7 }}>
              enfermeira, cuida de gente todos os dias com um jeito que so ela tem.
            </p>
          </div>
          <div style={{ background: 'var(--cream)', borderRadius: 18, padding: 26 }}>
            <i className="ti ti-code" style={{ fontSize: 22, color: '#633806' }} />
            <p className="display" style={{ fontSize: 19, margin: '12px 0 6px', color: 'var(--yellow-deep)' }}>quem e o JJ</p>
            <p style={{ margin: 0, fontSize: 13, color: '#5F4854', lineHeight: 1.7 }}>
              engenheiro de software, construiu esse cantinho pra ela, linha por linha.
            </p>
          </div>
        </div>
      </section>

      <section className="section-full" style={{ background: 'var(--pink-deep)', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="section-inner" style={{ maxWidth: 560, textAlign: 'center' }}>
          <i className="ti ti-sparkles" style={{ fontSize: 18, color: 'var(--yellow-soft)' }} />
          <p style={{ margin: '16px 0 0', fontSize: 14, fontStyle: 'italic', color: 'var(--yellow-soft)', lineHeight: 1.8 }}>
            gratos por cada dia -- entregando nossos planos e caminhos nas maos de Jesus, sonhando com a Europa
            e guardando aqui cada flor no caminho.
          </p>
        </div>
      </section>

      <section className="section-full" style={{ padding: 'clamp(40px,7vw,64px) 0', textAlign: 'center' }}>
        <button className="btn-outline" onClick={() => navigate('/')}>
          voltar pro jardim
        </button>
      </section>

    </div>
  )
}
