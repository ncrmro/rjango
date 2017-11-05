import React from 'react'
import Page from 'components/Page/Page'
import Link from 'react-router-dom/es/Link'
import Button from 'react-mdc-web/lib/Button/Button'
const Landing = () =>
  <Page heading='Landing' >
    <p>This is the landing page</p>
    <Link to='/polls' ><Button>Polls</Button></Link>
  </Page>

export default Landing
