Scene Router
============

This package wraps the existing `Navigator` api from react-native to enable:
- An arbitrary graph of scenes in json
- An api for traversing that graph
- Consistent navigation bar between scenes
- A menu drawer

These docs provide a high level usage overview. See 
[this sample app](https://github.com/MatthewDailey/SampleRouterApp) for an example usage and see
the code (it's not that long).


What is a scene?
------
A scene is an individual view on the screen of the phone. An app with Scene Router is composed of a
graph with scenes as nodes and possible transitions as edges.

`RoutableScene`
---------------

A react component which is a complete scene and aware of the graph. It can trigger transitions 
between scenes.

Scenes are represented as a stack and transitions either push or pop from the stack.

**Types of transition methods available to children:**
- `goNext(route = next)` - Push a scene to the stack. By default pushes `routeLinks['next']` on to
   the stack but can be used to have multiple next scenes by calling `goNext('fancyRoute')` which
   will push `routeLinks['fancyRoute']`.
- `goBack()` - Pop one scene from the stack.
- `goMenu()` - Opens the menu drawer if a menu was supplied to the wrapping `DrawerNavigator`
- `goReturn()` - Can return to arbitrary route earlier in the stack or go back any number of scenes.
- `goHome()` - Pop to the bottom element of the stack.



`DrawerNavigator`
----------------

Your app's main component should be a drawer navigator which manages rendering the current route.

**Props:**
- `routeLinks` - Links between scenes defining possible transitions.
- `initialRoute` - The scene which should be rendered first.
- `renderMenu` - Render method which returns menu react component.
