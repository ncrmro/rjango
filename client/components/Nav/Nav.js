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

type NavStateType = {
  userDropdownIsOpen: boolean,
}

class Nav extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      userDropdownIsOpen: false
    }
  }

  state: NavStateType
  props: NavPropsType

  toggleUserDropdown() {
    this.setState({ userDropdownIsOpen: !this.state.userDropdownIsOpen })
  }

  pushRoute(route = '/') {
    this.props.history.push(route)
  }

  render() {
    return (
      <div className={styles.navRoot} >
        <Toolbar>
          <ToolbarRow className={styles.toolbarRow} >
            <ToolbarSection align='start' >
              <ToolbarTitle
                className={styles.title}
                onClick={this.pushRoute.bind(this)}
              >
                {this.props.title}
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection
              align='end'
            >
              <Links
                userDropdownIsOpen={this.state.userDropdownIsOpen}
                toggleUserDropdown={this.toggleUserDropdown.bind(this)}
                pushRoute={this.pushRoute.bind(this)}
                viewer={this.props.viewer}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
  }


}

export default withRouter(Nav)
