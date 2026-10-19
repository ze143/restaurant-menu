export default function DataTable({ columns, data, emptyMessage = "لا توجد بيانات" }) {
  return (
    <div className="card-glass overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-brand-gold/10 text-brand-gold">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="p-4 text-right font-bold whitespace-nowrap">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id || i}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                {columns.map((c) => (
                  <td key={c.key} className="p-4">
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}