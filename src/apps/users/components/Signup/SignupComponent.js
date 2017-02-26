import React from "react";
import Relay from "react-relay";
import {Grid, Cell, Textfield, Button} from "react-mdl";
import Page from "../../../../components/Page/PageComponent";
import SignupUserMutation from "./SignupUserMutation";


export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            isValidEmail: false,
            isPasswordsMatching: false,
            errorEmail: false,
            errorPassword: false

        };
    }


    signupUser = (form) => {
        form.preventDefault();
        const {email, password, isEmailValid, isPasswordsMatching} = this.state;
        if (isEmailValid && isPasswordsMatching) {
            const signupUserMutation = new SignupUserMutation({
                email,
                password
            });
            var onFailure = (transaction) => {
                console.log("failure", transaction)
            };

            var onSuccess = (response) => {
                console.log("Success", response);
                const jwtToken = response.createUser.jwtToken;
                localStorage.setItem('jwtToken', jwtToken);
                this.props.router.push('/dashboard');
                window.location.reload()
            };
            Relay.Store.commitUpdate(signupUserMutation, {onSuccess, onFailure});
        } else {
            this.setFormErrors()
        }
    };

    render() {
        return (
            <Page heading='Signup'>
                <div style={{ width: '70%', margin: 'auto' }}>
                    <Grid>
                        <form style={{ margin: 'auto' }} onSubmit={this.signupUser}>
                            <Cell col={12}>
                                <Textfield
                                    onChange={this.handleEmailChange.bind(this)}
                                    label='Email'
                                    floatingLabel
                                    error={this.state.errorEmail}
                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={this.handlePasswordChange.bind(this)}
                                    label='Password'
                                    type='password'
                                    floatingLabel
                                    error={this.state.errorPassword}

                                />
                            </Cell>
                            <Cell col={12}>
                                <Textfield
                                    onChange={this.handlePasswordConfirmationChange.bind(this)}
                                    label='Password Confirmation'
                                    type='password'
                                    floatingLabel
                                    error={this.state.errorPassword}

                                />
                            </Cell>
                            <Cell col={12} style={{ textAlign: 'right' }}>
                                <Button primary>Sign up</Button>
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
        if (isEmailValid) {
            this.setState({isValidEmail: true});
            this.setState({errorEmail: false});
        }
        else {
            this.setState({isValidEmail: false});
        }

    }

    handlePasswordChange(e) {
        const value = e.target.value;
        this.setState({password: value});
        const {passwordConfirmation} = this.state;
        const passwordsMatch = value === passwordConfirmation;
        if (passwordsMatch && value != '' && passwordConfirmation != '') {
            console.log("passwords match");
            this.setState({isPasswordsMatching: true});
            this.setState({errorPassword: false});
        }
        else {
            this.setState({isPasswordsMatching: false});
        }
    }

    handlePasswordConfirmationChange(e) {
        const value = e.target.value;
        this.setState({passwordConfirmation: value});
        const {password} = this.state;
        const passwordsMatch = password === value;
        if (passwordsMatch && password != '' && value != '') {
            console.log("passwords confirmation match");
            this.setState({isPasswordsMatching: true});
            this.setState({errorPassword: false});
        }
        else {
            this.setState({isPasswordsMatching: false});
        }
    }

    setFormErrors = () => {
        let {isEmailValid, isPasswordsMatching} = this.state;
        // If not valid!
        if (!isEmailValid) {
            this.setState({errorEmail: "Email isn't valid"});
        }
        if (!isPasswordsMatching) {
            this.setState({errorPassword: "Passwords don't match"});
        }


    }

}
