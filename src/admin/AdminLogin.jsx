import { useState } from 'react'
import { api } from '../api/client'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.auth.login(email, password)
      if (res.success) {
        onLogin(email)
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-left">
        <div className="admin-login-brand">
          <div className="admin-login-brand-logo">SD</div>
          <h1>Sikkha Daan</h1>
          <p>শিক্ষা দান — শিক্ষার অফুরান দান</p>
          <span className="admin-login-brand-badge">Admin Panel</span>
        </div>
        <div className="admin-login-illustration">
          <div className="admin-login-illu-circle" />
          <div className="admin-login-illu-circle small" />
          <div className="admin-login-illu-dots">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="admin-login-illu-dot" style={{ '--i': i }} />
            ))}
          </div>
        </div>
      </div>
      <div className="admin-login-right">
        <div className="admin-login-card">
          <div className="admin-login-card-header">
            <h2 className="admin-login-card-title">Welcome Back</h2>
            <p className="admin-login-card-subtitle">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="admin-login-error">{error}</div>}

            <div className="admin-login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sikkhadaan.com"
                required
                autoFocus
              />
            </div>

            <div className="admin-login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="admin-login-hint">
            Default: admin@sikkhadaan.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
