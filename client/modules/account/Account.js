import React from 'react'
import Page from 'components/Page/Page'
import withRelayContainer from 'utils/relay'
import Textfield from 'react-mdc-web/lib/Textfield/Textfield'
import Button from 'react-mdc-web/lib/Button/Button'
import { graphql } from 'react-relay'
import styles from './Account.scss'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewer: {
        user: {
          email: props.viewer.user.email
        }
      }
    }
  }

  handleFieldChange(e, key) {
    const viewer = { ...this.state.viewer }
    viewer.user[key] = e.target.value
    console.log('handlefieldchange', viewer)

    this.setState({ viewer })
  }

  render() {
    return (
      <Page heading='Account' >
        <div className={styles.root} >
          <form >
            <Textfield
              onChange={(e) => this.handleFieldChange(e, 'email')}
              value={this.state.viewer.user.email}
              floatingLabel='Email'
              type='email'
            />
            <br/>
            <Button>Update</Button>
          </form>
        </div>
      </Page>
    )
  }

}

const query = graphql`
    query AccountQuery {
        viewer{
            id
            user{
                id
                email
            }
        }
    }
`
export default withRelayContainer(Account, query, {})