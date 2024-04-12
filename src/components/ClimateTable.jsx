import React, { useState } from "react";

export default function Table({ data }) {
  // Remove the second column from the headers
  const headers = Object.keys(data[0]).filter((header) => header !== "month");

  return (
    <div className="overflow-x-auto w-[96vw] lg:w-[90vw] mt-10">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Date
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium bg-gray-100">
                Month{item.month},Day{item.day}
              </td>
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
