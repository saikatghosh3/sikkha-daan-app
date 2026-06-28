export default function ItemTable({ columns, data, onEdit, onDelete, loading }) {
  if (loading) return <div className="admin-loading">Loading...</div>

  if (!data || data.length === 0) {
    return <div className="admin-empty">No items found. Add one to get started.</div>
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              <td>
                <div className="admin-action-btns">
                  <button className="admin-btn-edit" onClick={() => onEdit(item)}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => onDelete(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
