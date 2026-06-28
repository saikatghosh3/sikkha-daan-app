import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemForm from '../components/ItemForm'

const fields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'text', label: 'Text', type: 'textarea', rows: 6, required: true },
  { key: 'image', label: 'Background Image', type: 'image' },
]

export default function RhymesManager() {
  const [activeTab, setActiveTab] = useState('bangla')
  const [bangla, setBangla] = useState([])
  const [english, setEnglish] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [b, e] = await Promise.all([api.rhymes.getBangla(), api.rhymes.getEnglish()])
      setBangla(b)
      setEnglish(e)
    } catch (err) {
      alert('Failed to load: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const items = activeTab === 'bangla' ? bangla : english

  const handleSave = async (formData) => {
    if (editing) {
      if (activeTab === 'bangla') {
        await api.rhymes.updateBangla(editing.id, formData)
      } else {
        await api.rhymes.updateEnglish(editing.id, formData)
      }
    } else {
      if (activeTab === 'bangla') {
        await api.rhymes.createBangla(formData)
      } else {
        await api.rhymes.createEnglish(formData)
      }
    }
    setShowForm(false)
    setEditing(null)
    await load()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this rhyme?')) return
    if (activeTab === 'bangla') {
      await api.rhymes.deleteBangla(id)
    } else {
      await api.rhymes.deleteEnglish(id)
    }
    await load()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>{activeTab === 'bangla' ? 'Bangla' : 'English'} Rhymes</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            {items.length} rhymes total
          </p>
        </div>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>
          + Add Rhyme
        </button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'bangla' ? 'active' : ''} onClick={() => setActiveTab('bangla')}>
          Bangla ({bangla.length})
        </button>
        <button className={activeTab === 'english' ? 'active' : ''} onClick={() => setActiveTab('english')}>
          English ({english.length})
        </button>
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit Rhyme' : 'Add New Rhyme'}
        />
      )}

      {loading ? (
        <div className="admin-loading">Loading rhymes...</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">No rhymes yet. Add your first one!</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: 16,
                background: '#f8fafc',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(99,102,241,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {item.image ? (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    background: `url(${item.image}) center/cover no-repeat`,
                    flexShrink: 0,
                    border: '1px solid #e2e8f0',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: 'white',
                  }}
                >
                  📖
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, whiteSpace: 'pre-line', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.text}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className="admin-btn-edit" onClick={() => { setEditing(item); setShowForm(true) }}>Edit</button>
                <button className="admin-btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
