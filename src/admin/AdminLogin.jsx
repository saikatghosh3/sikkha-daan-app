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
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-logo">SD</div>
          <h1 className="admin-login-title">Sikkha Daan</h1>
          <p className="admin-login-subtitle">শিক্ষা দান — Admin Panel</p>

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
