import { Line } from "react-chartjs-2";

export default function Table({ data }) {
  return (
    <div className="overflow-x-auto w-[96vw] lg:w-[70vw] mt-1">
      <div className="inline-block min-w-full">
        <table className="table-auto w-full border-collapse border border-white">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-white px-4 py-2"></th>
              {Array.from({ length: 60 }, (_, index) => (
                <th key={index} className="border border-white px-4 py-2">
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white bg-blue-800 text-white px-4 py-2">
                Precipitation
              </td>
              {data.map((entry, index) => (
                <td
                  key={index}
                  className="border border-white px-4 py-2 text-white"
                >
                  {entry.precip}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-white bg-blue-800 text-white px-4 py-2">
                Snow
              </td>
              {data.map((entry, index) => (
                <td
                  key={index}
                  className="border border-white px-4 py-2 text-white"
                >
                  {entry.snow}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-white bg-blue-800 text-white px-4 py-2">
                Temperature°C
              </td>
              {data.map((entry, index) => (
                <td
                  key={index}
                  className="border border-white px-4 py-2 text-white"
                >
                  {entry.temp}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
