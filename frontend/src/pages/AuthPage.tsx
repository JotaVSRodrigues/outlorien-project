import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { AuthFormData } from '../types.ts'

type Mode = 'login' | 'signup'

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [form, setForm] = useState<AuthFormData>({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  function update(field: keyof AuthFormData) {
    return (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        if (form.password !== form.confirmPassword) {
          setError('as senhas nao coincidem')
          return
        }
        await register(form)
      }
      navigate('/album')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'nao foi possivel continuar, tente de novo')
    }
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--cream)', borderRadius: 16, border: '0.5px solid var(--border)', overflow: 'hidden', width: '100%', maxWidth: 380 }}>
        <div style={{ background: 'var(--yellow-soft)', padding: '22px 24px 18px', textAlign: 'center' }}>
          <p className="display" style={{ fontSize: 20 }}>Isinha &amp; JJ</p>
        </div>

        <div style={{ display: 'flex', padding: '16px 24px 0', borderBottom: '0.5px solid var(--border)', gap: 4 }}>
          {([['login', 'entrar'], ['signup', 'criar conta']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                padding: '8px 4px',
                fontSize: 13,
                fontWeight: 500,
                color: mode === key ? 'var(--pink-deep)' : 'var(--neutral-muted)',
                borderBottom: mode === key ? '2px solid var(--pink-strong)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px 24px' }}>
          {mode === 'signup' && (
            <>
              <label htmlFor="name" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>nome</label>
              <input id="name" type="text" required placeholder="seu nome" value={form.name} onChange={update('name')} style={{ width: '100%', margin: '2px 0 10px' }} />
            </>
          )}

          <label htmlFor="email" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>email</label>
          <input id="email" type="email" required placeholder="voce@email.com" value={form.email} onChange={update('email')} style={{ width: '100%', margin: '2px 0 10px' }} />

          {mode === 'signup' && (
            <>
              <label htmlFor="phone" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>telefone</label>
              <input id="phone" type="tel" required placeholder="(11) 90000-0000" value={form.phone} onChange={update('phone')} style={{ width: '100%', margin: '2px 0 4px' }} />
              <p style={{ margin: '0 0 10px', fontSize: 10, color: '#B4A984' }}>usamos so pra te avisar de novidades por la</p>
            </>
          )}

          <label htmlFor="password" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>senha</label>
          <input id="password" type="password" required minLength={8} placeholder={mode === 'signup' ? 'crie uma senha' : 'sua senha'} value={form.password} onChange={update('password')} style={{ width: '100%', margin: '2px 0 10px' }} />

          {mode === 'signup' && (
            <>
              <label htmlFor="confirmPassword" style={{ fontSize: 11, color: 'var(--neutral-muted)' }}>confirmar senha</label>
              <input id="confirmPassword" type="password" required placeholder="repita a senha" value={form.confirmPassword} onChange={update('confirmPassword')} style={{ width: '100%', margin: '2px 0 14px' }} />
            </>
          )}

          {mode === 'login' && (
            <p style={{ margin: '0 0 16px', textAlign: 'right', fontSize: 11, color: '#B87A98', cursor: 'pointer' }}>esqueci a senha</p>
          )}

          {error && <p style={{ color: 'var(--pink-strong)', fontSize: 12, margin: '0 0 10px' }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            {mode === 'login' ? 'entrar' : 'criar conta'}
          </button>
        </form>
      </div>
    </div>
  )
}
