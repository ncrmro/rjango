import React from "react";
import {Link} from "react-router";
import {Layout, Header, Navigation, Drawer} from "react-mdl";
import styles from "./Navbar.scss";

export default class Navbar extends React.Component {
    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        router: React.PropTypes.object.isRequired

    };

    render() {
        const title = 'Relay Fullstack';
        const {isAuthenticated} = this.props;
        return (
            <Layout className={styles.root}>
                <Header title={<Link to='/'>{title}</Link>} scroll>
                    {isAuthenticated ? this.renderLoggedIn() : this.renderLoggedOut()}
                </Header>
                <Drawer title={<Link to='/' style={{ fontSize: '1.5em' }}>{title}</Link>}
                        className='mdl-layout--small-screen-only'>
                    {isAuthenticated ? this.renderLoggedIn() : this.renderLoggedOut()}

                </Drawer>
            </Layout>
        );
    }

    handleSignOut() {
        localStorage.removeItem('jwtToken'),
        window.location.href = "/";

    }

    renderLoggedIn() {
        return (
            <Navigation>
                <Link to="/" onClick={this.handleSignOut}>Sign out</Link>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/profile'>Edit Profile</Link>
            </Navigation>
        );
    }

    renderLoggedOut() {
        return (
            <Navigation>
                <Link to='/signup'>Sign up</Link>
                <Link to='/login'>Login</Link>
            </Navigation>
        );
    }
}
