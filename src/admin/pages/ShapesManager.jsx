import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemTable from '../components/ItemTable'
import ItemForm from '../components/ItemForm'

const fields = [
  { key: 'name_en', label: 'Name (English)', required: true },
  { key: 'name_bn', label: 'Name (Bangla)', required: true },
  { key: 'svg_type', label: 'SVG Type' },
  { key: 'color', label: 'Color', type: 'color' },
]

export default function ShapesManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await api.shapes.getAll())
    } catch (err) {
      console.error('Failed to load Shapes data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await api.shapes.update(editing.id, formData)
      } else {
        await api.shapes.create(formData)
      }
      setShowForm(false)
      setEditing(null)
      await load()
    } catch (err) {
      console.error('Failed to save Shapes item:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this shape?')) return
    try {
      await api.shapes.delete(id)
      await load()
    } catch (err) {
      console.error('Failed to delete Shapes item:', err)
    }
  }

  const columns = [
    { key: 'name_en', label: 'English Name' },
    { key: 'name_bn', label: 'Bangla Name' },
    {
      key: 'color', label: 'Color',
      render: (val) => <div className="admin-color-swatch" style={{ background: val }} title={val} />,
    },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Shapes</h2>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add New</button>
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit Shape' : 'Add New Shape'}
        />
      )}

      <ItemTable columns={columns} data={items} onEdit={(item) => { setEditing(item); setShowForm(true) }} onDelete={handleDelete} loading={loading} />
    </div>
  )
}
