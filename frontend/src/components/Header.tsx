interface HeaderProps {
  onAvatarClick: () => void
  avatarLetter?: string
}

export default function Header({ onAvatarClick, avatarLetter = 'I' }: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: 'var(--yellow-soft)',
      }}
    >
      <span className="display" style={{ fontSize: 20, color: 'var(--yellow-deep)' }}>
        Isinha &amp; JJ
      </span>
      <div style={{ position: 'relative', width: 30, height: 30 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'var(--pink-deep)',
            fontWeight: 500,
          }}
        >
          {avatarLetter}
        </div>
        <button
          onClick={onAvatarClick}
          aria-label="Trocar foto de perfil"
          style={{
            position: 'absolute',
            bottom: -3,
            right: -3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'var(--pink-deep)',
            border: '1.5px solid var(--yellow-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <i className="ti ti-camera" style={{ fontSize: 9, color: 'var(--yellow-soft)' }} />
        </button>
      </div>
    </header>
  )
}
