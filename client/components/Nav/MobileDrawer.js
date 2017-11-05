import React from 'react'
import Navigation from 'react-mdc-web/lib/Drawer/Navigation'
import Drawer from 'react-mdc-web/lib/Drawer/Drawer'
import DrawerHeader from 'react-mdc-web/lib/Drawer/DrawerHeader'
import DrawerHeaderContent from 'react-mdc-web/lib/Drawer/DrawerHeaderContent'
import DrawerContent from 'react-mdc-web/lib/Drawer/DrawerContent'

import { HomeLink } from './Nav'

type MobileDrawerProps = {
  title: string,
}
const MobileDrawer = (props: MobileDrawerProps) =>
  <Drawer
    {...props}
  >
    <DrawerHeader>
      <DrawerHeaderContent>
        <HomeLink className='button_home-link' title={props.title} />
      </DrawerHeaderContent>
    </DrawerHeader>
    <DrawerContent>
      <Navigation>
        {props.children}
      </Navigation>
    </DrawerContent>
  </Drawer>

export default MobileDrawer