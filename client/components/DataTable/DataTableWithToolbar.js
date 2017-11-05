import React from 'react'
import DataTable from './DataTable'
import Fab from 'react-mdc-web/lib/Fab/Fab'
import Icon from 'react-mdc-web/lib/Icon/Icon'
import styles from './DataTableWithToolbar.scss'
import type DataTablePropsType from './DataTable'

type DataTableWithToolbarProps = DataTablePropsType & {
  addFunction: Function
}
const DataTableWithToolbar = (props: DataTableWithToolbarProps) =>
  <div className={styles.root} >
    <div
      className={styles.dataTable}
    >
      <Fab
        className={styles.addButton}
        onClick={() => props.addFunction()}
      >
        <Icon name='add' />
      </Fab>
      <DataTable
        {...props}
        className={styles.dataTable}
      />
    </div>

  </div>

export default DataTableWithToolbar