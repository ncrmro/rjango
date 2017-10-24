import React from 'react'
import IconToggle from 'react-mdc-web/lib/IconToggle/IconToggle'
import styles from './MobileFooterToolbar.scss'
import { HomeLink } from '../Nav'

class MobileFooterToolBar extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      homeNotification: false,
      starred: false,
      pollNotification: false,
      notifications: false
    }
  }


  render() {
    return (
      <div className={styles.root} >
        <IconToggle
          className="material-icons"
          onClick={() => {
            this.setState({ homeNotification: !this.state.homeNotification })
          }}
        >
          {this.state.starred ? 'home' : 'home'}
        </IconToggle>
        <IconToggle
          className="material-icons"
          onClick={() => {
            this.setState({ starred: !this.state.starred })
          }}
        >
          {this.state.starred ? 'star' : 'star_border'}
        </IconToggle>

        <IconToggle
          className="material-icons"
          onClick={() => {
            this.setState({ pollNotification: !this.state.pollNotification })
          }}
        >
          {this.state.pollNotification ? 'poll' : 'poll'}
        </IconToggle>

        <IconToggle
          className="material-icons"
          onClick={() => {
            this.setState({ notifications: !this.state.notifications })
          }}
        >
          {this.state.notifications ? 'notifications' : 'notifications_none'}
        </IconToggle>

      </div>
    )
  }
}
export default MobileFooterToolBar