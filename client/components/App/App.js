// @flow
import React from 'react'
import 'normalize.css/normalize.css'
import Footer from 'components/Footer/Footer'
import Nav from '../Nav/Nav'
import styles from './App.scss'
import '../../styles/global.scss'


const title = 'Reango'

type AppPropsType = {
  viewer: Object,
  children: Object
}

let App = (props: AppPropsType) =>
  <div className={styles.root} >
    <Nav
      title={title}
      viewer={props.viewer}
    />
    <div className={styles.content} >
      {props.children}
    </div>
    <Footer title={title} />
  </div>

export default App
