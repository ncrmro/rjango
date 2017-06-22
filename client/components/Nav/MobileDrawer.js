import React from 'react'
import Navigation from 'react-mdc-web/lib/Drawer/Navigation'
import Drawer from 'react-mdc-web/lib/Drawer/Drawer'
import DrawerHeader from 'react-mdc-web/lib/Drawer/DrawerHeader'
import DrawerHeaderContent from 'react-mdc-web/lib/Drawer/DrawerHeaderContent'
import DrawerContent from 'react-mdc-web/lib/Drawer/DrawerContent'

import { HomeLink } from './Nav'

const MobileDrawer = (props: NavPropsType) =>
  <Drawer
    {...props}
  >
    <DrawerHeader>
      {console.log(props)}
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