import React from 'react'
import 'normalize.css/normalize.css'
import Footer from 'components/Footer/Footer'
import Nav from '../Nav/Nav'
import styles from './App.scss'
import { isAuthenticated } from 'modules/auth/utils'
import '../../styles/global.scss'


const title = 'Reango'

let App = (props: { children: Object }) =>
  <div className={styles.root} >
    <Nav
      title={title}
      router={props.router}
      routes={props.routes}
      viewer={props.viewer}
    />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {props.children}
    </div>
    <Footer title={title} />
  </div>

export default function App(ComposedClass) {
  return (props) =>
    <App {...props} >
      <ComposedClass {...props} />
    </App>
}
