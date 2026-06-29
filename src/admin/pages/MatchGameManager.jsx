import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemForm from '../components/ItemForm'

const MODES = [
  { key: 'all', label: 'All', color: '#6366f1' },
  { key: 'english', label: 'English', color: '#3b82f6' },
  { key: 'bangla', label: 'Bangla', color: '#ec4899' },
  { key: 'numbers', label: 'Numbers', color: '#10b981' },
]

const PAIR_COLORS = [
  '#6366f1', '#ec4899', '#14b8a6', '#f59e0b',
  '#ef4444', '#8b5cf6', '#06b6d4', '#10b981',
]

const fields = [
  {
    key: 'mode', label: 'Mode', type: 'select', required: true,
    options: [
      { value: 'english', label: 'English' },
      { value: 'bangla', label: 'Bangla' },
      { value: 'numbers', label: 'Numbers' },
    ],
  },
  { key: 'left_value', label: 'Left Value', required: true, placeholder: 'e.g. A' },
  { key: 'right_value', label: 'Right Value', required: true, placeholder: 'e.g. Apple' },
]

export default function MatchGameManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await api.matchGame.getAll())
    } catch (err) {
      console.error('Failed to load Match Game data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = filter === 'all' ? items : items.filter(i => i.mode === filter)
  const groupCounts = {}
  items.forEach(i => { groupCounts[i.mode] = (groupCounts[i.mode] || 0) + 1 })

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await api.matchGame.update(editing.id, formData)
      } else {
        await api.matchGame.create(formData)
      }
      setShowForm(false)
      setEditing(null)
      await load()
    } catch (err) {
      console.error('Failed to save Match Game item:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pair?')) return
    try {
      await api.matchGame.delete(id)
      await load()
    } catch (err) {
      console.error('Failed to delete Match Game item:', err)
    }
  }

  const handleEdit = (item) => {
    setEditing(item)
    setShowForm(true)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Match Game Pairs</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            {items.length} total pairs
          </p>
        </div>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>
          + Add Pair
        </button>
      </div>

      <div className="admin-tabs">
        {MODES.map(m => (
          <button
            key={m.key}
            className={filter === m.key ? 'active' : ''}
            onClick={() => setFilter(m.key)}
          >
            {m.label} {m.key !== 'all' && `(${groupCounts[m.key] || 0})`}
          </button>
        ))}
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit Pair' : 'Add New Pair'}
        />
      )}

      {loading ? (
        <div className="admin-loading">Loading pairs...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          {filter === 'all' ? 'No pairs yet. Add your first one!' : `No ${filter} pairs yet.`}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((item, idx) => {
            const color = PAIR_COLORS[idx % PAIR_COLORS.length]
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  background: '#f8fafc',
                  borderRadius: 10,
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <div
                  style={{
                    width: 4,
                    height: 36,
                    borderRadius: 2,
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    background: `${color}18`,
                    color: color,
                    textTransform: 'capitalize',
                  }}>
                    {item.mode}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
                      {item.left_value}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: 16 }}>⟷</span>
                    <span style={{ fontSize: 18, fontWeight: 600, color: '#64748b' }}>
                      {item.right_value}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button
                    className="admin-btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
