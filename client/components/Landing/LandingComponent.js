/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';

const Landing = (props) => <Page heading={'Landing'} >
  {console.log(props)}
  <p>This is the landing page</p>
</Page>;

export default Landing;
