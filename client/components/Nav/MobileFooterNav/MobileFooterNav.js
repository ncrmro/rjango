import React from 'react'
import IconToggle from 'react-mdc-web/lib/IconToggle/IconToggle'
import styles from './MobileFooterNav.scss'
import { HomeLink } from '../Nav'
import withRouter from 'react-router-dom/es/withRouter'


class MobileFooterNav extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      homeNotification: false,
      starred: false,
      pollNotification: false,
      notifications: false
    }
  }

  toggleNotification(icon) {
    const state = { ...this.state }
    state[icon] = !this.state[icon]
    this.setState(state)
  }


  render() {
    return (
      <div className={styles.root} >
        <IconToggle
          className="material-icons"
          onClick={() => this.props.history.push('/')}
        >
          home
        </IconToggle>


        <IconToggle
          className="material-icons"
          onClick={() => this.toggleNotification('pollNotification')}
        >
          {this.state.pollNotification ? 'poll' : 'poll'}
        </IconToggle>

        <IconToggle
          className="material-icons"
          onClick={() => this.toggleNotification('notifications')}
        >
          {this.state.notifications ? 'notifications' : 'notifications_none'}
        </IconToggle>
        <IconToggle
          className="material-icons"
          onClick={() => this.props.history.push('/account')}
        >
          account_circle
        </IconToggle>

      </div>
    )
  }
}
export default withRouter(MobileFooterNav)