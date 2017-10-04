import React from 'react'
import 'normalize.css/normalize.css'
import Footer from 'components/Footer/Footer'
import Nav from '../Nav/Nav'
import styles from './App.scss'
import { isAuthenticated } from 'modules/auth/utils'
import '../../styles/global.scss'


const title = 'Reango'

type AppType = { children: Object }
let App = (props: AppType) =>
  <div className={styles.root} >
    <Nav
      title={title}
      router={props.router}
      routes={props.routes}
      viewer={props.viewer}
      isAuthenticated={props.isAuthenticated}
      isAdmin={props.isAdmin}
    />
    <div className={styles.content} >
      {props.children}
    </div>
    <Footer title={title} />
  </div>

export default App
