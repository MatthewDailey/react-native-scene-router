import React, { Component } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';

import NavigationBar from 'react-native-navbar';

const colors = {
  transparent: '#00000000',
};

/*
 * RoutableScene is a convenience class to package the logic around having a menu bar with left and
 * right buttons plus navigating between possible scenes.
 *
 * It provides various methods goMenu, goHome, goNext, goBack for subclasses to manually invoke.
 *
 * The class is intended to be wrapped in a DrawerNavigator which contains the initial route and
 * routeLinks which determine where the route should transition to on a goBack, goNext or goHome.
 *
 * It also provides the ability to enable navbar navigation via left and right buttons by passing
 * in props:
 * - leftIs: either 'back' or 'menu' determines if the left button will go back or open the menu.
 * - rightIs: either 'next' or 'home' determine if the left button will add the scene stack or
 * clear it and go home.
 */
export default class RoutableScene extends Component {
  constructor(props) {
    super(props);
    this.goMenu = this.goMenu.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goHomeHandler = this.goHomeHandler.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goNextHandler = this.goNextHandler.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goBackHandler = this.goBackHandler.bind(this);
    this.goReturn = this.goReturn.bind(this);
    this.goReturnHandler = this.goReturnHandler.bind(this);
  }

  onGoHome() {
    // Implemented by children.
  }

  onGoBack() {
    // Implemented by children.
  }

  onGoNext(route) {
    // Implemented by children.
  }

  onGoReturn() {
    // Implemented by children.
  }

  getLeftButton() {
    const leftButton = {};

    if (this.props.colors.navText) {
      leftButton.tintColor = this.props.colors.navText;
    }

    if (this.props.leftIs === 'menu' && this.props.openMenu) {
      leftButton.handler = this.goMenu;
      leftButton.title = 'Menu';
      return leftButton;
    } else if (this.props.leftIs === 'back') {
      leftButton.handler = this.goBackHandler;
      leftButton.title = '<';
      return leftButton;
    }

    // Return nothing. No left button.
    return undefined;
  }

  getRightButton() {
    const rightButton = {};

    if (this.props.colors.navText) {
      rightButton.tintColor = this.props.colors.navText;
    }

    if (this.props.routeLinks) {
      if (this.props.routeLinks.next && this.props.rightIs === 'next') {
        rightButton.handler = this.goNextHandler;
        rightButton.title = this.props.routeLinks.next.title;
        return rightButton;
      } else if (this.props.routeLinks.home && this.props.rightIs === 'home') {
        rightButton.handler = this.goHomeHandler;
        rightButton.title = this.props.routeLinks.home.title;
        return rightButton;
      } else if (this.props.routeLinks.return && this.props.rightIs === 'return') {
        rightButton.handler = this.goReturnHandler;
        rightButton.title = this.props.routeLinks.return.title;
        return rightButton;
      }
    }

    // Return nothing. No right button.
    return undefined;
  }

  goMenu() {
    this.props.openMenu();
  }

  shouldGoNext() {
    return true;
  }

  /*
   * Wrapper for goNext to allow passing argument.
   */
  goNextHandler() {
    this.goNext();
  }

  /*
   * Push a new route on to the right. Opens the 'next' route by default.
   */
  goNext(route = 'next') {
    if (this.shouldGoNext(route) && this.props.routeLinks[route]) {
      this.props.navigator.push(this.props.routeLinks[route].getRoute());
      this.onGoNext(route);
    }
  }

  /*
   * Wrapper for goNext to allow passing argument.
   */
  goBackHandler() {
    this.goBack();
  }

  /*
   * Drops back to the left scene.
   */
  goBack() {
    if (this.props.routeLinks.back) {
      this.props.navigator.popToRoute(this.props.routeLinks.back.getRoute());
    } else {
      this.props.navigator.pop();
    }
    this.onGoBack();
  }

  goReturnHandler() {
    this.goReturn();
  }

  shouldGoReturn() {
    return true;
  }

  goReturn() {
    if (this.shouldGoReturn()) {
      if (this.props.routeLinks.return) {
        if (this.props.routeLinks.return.getRoute) {
          this.props.navigator.popToRoute(this.props.routeLinks.return.getRoute());
        } else if (this.props.routeLinks.return.numScenes) {
          this.props.navigator.popN(this.props.routeLinks.return.numScenes);
        } else {
          this.props.navigator.pop();
        }
      } else {
        this.props.navigator.pop();
      }
      this.onGoReturn();
    }
  }

  goHomeHandler() {
    this.goHome();
  }

  goHome() {
    if (this.props.routeLinks.home && this.props.routeLinks.home.getRoute) {
      this.props.navigator.resetTo(this.props.routeLinks.home.getRoute());
      this.onGoHome();
    } else {
      this.props.navigator.popToTop();
      this.onGoHome();
    }
  }

  getTitle() {
    if (typeof this.props.title === 'string') {
      return (
        <Text
          style={{
            color: this.props.colors.navText ? this.props.colors.navText : 'black',
            fontSize: 25,
            fontWeight: '300',
            fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
          }}
        >
          {this.props.title}
        </Text>
      );
    }
    if (typeof this.props.title === 'object') {
      return this.props.title;
    }
    return <View />;
  }

  render() {
    return (
      // Note this flex:1 style. Important to make sure children ListView can scroll.
      // Without it, the view will just bounce back.
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={this.props.colors.navBackground} barStyle="default" />
        <NavigationBar
          tintColor={this.props.colors.navTint}
          style={{ backgroundColor: this.props.colors.navBackground, zIndex: 2 }}
          title={this.getTitle()}
          leftButton={this.getLeftButton()}
          rightButton={this.getRightButton()}
        />
        {this.renderWithNavBar()}
      </View>
    );
  }
}

RoutableScene.defaultProps = {
  routeLinks: {},
  leftIs: undefined,
  rightIs: undefined,
};

RoutableScene.propTypes = {
  title: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.object ]),
  openMenu: React.PropTypes.func,
  navigator: React.PropTypes.object,
  routeLinks: React.PropTypes.object,
  leftIs: React.PropTypes.oneOf(['back', 'menu']),
  rightIs: React.PropTypes.oneOf(['next', 'home', 'return']),
  colors: React.PropTypes.shape({
    navText: React.PropTypes.string,
    navBackground: React.PropTypes.string,
    navTint: React.PropTypes.string,
  })
};
