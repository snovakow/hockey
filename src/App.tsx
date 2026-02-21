import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type KeyString = "name";
type KeyNumber = "gg" | "bet1" | "bet2" | "bet3" | "bet4";
type KeyType = KeyString | KeyNumber;

type RowDataString = Record<KeyString, string>;
type RowDataNumber = Record<KeyNumber, number>;

type RowData = RowDataString & RowDataNumber;

interface ColumnData {
  key: KeyType;
  title: string;
}

const columns: ColumnData[] = [
  { key: "name", title: "Name" },
  { key: "gg", title: "GG" },
  { key: "bet1", title: "Bet1" },
  { key: "bet2", title: "Bet2" },
  { key: "bet3", title: "Bet3" },
  { key: "bet4", title: "Bet4" },
];

const table1Rows: RowData[] = [
  { name: "Anze Kopitar", gg: 0.2, bet1: 200, bet2: 220, bet3: 200, bet4: 200 },
  { name: "Reilly Smith", gg: 0.21, bet1: 210, bet2: 220, bet3: 200, bet4: 200 },
  { name: "Taylor Hall", gg: 0.21, bet1: 220, bet2: 200, bet3: 220, bet4: 200 },
  { name: "Mikael Granlund", gg: 0.2, bet1: 230, bet2: 200, bet3: 220, bet4: 200 },
];
const table2Rows: RowData[] = [
  { name: "Ryan Strome", gg: 0.2, bet1: 200, bet2: 220, bet3: 200, bet4: 200 },
  { name: "Hampus Lindholm", gg: 0.21, bet1: 210, bet2: 220, bet3: 200, bet4: 200 },
  { name: "Jordan Martinook", gg: 0.21, bet1: 220, bet2: 200, bet3: 220, bet4: 200 },
  { name: "Nicholas Paul", gg: 0.2, bet1: 230, bet2: 200, bet3: 220, bet4: 200 },
];
const table3Rows: RowData[] = [
  { name: "Ryan McDonagh", gg: 0.2, bet1: 200, bet2: 220, bet3: 200, bet4: 200 },
  { name: "Yanni Gourde", gg: 0.21, bet1: 210, bet2: 220, bet3: 200, bet4: 200 },
  { name: "Jaccob Slavin", gg: 0.21, bet1: 220, bet2: 200, bet3: 220, bet4: 200 },
  { name: "Ross Johnston", gg: 0.2, bet1: 230, bet2: 200, bet3: 220, bet4: 200 },
];

const getLastName = (fullName: string) => {
  const firstSpaceIndex = fullName.indexOf(' ');

  if (firstSpaceIndex === -1) {
    return fullName; // No space found, return the original string
  } else {
    return fullName.slice(firstSpaceIndex + 1);
  }
}

function App() {
  // Table data and sorting
  const [rows1, setRows1] = useState(table1Rows);
  const sortedRows1 = [...rows1];

  const [rows2, setRows2] = useState(table2Rows);
  const sortedRows2 = [...rows2];

  const [rows3, setRows3] = useState(table3Rows);
  const sortedRows3 = [...rows3];

  const [sortConfig, setSortConfig] = useState<{ key: KeyType; direction: 'asc' | 'desc'; } | null>(null);

  if (sortConfig !== null) {
    sortedRows1.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const aName = getLastName(aVal);
        const bName = getLastName(bVal);
        return aName.localeCompare(bName, undefined, { sensitivity: 'base' });
      }
      return 0;
    });
  }

  const requestSort = (key: KeyType) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* Sortable Table */}
      <div style={{ marginTop: 32 }}>
        <h2>Pick # 1</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {
                columns.map(item => (
                  <th key={item.key} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '8px' }}
                    onClick={() => requestSort(item.key)}>
                    {item.title} {sortConfig?.key === item.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {sortedRows1.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.gg}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet2}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet3}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Pick # 2</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {
                columns.map(item => (
                  <th key={item.key} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '8px' }}
                    onClick={() => requestSort(item.key)}>
                    {item.title} {sortConfig?.key === item.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {sortedRows2.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.gg}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet2}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet3}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Pick # 3</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {
                columns.map(item => (
                  <th key={item.key} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '8px' }}
                    onClick={() => requestSort(item.key)}>
                    {item.title} {sortConfig?.key === item.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {sortedRows3.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.gg}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet2}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet3}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bet4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App

