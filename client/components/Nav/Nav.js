// @flow
import React from 'react'
import Toolbar from 'react-mdc-web/lib/Toolbar/Toolbar'
import ToolbarSection from 'react-mdc-web/lib/Toolbar/ToolbarSection'
import ToolbarTitle from 'react-mdc-web/lib/Toolbar/ToolbarTitle'
import ToolbarRow from 'react-mdc-web/lib/Toolbar/ToolbarRow'
import styles from './Nav.scss'
import withRouter from 'react-router-dom/es/withRouter'
import Links from './Links'

type NavPropsType = {
  title: string,
  viewer: {
    user: Object,
    isAuthenticated: boolean,
    isAdmin: boolean
  },
  history: Object
}

const Nav = (props: NavPropsType) =>
  <div className={styles.navRoot} >
    <Toolbar>
      <ToolbarRow className={styles.toolbarRow} >
        <ToolbarSection align='start' >
          <ToolbarTitle
            className={`${styles.title} home_button`}
            onClick={() => props.history.push('/')}
          >
            {props.title}
          </ToolbarTitle>
        </ToolbarSection>
        <ToolbarSection
          align='end'
        >
          <Links
            pushRoute={props.history.push}
            viewer={props.viewer}
          />
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>
  </div>

export default withRouter(Nav)
