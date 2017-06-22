/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Page from 'components/Page/Page';
import {} from 'modules/auth/utils'
import { createFragmentContainer, graphql } from 'react-relay';

const Account = (props) =>
  <Page heading='Account' >
    <div style={{ width: '100%', margin: 'auto' }} >


    </div>
  </Page>;

export default createFragmentContainer(Account, {
  viewer: graphql`
      fragment Account_viewer on Viewer {
          id
          
      }
  ` }
);