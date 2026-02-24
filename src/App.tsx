import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import tsLogo from './assets/ts.png'
import './App.css'
import { table1Data, table2Data, table3Data } from './data';
import type { KeyNumber, RowKeyNumber, RowData } from './data';
import { getLogo } from './logo';

type KeyString = "name";
type RowKeyString = Record<KeyString, string>
  & Record<"logoLight", string>
  & Record<"logoDark", string>
  & Record<"rawOrder", number>;

type KeyType = KeyString | KeyNumber;

type RowKey = RowKeyString & RowKeyNumber;
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

const makeRows = (data: RowData[], isDark: boolean): RowKey[] => {
  return data.map((item, index) => {
    return {
      rawOrder: index,
      name: `${item.lastName}, ${item.firstName}`,
      logoLight: getLogo(item.team, false),
      logoDark: getLogo(item.team, true),
      gg: item.gg,
      bet1: item.bet1,
      bet2: item.bet2,
      bet3: item.bet3,
      bet4: item.bet4,
    }
  });
}

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
  // Theme state
  const [darkTheme, setDarkTheme] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Table data and sorting - regenerate when theme changes
  const table1Rows = makeRows(table1Data, darkTheme);
  const table2Rows = makeRows(table2Data, darkTheme);
  const table3Rows = makeRows(table3Data, darkTheme);

  const [rows1, setRows1] = useState(table1Rows);
  const sortedRows1 = [...rows1];

  const [rows2, setRows2] = useState(table2Rows);
  const sortedRows2 = [...rows2];

  const [rows3, setRows3] = useState(table3Rows);
  const sortedRows3 = [...rows3];

  // Update theme when system preference changes
  useEffect(() => {
    const darkModeMql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkTheme(event.matches);
    };
    darkModeMql.addEventListener('change', handleChange);
    return () => darkModeMql.removeEventListener('change', handleChange);
  }, []);

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

  const tsColor = darkTheme ? 'white' : 'black';
  return (
    <>
      <header className='header'>
        Tims Hockey Challenge Picks
      </header>
      <main className='content'>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Team logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="Team logo" />
          </a>
          <a href="https://www.typescriptlang.org" target="_blank">
            <img src={tsLogo} className="logo react" alt="Team logo" />
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
                      <span className='cell-container'>
                        <span className='header-pad'>▲</span>
                        <span className='header-title'>{item.title}</span>
                        <span className={sortConfig1?.keyOrder[0] === item.key ? 'header-sort' : 'header-sort-hidden'}>▲</span>
                      </span>
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {sortedRows1.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                  <td>
                    <span className='cell-container'>
                      <img className='td-name-logo' src={darkTheme ? row.logoDark : row.logoLight} />
                      {row.name}
                    </span>
                  </td>
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
        <div className="table-container">
          <h2>Pick #2</h2>
          <table>
            <thead>
              <tr>
                {
                  columns.map(item => (
                    <th key={item.key}
                      onClick={() => requestSort2(item.key)}>
                      <span className='cell-container'>
                        <span className='header-pad'>▲</span>
                        <span className='header-title'>{item.title}</span>
                        <span className={sortConfig2?.keyOrder[0] === item.key ? 'header-sort' : 'header-sort-hidden'}>▲</span>
                      </span>
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {sortedRows2.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                  <td>
                    <span className='cell-container'>
                      <img className='td-name-logo' src={darkTheme ? row.logoDark : row.logoLight} />
                      {row.name}
                    </span>
                  </td>
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
        <div className="table-container">
          <h2>Pick #3</h2>
          <table>
            <thead>
              <tr>
                {
                  columns.map(item => (
                    <th key={item.key}
                      onClick={() => requestSort3(item.key)}>
                      <span className='cell-container'>
                        <span className='header-pad'>▲</span>
                        <span className='header-title'>{item.title}</span>
                        <span className={sortConfig3?.keyOrder[0] === item.key ? 'header-sort' : 'header-sort-hidden'}>▲</span>
                      </span>
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {sortedRows3.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                  <td>
                    <span className='cell-container'>
                      <img className='td-name-logo' src={darkTheme ? row.logoDark : row.logoLight} />
                      {row.name}
                    </span>
                  </td>
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
      </main>
    </>
  )
}

export default App
