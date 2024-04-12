export default function Table({ data, prefix }) {
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto w-[96vw] lg:w-[90vw] mt-10">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3">{prefix}</th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
                {prefix} {rowIndex + 1}
              </td>{" "}
              {/* Row header cell */}
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {header === "weather"
                    ? item[header]["description"]
                    : item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
