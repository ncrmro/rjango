// @flow
import React from 'react'
import './DataTable.scss'

type DataCellPropsType = {
  column: {
    name: string
  },
  row: Object,
}

export const DataCell = (props: DataCellPropsType) =>
  <td key={props.column.name} >
    {props.row[props.column.name]}
  </td>

export type DataTablePropsType = {
  columns: Array<{ name: string, label: string }>,
  rows: ?Array<Object>,
  children: ?Object,
}
const DataTable = (props: DataTablePropsType) =>
  <table >
    <thead>
    <tr>
      {props.columns.map(column => <th
        key={column.name} > {column.label}</th>)}
    </tr>
    </thead>
    <tbody>
    {props.children ? props.children : null}
    {props.rows ? props.rows.map(row =>
      <tr
        key={row.id}
      >{props.columns.map(column =>
        <DataCell
          column={column}
          row={row}
        />
      )}
      </tr>
    ) : null}
    </tbody>
  </table>

export default DataTable