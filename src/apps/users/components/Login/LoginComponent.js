/* eslint-disable jsx-a11y/href-no-hash */
import React from "react";
import Relay from "react-relay";
import {Grid, Cell, Textfield, Button, Checkbox} from "react-mdl";
import Page from "../../../../components/Page/PageComponent";
import LoginUserMutation from "./LoginUserMutation";

export default class Login extends React.Component {
    static propTypes = {
        viewer: React.PropTypes.object.isRequired,
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailValid: false,
            isPasswordPresent: false,
            errorEmail: false,
            errorPassword: false
        };
    }


    loginUser = (form) => {
        form.preventDefault();
        const {email, password, isEmailValid, isPasswordPresent} = this.state;
        if (isEmailValid && isPasswordPresent) {
            const viewer = this.props.viewer;
            const loginUserMutation = new LoginUserMutation({
                viewer,
                email,
                password
            });
            var onFailure = (transaction) => {
                console.log("failure", transaction)
            };

            var onSuccess = (response) => {
                const jwtToken = response.loginUser.viewer.jwtToken;
                localStorage.setItem('jwtToken', jwtToken);
                this.props.router.push('/profile');
                window.location.reload()
            };

            Relay.Store.commitUpdate(loginUserMutation, {onSuccess, onFailure}
            );
        }
        else {
            this.setFormErrors()
        }
    };

    render() {
        return (
            <Page heading='Login'>
                <div style={{ width: '70%', margin: 'auto' }}>
                    <Grid>
                        <form style={{ margin: 'auto' }} onSubmit={this.loginUser}>
                            <Cell col={12}>
                                <Textfield
                                    onChange={this.handleEmailChange.bind(this)}
                                    label='Email'
                                    error={this.state.errorEmail}

                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={this.handlePasswordChange.bind(this)}
                                    label='Password'
                                    type='password'
                                    error={this.state.errorPassword}

                                />
                            </Cell>
                            <Cell col={12}>
                                <Checkbox label='Remember me' ripple style={{ textAlign: 'right' }}/>
                            </Cell>
                            <Cell col={12} style={{ textAlign: 'right' }}>
                                <a href='#'>Forgot password</a>
                                <Button primary>Login</Button>
                            </Cell>
                        </form>
                    </Grid>
                </div>
            </Page>
        );
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleEmailChange(e) {
        const value = e.target.value;

        this.setState({email: value});
        const isEmailValid = this.validateEmail(value);
        // Empty value or email is not valid set error
        if (value === "" || !isEmailValid) {
            this.setState({isEmailValid: false});

        }
        else {
            this.setState({isEmailValid: true});
            this.setState({errorEmail: false});
        }
    }

    handlePasswordChange(e) {
        const value = e.target.value;
        this.setState({password: value});
        if (value === "") {
            this.setState({isPasswordPresent: false});
        }
        else {
            this.setState({isPasswordPresent: true});
            this.setState({errorPassword: false});

        }
    }

    setFormErrors = () => {
        let {isEmailValid, isPasswordPresent} = this.state;
        // If not valid!
        if (!isEmailValid) {
            this.setState({errorEmail: "Email isn't valid"});
        }
        if (!isPasswordPresent) {
            this.setState({errorPassword: "Passwords is blank"});
        }


    }
}
