import { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'

export default function ItemForm({ fields, initialData, onSave, onCancel, title }) {
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      const init = {}
      fields.forEach((f) => { init[f.key] = initialData[f.key] || '' })
      setForm(init)
    } else {
      const init = {}
      fields.forEach((f) => { init[f.key] = f.defaultValue ?? '' })
      setForm(init)
    }
  }, [initialData, fields])

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
    } catch (err) {
      alert('Error saving: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h3 className="admin-form-title">{title}</h3>

      {fields.map((field) => (
        <div className="admin-field" key={field.key}>
          <label>{field.label}</label>

          {field.type === 'image' ? (
            <ImageUpload
              currentImage={form[field.key]}
              onUpload={(url) => handleChange(field.key, url)}
            />
          ) : field.type === 'textarea' ? (
            <textarea
              value={form[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              rows={field.rows || 4}
              required={field.required}
              placeholder={field.placeholder}
            />
          ) : field.type === 'color' ? (
            <div className="admin-color-picker">
              <input
                type="color"
                value={form[field.key] || '#000000'}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
              <input
                type="text"
                value={form[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder="#HEX"
              />
            </div>
          ) : field.type === 'select' ? (
            <select
              value={form[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              required={field.required}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || 'text'}
              value={form[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn-save" disabled={saving}>
          {saving ? 'Saving...' : (initialData ? 'Update' : 'Create')}
        </button>
        <button type="button" className="admin-btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
