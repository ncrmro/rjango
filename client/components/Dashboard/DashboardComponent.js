/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';
import RequireAuth from '../../modules/users/RequireAuth/RequireAuth';
import UserTodos from '../../modules/todos/UserTodos/UserTodosContainer';

const Dashboard = ({ viewer }) =>
  <Page heading='Dashboard' >
    <div>
      <br />
      {viewer.user.email}
      <p>This is the dashboard</p>

      <UserTodos user={viewer.user}/>
    </div>
  </Page>;

Dashboard.propTypes = {
  viewer: React.PropTypes.object.isRequired
};

export default RequireAuth(Dashboard);
