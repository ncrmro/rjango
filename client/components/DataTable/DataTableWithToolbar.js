// @flow
import React from 'react'
import DataTable from './DataTable'
import Fab from 'react-mdc-web/lib/Fab/Fab'
import Icon from 'react-mdc-web/lib/Icon/Icon'
import styles from './DataTableWithToolbar.scss'


type DataTableWithToolbarProps = {
  addFunction: Function
}
export class DataTableWithToolbar extends React.Component {
  props: DataTableWithToolbarProps

  render() {
    return (
      <div className={styles.root} >
        <div
          className={styles.dataTable}
        >
          <Fab
            className={styles.addButton}
            onClick={() => this.props.addFunction()}
          >
            <Icon name='add' />
          </Fab>
          <DataTable
            {...this.props}
            className={styles.dataTable}
          />
        </div>

      </div>
    )
  }
}

export default DataTableWithToolbar