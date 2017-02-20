/* eslint-disable jsx-a11y/href-no-hash */
import React from "react";
import Relay from "react-relay";
import {Grid, Cell, Textfield, Button, Checkbox} from "react-mdl";
import Page from "../../../../components/Page/PageComponent";
//import LoginUserMutation from "./LoginUserMutation";
import CheckForAuth from "../CheckForAuth/CheckForAuth"


class Profile extends React.Component {
    static propTypes = {
        viewer: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.viewer.email
        };
    }


    render() {
        const {email} = this.props.viewer.user;
        return (
                <Page heading='Profile'>
                    <div style={{ width: '70%', margin: 'auto' }}>
                        <Grid>
                            <form style={{ margin: 'auto' }}>

                                <Cell col={12}>
                                    <Textfield onChange={this.handleEmailChange.bind(this)} label='Email' value={email}
                                               floatingLabel/>
                                </Cell>

                                <Cell col={12} style={{ textAlign: 'right' }}>
                                    <Button primary>Edit</Button>

                                </Cell>
                            </form>
                        </Grid>
                    </div>
                </Page>
        );
    }

    handleEmailChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
}

export default CheckForAuth(Profile)