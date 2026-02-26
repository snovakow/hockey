import type { Team } from "./logo";

type KeyNumber = "bet1" | "bet2" | "bet3" | "bet4";
type RowKeyNumber = Record<KeyNumber, number>;

type KeyString = "name";
type RowKeyString = Record<KeyString, string>
    & Record<"gg", number>
    & Record<"logoLight", string>
    & Record<"logoDark", string>
    & Record<"rawOrder", number>
    & Record<"ggChance", string>
    & Record<"betChance1", string>
    & Record<"betChance2", string>
    & Record<"betChance3", string>
    & Record<"betChance4", string>;

export type RowData = RowDataString & RowKeyNumber & { team: Team };
export type KeyType = KeyString | KeyNumber | "gg";
export type RowKey = RowKeyString & RowKeyNumber & { gg: number };

export interface ColumnData {
    key: KeyType;
    title: string;
}

export type RequestSort = (key: KeyType) => void;

export interface SortConfig {
    keyOrder: KeyType[];
}

export default function Table(props: {
    columns: ColumnData[],
    sortedRows: RowKey[]
    requestSort: RequestSort,
    sortConfig: SortConfig | null,
    darkTheme: boolean,
    chances: boolean
}) {
    const { columns, sortedRows, requestSort, sortConfig, darkTheme, chances } = props;
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
                        <td>{chances ? row.ggChance : row.gg.toFixed(2)}</td>
                        <td>{chances ? row.betChance1 : (row.bet1 || "-")}</td>
                        <td>{chances ? row.betChance2 : (row.bet2 || "-")}</td>
                        <td>{chances ? row.betChance3 : (row.bet3 || "-")}</td>
                        <td>{chances ? row.betChance4 : (row.bet4 || "-")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
