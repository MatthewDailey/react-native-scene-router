import React from 'react';
import { Navigator, BackAndroid } from 'react-native';

import Drawer from 'react-native-drawer';

/*
 * DrawerNavigator manages a graph of scenes and transitions between scenes while providing a
 * convenience wrapper for a left-side drawer menu.
 *
 * It takes 'props.routeLinks' which defines a series of transitions between routes and
 * 'props.initialRoute' which defines the starting node in the scene graph.
 *
 * At a minimum, an route must have an 'id' field and a method 'renderContent' which takes the
 * navigator, any routeLinks associated with the route id and the openMenu function.
 *
 * For maximum utility, Routes should extend RoutableScene which provides convenience methods for
 * rendering a scene with a navigation bar and transitioning between scenes.
 */
export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.drawer.open();
  }

  closeMenu() {
    this.drawer.close();
  }

  render() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.drawer._open) {
        this.closeMenu();
      } else if (this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
      } else {
        BackAndroid.exitApp();
      }
      return true;
    });

    return (
      <Navigator
        ref={(c) => { this.navigator = c; }}
        initialRoute={this.props.initialRoute}
        renderScene={(route, navigator) => {
          console.log('Rendering: ', route.id);

          const Content = route.component;

          if (this.props.menuElement) {
            const Menu = this.props.menuElement;

            return (
              <Drawer
                ref={(c) => { this.drawer = c; }}
                content={
                  <Menu
                    navigator={navigator}
                    closeMenu={this.closeMenu}
                    {...this.props.menuProps}
                  />
                }
                tapToClose
                openDrawerOffset={0.2}
                panOpenMask={0.1}
              >
                <Content
                  navigator={navigator}
                  routeLinks={this.props.routeLinks[route.id]}
                  openMenu={this.openMenu}
                  {...route.props}
                />
              </Drawer>
            );
          }

          return (
            <Content
              navigator={navigator}
              routeLinks={this.props.routeLinks[route.id]}
              openMenu={this.openMenu}
              {...route.props}
            />
          );
        }}
      />
    );
  }
}

DrawerNavigator.propTypes = {
  initialRoute: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    component: React.PropTypes.element.isRequired,
    props: React.PropTypes.object,
  }).isRequired,
  routeLinks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  menuElement: React.PropTypes.element,
  menuProps: React.PropTypes.object,
};
