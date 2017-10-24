// @flow
import React from 'react'
import './DataTable.scss'

export const DataCell = (props) =>
  <td key={props.column.name} >
    {props.row[props.column.name]}
  </td>

type DataTablePropsType = {
  columns: Array<{ name: string, label: string }>,
  rows: Array<Object>,
  children: ?Object,
}
export class DataTable extends React.Component {
  props: DataTablePropsType

  render() {
    return (
      <table >
        <thead>
        <tr>
          {this.props.columns.map(column => <th
            key={column.name} > {column.label}</th>)}
        </tr>
        </thead>
        <tbody>
        {this.props.children ? this.props.children : this.props.rows.map(row =>
          <tr
            key={row.id}
          >{this.props.columns.map(column =>
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

export default DataTable