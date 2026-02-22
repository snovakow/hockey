import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { table1Data, table2Data, table3Data } from './data';
import type { KeyNumber, RowKeyNumber, RowData } from './data';
import { getLogo } from './logo';

const darkTheme = true;

type KeyString = "name";
type RowKeyString = Record<KeyString, string>;

type KeyType = KeyString | KeyNumber;

type RowKey = RowKeyString & RowKeyNumber & Record<"rawOrder", number>;
type OrderKeyType = KeyType | "rawOrder";

interface ColumnData {
  key: KeyType;
  title: string;
}

const columns: ColumnData[] = [
  { key: "name", title: "Player" },
  { key: "gg", title: "GG" },
  { key: "bet1", title: "Bet1" },
  { key: "bet2", title: "Bet2" },
  { key: "bet3", title: "Bet3" },
  { key: "bet4", title: "Bet4" },
];

const makeRows = (data: RowData[]): RowKey[] => {
  return data.map((item, index) => {
    return {
      rawOrder: index,
      name: `${item.lastName}, ${item.firstName}`,
      gg: item.gg,
      bet1: item.bet1,
      bet2: item.bet2,
      bet3: item.bet3,
      bet4: item.bet4,
    }
  });
}

const table1Rows = makeRows(table1Data);
const table2Rows = makeRows(table2Data);
const table3Rows = makeRows(table3Data);

interface SortConfig {
  keyOrder: KeyType[];
}

const sortFunction = (sortConfig: SortConfig) => {
  return (a: RowKey, b: RowKey) => {
    const keyOrder: OrderKeyType[] = [...sortConfig.keyOrder, "rawOrder"];
    for (const key of keyOrder) {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        if (aVal !== bVal) return aVal - bVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal, undefined, { sensitivity: 'base' });
        if (comparison !== 0) return comparison;
      }
    }
    return 0;
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

  const [sortConfig1, setSortConfig1] = useState<SortConfig | null>(null);
  const [sortConfig2, setSortConfig2] = useState<SortConfig | null>(null);
  const [sortConfig3, setSortConfig3] = useState<SortConfig | null>(null);

  if (sortConfig1 !== null) {
    sortedRows1.sort(sortFunction(sortConfig1));
  }
  if (sortConfig2 !== null) {
    sortedRows2.sort(sortFunction(sortConfig2));
  }
  if (sortConfig3 !== null) {
    sortedRows3.sort(sortFunction(sortConfig3));
  }

  const requestSort1 = (keyPrimary: KeyType) => {
    if (!sortConfig1) {
      setSortConfig1({ keyOrder: [keyPrimary] });
      return;
    }
    if (sortConfig1.keyOrder[0] === keyPrimary) {
      setSortConfig1(null);
      return;
    }
    const keyOrder = [keyPrimary];
    for (const key of sortConfig1.keyOrder) {
      if (key === keyPrimary) continue;
      keyOrder.push(key);
    }
    setSortConfig1({ keyOrder });
  };
  const requestSort2 = (keyPrimary: KeyType) => {
    if (!sortConfig2) {
      setSortConfig2({ keyOrder: [keyPrimary] });
      return;
    }
    if (sortConfig2.keyOrder[0] === keyPrimary) {
      setSortConfig2(null);
      return;
    }
    const keyOrder = [keyPrimary];
    for (const key of sortConfig2.keyOrder) {
      if (key === keyPrimary) continue;
      keyOrder.push(key);
    }
    setSortConfig2({ keyOrder });
  };
  const requestSort3 = (keyPrimary: KeyType) => {
    if (!sortConfig3) {
      setSortConfig3({ keyOrder: [keyPrimary] });
      return;
    }
    if (sortConfig3.keyOrder[0] === keyPrimary) {
      setSortConfig3(null);
      return;
    }
    const keyOrder = [keyPrimary];
    for (const key of sortConfig3.keyOrder) {
      if (key === keyPrimary) continue;
      keyOrder.push(key);
    }
    setSortConfig3({ keyOrder });
  };
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={getLogo("TOR", false)} className="logo" alt="Team logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={getLogo("TOR", true)} className="logo react" alt="Team logo" />
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
      <div className="table-container">
        <h2>Pick #1</h2>
        <table>
          <thead>
            <tr>
              {
                columns.map(item => (
                  <th key={item.key}
                    onClick={() => requestSort1(item.key)}>
                    {item.title} {sortConfig1?.keyOrder[0] === item.key ? '▲' : '△'}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              sortedRows1.map((row, idx) => (
                // <tr key={idx} style={{ background: idx % 2 === 0 ? '#f9f9f9' : '#e6f0fa' }}>
                <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                  <td>{row.name}</td>
                  <td>{row.gg.toFixed(2)}</td>
                  <td>{row.bet1}</td>
                  <td>{row.bet2}</td>
                  <td>{row.bet3}</td>
                  <td>{row.bet4}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <h2>Pick #2</h2>
        <table>
          <thead>
            <tr>
              {
                columns.map(item => (
                  <th key={item.key}
                    onClick={() => requestSort2(item.key)}>
                    {item.title} {sortConfig2?.keyOrder[0] === item.key ? '▲' : '△'}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {sortedRows2.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                <td>{row.name}</td>
                <td>{row.gg.toFixed(2)}</td>
                <td>{row.bet1}</td>
                <td>{row.bet2}</td>
                <td>{row.bet3}</td>
                <td>{row.bet4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Pick #3</h2>
        <table>
          <thead>
            <tr>
              {
                columns.map(item => (
                  <th key={item.key}
                    onClick={() => requestSort3(item.key)}>
                    {item.title} {sortConfig3?.keyOrder[0] === item.key ? '▲' : '△'}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {sortedRows3.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                <td>{row.name}</td>
                <td>{row.gg.toFixed(2)}</td>
                <td>{row.bet1}</td>
                <td>{row.bet2}</td>
                <td>{row.bet3}</td>
                <td>{row.bet4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App

