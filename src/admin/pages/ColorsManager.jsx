import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemTable from '../components/ItemTable'
import ItemForm from '../components/ItemForm'

const fields = [
  { key: 'name_en', label: 'Name (English)', required: true },
  { key: 'name_bn', label: 'Name (Bangla)', required: true },
  { key: 'color', label: 'Color', type: 'color', required: true },
  { key: 'example', label: 'Example (emoji + text)' },
]

export default function ColorsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await api.colors.getAll())
    } catch (err) {
      console.error('Failed to load Colors data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await api.colors.update(editing.id, formData)
      } else {
        await api.colors.create(formData)
      }
      setShowForm(false)
      setEditing(null)
      await load()
    } catch (err) {
      console.error('Failed to save Colors item:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this color?')) return
    try {
      await api.colors.delete(id)
      await load()
    } catch (err) {
      console.error('Failed to delete Colors item:', err)
    }
  }

  const columns = [
    { key: 'name_en', label: 'English Name' },
    { key: 'name_bn', label: 'Bangla Name' },
    {
      key: 'color', label: 'Swatch',
      render: (val) => <div className="admin-color-swatch" style={{ background: val }} title={val} />,
    },
    { key: 'example', label: 'Example' },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Colors</h2>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add New</button>
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit Color' : 'Add New Color'}
        />
      )}

      <ItemTable columns={columns} data={items} onEdit={(item) => { setEditing(item); setShowForm(true) }} onDelete={handleDelete} loading={loading} />
    </div>
  )
}
