/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';
import { createFragmentContainer, graphql}  from 'react-relay';

const Landing = (props) => <Page heading={'Landing'} >
  {console.log(props)}
  <p>This is the landing page</p>
</Page>;

export default createFragmentContainer(Landing,{
    viewer: graphql`
        fragment LandingComponent_viewer on Viewer {
            id
            user{
                id
                email
            }
        }
    `})

