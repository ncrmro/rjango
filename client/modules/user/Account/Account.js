import React from 'react'
import Page from 'components/Page/Page'
import withRelayContainer from 'utils/relay'
import { graphql } from 'react-relay'

const Account = (props) =>
  <Page heading='Account' >
    {{ props.viewer.user.email}}
  </Page>

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