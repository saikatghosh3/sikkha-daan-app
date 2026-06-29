import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemTable from '../components/ItemTable'
import ItemForm from '../components/ItemForm'

const fields = [
  { key: 'character', label: 'Character', required: true },
  { key: 'image', label: 'Image', type: 'image' },
]

export default function EnglishManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await api.english.getAll())
    } catch (err) {
      console.error('Failed to load English data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await api.english.update(editing.id, formData)
      } else {
        await api.english.create(formData)
      }
      setShowForm(false)
      setEditing(null)
      await load()
    } catch (err) {
      console.error('Failed to save English item:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try {
      await api.english.delete(id)
      await load()
    } catch (err) {
      console.error('Failed to delete English item:', err)
    }
  }

  const columns = [
    { key: 'character', label: 'Character' },
    { key: 'image', label: 'Image', render: (val) => val ? <img src={val} alt="" className="admin-thumb" /> : '—' },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>English Alphabet</h2>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add New</button>
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit Item' : 'Add New Item'}
        />
      )}

      <ItemTable columns={columns} data={items} onEdit={(item) => { setEditing(item); setShowForm(true) }} onDelete={handleDelete} loading={loading} />
    </div>
  )
}
