/* eslint-disable global-require */
import React from 'react';
import Page from '../../../components/Page/PageComponent';
import { createFragmentContainer, graphql}  from 'react-relay';

const Todos = (props) => <Page heading={'Todos'} >
  {console.log(props)}
  <p>This is the Todos page</p>
</Page>;

export default createFragmentContainer(Todos,{
    viewer: graphql`
        fragment Todos_viewer on Viewer {
            id
            user{
                id
                email
            }
        }
    `})

