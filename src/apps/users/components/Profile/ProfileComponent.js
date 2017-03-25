/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../../../../components/Page/PageComponent';
import RequireAuth from '../RequireAuth/RequireAuth';
import styles from './Profile.scss';


class Profile extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { user } = this.props.viewer;
    const { email } = user;
    this.state = {
      email,
      password: '',
    };
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailChange(e) {
    const value = e.target.value;

    this.setState({ email: value });
  }


  render() {
    const { email, street, state, zip } = this.state;
    return (
      <Page heading='Profile' >
        <div >
          <Grid>
            <form style={{ width: '100%', margin: 'auto' }} >

              <Cell col={12} >
                <Textfield onChange={this.handleEmailChange.bind(this)} label='Email' value={email} floatingLabel />
              </Cell>

              <Cell col={12} style={{ textAlign: 'right' }} >
                <Button primary >Sign up</Button>

              </Cell>

              <hr />
              <h2 className={styles.heading} >
                Default Address
              </h2>

              <form style={{ margin: 'auto' }} >


                <Cell col={12} >
                  <Textfield
                    onChange={this.handleEmailChange.bind(this)} label='Street' value={street}
                    floatingLabel
                  />
                </Cell>
                <Cell col={12} >
                  <Textfield
                    onChange={this.handleEmailChange.bind(this)} label='State' value={state}
                    floatingLabel
                  />
                </Cell>
                <Cell col={12} >
                  <Textfield
                    onChange={this.handleEmailChange.bind(this)} label='Zip Code' value={zip}
                    floatingLabel
                  />
                </Cell>

                <Cell col={12} style={{ textAlign: 'right' }} >
                  <Button primary >Sign up</Button>

                </Cell>
              </form>

            </form>

          </Grid>


        </div>

      </Page>
    )
      ;
  }


}

export default RequireAuth(Profile);
