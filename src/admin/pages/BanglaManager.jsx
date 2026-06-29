import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client'
import ItemTable from '../components/ItemTable'
import ItemForm from '../components/ItemForm'

const vowelFields = [
  { key: 'character', label: 'Character', required: true },
  { key: 'name', label: 'Name', required: true },
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'description', label: 'Description' },
]

const consonantFields = [
  { key: 'character', label: 'Character', required: true },
  { key: 'name', label: 'Name', required: true },
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'description', label: 'Description' },
]

export default function BanglaManager() {
  const [activeTab, setActiveTab] = useState('vowels')
  const [vowels, setVowels] = useState([])
  const [consonants, setConsonants] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [v, c] = await Promise.all([api.bangla.getVowels(), api.bangla.getConsonants()])
      setVowels(v)
      setConsonants(c)
    } catch (err) {
      console.error('Failed to load Bangla data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const items = activeTab === 'vowels' ? vowels : consonants
  const fields = activeTab === 'vowels' ? vowelFields : consonantFields

  const handleSave = async (formData) => {
    try {
      if (editing) {
        if (activeTab === 'vowels') {
          await api.bangla.updateVowel(editing.id, formData)
        } else {
          await api.bangla.updateConsonant(editing.id, formData)
        }
      } else {
        if (activeTab === 'vowels') {
          await api.bangla.createVowel(formData)
        } else {
          await api.bangla.createConsonant(formData)
        }
      }
      setShowForm(false)
      setEditing(null)
      await load()
    } catch (err) {
      console.error('Failed to save Bangla item:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try {
      if (activeTab === 'vowels') {
        await api.bangla.deleteVowel(id)
      } else {
        await api.bangla.deleteConsonant(id)
      }
      await load()
    } catch (err) {
      console.error('Failed to delete Bangla item:', err)
    }
  }

  const columns = [
    { key: 'character', label: 'Character' },
    { key: 'name', label: 'Name' },
    {
      key: 'image', label: 'Image',
      render: (val) => val ? <img src={val} alt="" className="admin-thumb" /> : '—',
    },
    { key: 'description', label: 'Description' },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Bangla{activeTab === 'vowels' ? ' Vowels' : ' Consonants'}</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            {items.length} {activeTab === 'vowels' ? 'vowels' : 'consonants'} total
          </p>
        </div>
        <button className="admin-btn-add" onClick={() => { setEditing(null); setShowForm(true) }}>
          + Add {activeTab === 'vowels' ? 'Vowel' : 'Consonant'}
        </button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'vowels' ? 'active' : ''} onClick={() => setActiveTab('vowels')}>
          Vowels ({vowels.length})
        </button>
        <button className={activeTab === 'consonants' ? 'active' : ''} onClick={() => setActiveTab('consonants')}>
          Consonants ({consonants.length})
        </button>
      </div>

      {showForm && (
        <ItemForm
          fields={fields}
          initialData={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          title={editing ? 'Edit Item' : 'Add New ' + (activeTab === 'vowels' ? 'Vowel' : 'Consonant')}
        />
      )}

      <ItemTable
        columns={columns}
        data={items}
        onEdit={(item) => { setEditing(item); setShowForm(true) }}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  )
}
