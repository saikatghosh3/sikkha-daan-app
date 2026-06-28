import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemTable from '../components/ItemTable'
import ItemForm from '../components/ItemForm'

const CATEGORIES = [
  { value: 'national', label: '🇧🇩 National Symbols' },
  { value: 'geography', label: '🗺️ Geography & Divisions' },
  { value: 'history', label: '📜 History & Heritage' },
  { value: 'culture', label: '🎭 Culture & Festivals' },
  { value: 'general', label: '📚 General Knowledge' },
]

const fields = [
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    options: CATEGORIES,
  },
  { key: 'title', label: 'Title', required: true, placeholder: 'e.g. National Bird, Dhaka Division' },
  { key: 'name', label: 'Name (English)', placeholder: 'e.g. Oriental Magpie Robin' },
  { key: 'name_bn', label: 'Name (বাংলা)', placeholder: 'e.g. দোয়েল' },
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3, placeholder: 'Short description about this item' },
]

export default function GeneralKnowledgeManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await api.generalKnowledge.getAll())
    } catch (err) {
      alert('Failed to load: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async (formData) => {
    if (editing) {
      await api.generalKnowledge.update(editing.id, formData)
    } else {
      await api.generalKnowledge.create(formData)
    }
    setShowForm(false)
    setEditing(null)
    await load()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    await api.generalKnowledge.delete(id)
    await load()
  }

  const categoryLabel = (val) => CATEGORIES.find(c => c.value === val)?.label || val

  const columns = [
    {
      key: 'category', label: 'Category',
      render: (val) => <span className="admin-badge">{categoryLabel(val)}</span>,
    },
    { key: 'title', label: 'Title' },
    { key: 'name', label: 'Name (EN)' },
    { key: 'name_bn', label: 'Name (BN)' },
    {
      key: 'image', label: 'Image',
      render: (val) => val ? <img src={val} alt="" className="admin-thumb" /> : <span className="admin-no-img">—</span>,
    },
  ]

  const filtered = filter ? items.filter(i => i.category === filter) : items

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>General Knowledge</h2>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add New</button>
      </div>

      <div className="admin-filter-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`admin-filter-btn ${filter === cat.value ? 'active' : ''}`}
            onClick={() => setFilter(filter === cat.value ? '' : cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit General Knowledge' : 'Add General Knowledge'}
        />
      )}

      <ItemTable columns={columns} data={filtered} onEdit={(item) => { setEditing(item); setShowForm(true) }} onDelete={handleDelete} loading={loading} />
    </div>
  )
}
