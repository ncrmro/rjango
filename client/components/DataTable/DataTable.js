import React from 'react'
import './DataTable.scss'

export const DataCell = (props) =>
  <td key={props.column.name} >
    {props.row[props.column.name]}
  </td>

export class DataTable extends React.Component {
  render() {
    const { children, columns, rows } = this.props
    return (
      <table >
        <thead>
        <tr>
          {columns.map(column => <th key={column.name} > {column.label}</th>)}
        </tr>
        </thead>
        <tbody>
        {children ? children : rows.map(row =>
          <tr
            key={row.id}
          >{columns.map(column =>
            <DataCell
              column={column}
              row={row}
            />)}
          </tr>)}
        </tbody>
      </table>
    )
  }
}

export  default DataTable