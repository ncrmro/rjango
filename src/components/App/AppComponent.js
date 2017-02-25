import React from "react";
import Navbar from "../Navbar/NavbarComponent";
import Footer from "../Footer/FooterContainer";
import styles from "./App.scss";
import yeoman from "../../client/assets/yeoman.png";
import "normalize.css/normalize.css";
import "react-mdl/extra/css/material.cyan-red.min.css";
import isAuthenticated from "../../apps/users/components/isAuthenticated/isAuthenticated"

class App extends React.Component {
    static propTypes = {
        router: React.PropTypes.object.isRequired,
        children: React.PropTypes.object.isRequired,
        viewer: React.PropTypes.object.isRequired,
        isAuthenticated: React.PropTypes.bool.isRequired

    };


    render() {
        const {isAuthenticated, router} = this.props;

        return (
            <div className={styles.root}>

                <Navbar isAuthenticated={isAuthenticated} router={router}/>
                <div className={styles.greeting}>
                    <h1 className={styles.sawasdee}>Sawasdee, Sawasdee!</h1>
                    <p>Always a pleasure scaffolding your apps</p>
                    <img src={yeoman} alt='yeoman'/>
                </div>
                <div className={styles.content}>
                    {this.props.children}
                </div>
                /<Footer viewer={this.props.viewer}/>
            </div>
        );
    }
}

export default isAuthenticated(App)
