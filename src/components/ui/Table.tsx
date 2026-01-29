'use client';

import { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  rows: ReactNode[][];
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-right border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
