Scene Router
============

This package wraps the existing `Navigator` api from react-native to enable:
- An arbitrary graph of scenes in json
- An api for traversing that graph
- Consistent navigation bar between scenes
- A menu drawer

Key Parts
---------

`DrawerNavigator`
----------------

Props
------
------
- `routeLinks` 
Your app's main component should be a drawer navigator which is passed a set of `routeLinks` and 
and `initialRoute` as prop


`RoutableScene`
---------------