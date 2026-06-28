import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemTable from '../components/ItemTable'
import ItemForm from '../components/ItemForm'

const fields = [
  { key: 'character', label: 'Character', required: true },
  { key: 'name', label: 'Name', required: true },
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'description', label: 'Description' },
]

export default function NumbersManager() {
  const [activeTab, setActiveTab] = useState('bangla')
  const [bangla, setBangla] = useState([])
  const [english, setEnglish] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [b, e] = await Promise.all([api.numbers.getBangla(), api.numbers.getEnglish()])
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
    const ep = activeTab === 'bangla' ? api.numbers : api.numbers
    if (editing) {
      if (activeTab === 'bangla') {
        await ep.updateBangla(editing.id, formData)
      } else {
        await ep.updateEnglish(editing.id, formData)
      }
    } else {
      if (activeTab === 'bangla') {
        await ep.createBangla(formData)
      } else {
        await ep.createEnglish(formData)
      }
    }
    setShowForm(false)
    setEditing(null)
    await load()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    if (activeTab === 'bangla') {
      await api.numbers.deleteBangla(id)
    } else {
      await api.numbers.deleteEnglish(id)
    }
    await load()
  }

  const columns = [
    { key: 'character', label: 'Character' },
    { key: 'name', label: 'Name' },
    { key: 'image', label: 'Image', render: (val) => val ? <img src={val} alt="" className="admin-thumb" /> : '—' },
    { key: 'description', label: 'Description' },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Numbers</h2>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add New</button>
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
          title={editing ? 'Edit Number' : 'Add New Number'}
        />
      )}

      <ItemTable columns={columns} data={items} onEdit={(item) => { setEditing(item); setShowForm(true) }} onDelete={handleDelete} loading={loading} />
    </div>
  )
}
