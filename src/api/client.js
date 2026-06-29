const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

function imgUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return (import.meta.env.VITE_API_URL || '') + path
}

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

export { imgUrl }

export const api = {
  // Bangla
  bangla: {
    getVowels: () => request('/bangla/vowels'),
    getVowel: (id) => request(`/bangla/vowels/${id}`),
    createVowel: (data) => request('/bangla/vowels', { method: 'POST', body: JSON.stringify(data) }),
    updateVowel: (id, data) => request(`/bangla/vowels/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteVowel: (id) => request(`/bangla/vowels/${id}`, { method: 'DELETE' }),
    getConsonants: () => request('/bangla/consonants'),
    getConsonant: (id) => request(`/bangla/consonants/${id}`),
    createConsonant: (data) => request('/bangla/consonants', { method: 'POST', body: JSON.stringify(data) }),
    updateConsonant: (id, data) => request(`/bangla/consonants/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteConsonant: (id) => request(`/bangla/consonants/${id}`, { method: 'DELETE' }),
  },

  // English
  english: {
    getAll: () => request('/english'),
    get: (id) => request(`/english/${id}`),
    create: (data) => request('/english', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/english/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/english/${id}`, { method: 'DELETE' }),
  },

  // Numbers
  numbers: {
    getBangla: () => request('/numbers/bangla'),
    getBanglaItem: (id) => request(`/numbers/bangla/${id}`),
    createBangla: (data) => request('/numbers/bangla', { method: 'POST', body: JSON.stringify(data) }),
    updateBangla: (id, data) => request(`/numbers/bangla/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBangla: (id) => request(`/numbers/bangla/${id}`, { method: 'DELETE' }),
    getEnglish: () => request('/numbers/english'),
    getEnglishItem: (id) => request(`/numbers/english/${id}`),
    createEnglish: (data) => request('/numbers/english', { method: 'POST', body: JSON.stringify(data) }),
    updateEnglish: (id, data) => request(`/numbers/english/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteEnglish: (id) => request(`/numbers/english/${id}`, { method: 'DELETE' }),
  },

  // Rhymes
  rhymes: {
    getBangla: () => request('/rhymes/bangla'),
    createBangla: (data) => request('/rhymes/bangla', { method: 'POST', body: JSON.stringify(data) }),
    updateBangla: (id, data) => request(`/rhymes/bangla/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBangla: (id) => request(`/rhymes/bangla/${id}`, { method: 'DELETE' }),
    getEnglish: () => request('/rhymes/english'),
    createEnglish: (data) => request('/rhymes/english', { method: 'POST', body: JSON.stringify(data) }),
    updateEnglish: (id, data) => request(`/rhymes/english/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteEnglish: (id) => request(`/rhymes/english/${id}`, { method: 'DELETE' }),
  },

  // Match Game
  matchGame: {
    getAll: (mode) => request(`/matchgame${mode ? `?mode=${mode}` : ''}`),
    create: (data) => request('/matchgame', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/matchgame/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/matchgame/${id}`, { method: 'DELETE' }),
  },

  // Shapes
  shapes: {
    getAll: () => request('/shapes'),
    create: (data) => request('/shapes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/shapes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/shapes/${id}`, { method: 'DELETE' }),
  },

  // Colors
  colors: {
    getAll: () => request('/colors'),
    create: (data) => request('/colors', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/colors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/colors/${id}`, { method: 'DELETE' }),
  },

  // General Knowledge
  generalKnowledge: {
    getAll: () => request('/general-knowledge'),
    get: (id) => request(`/general-knowledge/${id}`),
    create: (data) => request('/general-knowledge', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/general-knowledge/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/general-knowledge/${id}`, { method: 'DELETE' }),
  },

  // Auth
  auth: {
    login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  },

  // Upload
  upload: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(err.error || 'Upload failed')
    }
    const data = await res.json()
    data.url = imgUrl(data.url)
    return data
  },
}
