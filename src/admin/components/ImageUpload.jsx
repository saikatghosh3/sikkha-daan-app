import { useState } from 'react'
import { api } from '../../api/client'

export default function ImageUpload({ currentImage, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB.')
      return
    }

    setUploading(true)
    try {
      const result = await api.upload(file)
      setPreview(result.url)
      onUpload(result.url)
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-upload">
      {preview && (
        <div className="admin-upload-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
      <label className="admin-upload-btn">
        {uploading ? 'Uploading...' : (preview ? 'Change Image' : 'Upload Image')}
        <input type="file" accept="image/*" onChange={handleFile} hidden disabled={uploading} />
      </label>
      {preview && currentImage && (
        <button type="button" className="admin-upload-remove" onClick={() => { setPreview(null); onUpload('') }}>
          Remove
        </button>
      )}
    </div>
  )
}
