Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');

var _reactNativeDrawer=require('react-native-drawer');var _reactNativeDrawer2=_interopRequireDefault(_reactNativeDrawer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var














DrawerNavigator=function(_React$Component){_inherits(DrawerNavigator,_React$Component);
function DrawerNavigator(props){_classCallCheck(this,DrawerNavigator);var _this=_possibleConstructorReturn(this,(DrawerNavigator.__proto__||Object.getPrototypeOf(DrawerNavigator)).call(this,
props));
_this.openMenu=_this.openMenu.bind(_this);
_this.closeMenu=_this.closeMenu.bind(_this);return _this;
}_createClass(DrawerNavigator,[{key:'openMenu',value:function openMenu()

{
if(this.drawer){
this.drawer.open();
}
}},{key:'closeMenu',value:function closeMenu()

{
if(this.drawer){
this.drawer.close();
}
}},{key:'render',value:function render()

{var _this2=this;
_reactNative.BackAndroid.addEventListener('hardwareBackPress',function(){
if(_this2.drawer._open){
_this2.closeMenu();
}else if(_this2.navigator.getCurrentRoutes().length>1){
_this2.navigator.pop();
}else{
_reactNative.BackAndroid.exitApp();
}
return true;
});

return(
_react2.default.createElement(_reactNative.Navigator,{
ref:function ref(c){_this2.navigator=c;},
initialRoute:this.props.initialRoute,
renderScene:function renderScene(route,navigator){
console.log('Rendering: ',route.id);

var Content=route.component;

if(_this2.props.renderMenu){
var Menu=_this2.props.renderMenu;

return(
_react2.default.createElement(_reactNativeDrawer2.default,{
ref:function ref(c){_this2.drawer=c;},
content:
_react2.default.createElement(Menu,{
navigator:navigator,
closeMenu:_this2.closeMenu}),


tapToClose:true,
openDrawerOffset:0.2,
panOpenMask:0.1},

_react2.default.createElement(Content,_extends({
navigator:navigator,
routeLinks:_this2.props.routeLinks[route.id],
openMenu:_this2.openMenu},
route.props))));



}

return(
_react2.default.createElement(Content,_extends({
navigator:navigator,
routeLinks:_this2.props.routeLinks[route.id],
openMenu:_this2.openMenu,
navBackgroundColor:_this2.props.navBackgroundColor,
navTintColor:_this2.props.navTintColor},
route.props)));


}}));


}}]);return DrawerNavigator;}(_react2.default.Component);exports.default=DrawerNavigator;


DrawerNavigator.propTypes={
initialRoute:_react2.default.PropTypes.shape({
id:_react2.default.PropTypes.string.isRequired,
component:_react2.default.PropTypes.func.isRequired,
props:_react2.default.PropTypes.object}).
isRequired,
routeLinks:_react2.default.PropTypes.object,
renderMenu:_react2.default.PropTypes.func,
navBackgroundColor:_react2.default.PropTypes.string,
navTintColor:_react2.default.PropTypes.string};