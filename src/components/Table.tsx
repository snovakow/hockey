import type { Team } from "./logo";

type DataString = "firstName" | "lastName";
type RowDataString = Record<DataString, string>;

type KeyNumber = "gg" | "bet1" | "bet2" | "bet3" | "bet4";
type RowKeyNumber = Record<KeyNumber, number>;

type KeyString = "name";
type RowKeyString = Record<KeyString, string>
    & Record<"logoLight", string>
    & Record<"logoDark", string>
    & Record<"rawOrder", number>;

export type RowData = RowDataString & RowKeyNumber & { team: Team };
export type KeyType = KeyString | KeyNumber;
export type RowKey = RowKeyString & RowKeyNumber;

export default function Table(props: {
    columns: { key: KeyType; title: string }[],
    sortedRows: RowKey[]
    requestSort: (key: KeyType) => void,
    sortConfig: { keyOrder: KeyType[] } | null,
    darkTheme: boolean
}) {
    const { columns, sortedRows, requestSort, sortConfig, darkTheme } = props;
    return (
        <table>
            <thead>
                <tr>
                    {
                        columns.map(item => (
                            <th key={item.key}
                                onClick={() => requestSort(item.key)}>
                                <span className='cell-container'>
                                    <span className='header-pad'>▲</span>
                                    <span className='header-title'>{item.title}</span>
                                    <span className={sortConfig?.keyOrder[0] === item.key ? 'header-sort' : 'header-sort-hidden'}>▲</span>
                                </span>
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {sortedRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'row-color' : 'row-color-alt'}>
                        <td>
                            <span className='cell-container'>
                                <img className='td-name-logo' src={darkTheme ? row.logoDark : row.logoLight} />
                                {row.name}
                            </span>
                        </td>
                        <td>{row.gg.toFixed(2)}</td>
                        <td>{row.ggChance}</td>
                        <td>{row.bet1}</td>
                        <td>{row.betChance1}</td>
                        <td>{row.bet2}</td>
                        <td>{row.bet3}</td>
                        <td>{row.bet4}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
