/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';
import RequireAuth from '../../apps/users/components/RequireAuth/RequireAuth';

const Dashboard = ({ viewer }) =>
  <Page heading='Dashboard' >
    <div>
      <br />
      {viewer.user.email}
      <p>This is the dashboard</p>
    </div>
  </Page>;

Dashboard.propTypes = {
  viewer: React.PropTypes.object.isRequired
};

export default RequireAuth(Dashboard);
