// @flow
import React from 'react'
import styles from './Page.scss'

type PageProps = {
  heading: string,
  children: Object
}
const Page = (props: PageProps) =>
  <div className={styles.root} >
    <div className={styles.innerRoot} >
      <h1 className={styles.heading} >
        {props.heading}
      </h1>
      <hr />
      <div className={styles.body} >
        {props.children}
      </div>
    </div>
  </div>

export default Page
