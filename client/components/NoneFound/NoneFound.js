import React from 'react'
import Page from 'components/Page/Page'


const NoneFound = (props) =>
  <Page heading='None Found'>
    <p>Nothing was found {props.text ? props.text : 'here'} </p>
  </Page>

export default NoneFound