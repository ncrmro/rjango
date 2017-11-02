// @flow
import React from 'react'
import 'normalize.css/normalize.css'
import Footer from 'components/Footer/Footer'
import Nav from '../Nav/Nav'
import MobileFooterToolbar from '../Nav/MobileFooterNav/MobileFooterNav'
import styles from './App.scss'
import '../../styles/global.scss'
import Content from 'react-mdc-web/lib/Content/Content'

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
      className={styles.nav}
    />
    <Content className={`${styles.wrap}`} >
      <div className={styles.content} >
        {props.children}
      </div>
    </Content>
    {props.viewer.isAuthenticated ?
      <div className={styles.mobile_footer_wrap} >
        <MobileFooterToolbar {...props}/>

      </div> : null}
    <div
      className={`${styles.footer_wrap} ${!props.viewer.isAuthenticated ? styles.hidden_mobile_footer_wrap : ''}`} >
      <div className={styles.footer} >
        <Footer
          title={title}
        />
      </div>
    </div>


  </div>

export default App
