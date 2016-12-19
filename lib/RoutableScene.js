Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');

var _reactNativeNavbar=require('react-native-navbar');var _reactNativeNavbar2=_interopRequireDefault(_reactNativeNavbar);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var colors={
transparent:'#00000000'};var

















RoutableScene=function(_Component){_inherits(RoutableScene,_Component);
function RoutableScene(props){_classCallCheck(this,RoutableScene);var _this=_possibleConstructorReturn(this,(RoutableScene.__proto__||Object.getPrototypeOf(RoutableScene)).call(this,
props));
_this.goMenu=_this.goMenu.bind(_this);
_this.goHome=_this.goHome.bind(_this);
_this.goHomeHandler=_this.goHomeHandler.bind(_this);
_this.goNext=_this.goNext.bind(_this);
_this.goNextHandler=_this.goNextHandler.bind(_this);
_this.goBack=_this.goBack.bind(_this);
_this.goBackHandler=_this.goBackHandler.bind(_this);
_this.goReturn=_this.goReturn.bind(_this);
_this.goReturnHandler=_this.goReturnHandler.bind(_this);return _this;
}_createClass(RoutableScene,[{key:'onGoHome',value:function onGoHome()

{

}},{key:'onGoBack',value:function onGoBack()

{

}},{key:'onGoNext',value:function onGoNext(

route){

}},{key:'onGoReturn',value:function onGoReturn()

{

}},{key:'getLeftButton',value:function getLeftButton()

{
var leftButton={};

if(this.props.colors.navText){
leftButton.tintColor=this.props.colors.navText;
}

if(this.props.leftIs==='menu'&&this.props.openMenu){
leftButton.handler=this.goMenu;
leftButton.title='Menu';
return leftButton;
}else if(this.props.leftIs==='back'){
leftButton.handler=this.goBackHandler;
leftButton.title='<';
return leftButton;
}


return undefined;
}},{key:'getRightButton',value:function getRightButton()

{
var rightButton={};

if(this.props.colors.navText){
rightButton.tintColor=this.props.colors.navText;
}

if(this.props.routeLinks.next&&this.props.rightIs==='next'){
rightButton.handler=this.goNextHandler;
rightButton.title=this.props.routeLinks.next.title;
return rightButton;
}else if(this.props.routeLinks.home&&this.props.rightIs==='home'){
rightButton.handler=this.goHomeHandler;
rightButton.title=this.props.routeLinks.home.title;
return rightButton;
}else if(this.props.routeLinks.return&&this.props.rightIs==='return'){
rightButton.handler=this.goReturnHandler;
rightButton.title=this.props.routeLinks.return.title;
return rightButton;
}


return undefined;
}},{key:'goMenu',value:function goMenu()

{
this.props.openMenu();
}},{key:'shouldGoNext',value:function shouldGoNext()

{
return true;
}},{key:'goNextHandler',value:function goNextHandler()




{
this.goNext();
}},{key:'goNext',value:function goNext()




{var route=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'next';
if(this.shouldGoNext(route)&&this.props.routeLinks[route]){
this.props.navigator.push(this.props.routeLinks[route].getRoute());
this.onGoNext(route);
}
}},{key:'goBackHandler',value:function goBackHandler()




{
this.goBack();
}},{key:'goBack',value:function goBack()




{
if(this.props.routeLinks.back){
this.props.navigator.popToRoute(this.props.routeLinks.back.getRoute());
}else{
this.props.navigator.pop();
}
this.onGoBack();
}},{key:'goReturnHandler',value:function goReturnHandler()

{
this.goReturn();
}},{key:'shouldGoReturn',value:function shouldGoReturn()

{
return true;
}},{key:'goReturn',value:function goReturn()

{
if(this.shouldGoReturn()){
if(this.props.routeLinks.return){
if(this.props.routeLinks.return.getRoute){
this.props.navigator.popToRoute(this.props.routeLinks.return.getRoute());
}else if(this.props.routeLinks.return.numScenes){
this.props.navigator.popN(this.props.routeLinks.return.numScenes);
}else{
this.props.navigator.pop();
}
}else{
this.props.navigator.pop();
}
this.onGoReturn();
}
}},{key:'goHomeHandler',value:function goHomeHandler()

{
this.goHome();
}},{key:'goHome',value:function goHome()

{
if(this.props.routeLinks.home&&this.props.routeLinks.home.getRoute){
this.props.navigator.resetTo(this.props.routeLinks.home.getRoute());
this.onGoHome();
}else{
this.props.navigator.popToTop();
this.onGoHome();
}
}},{key:'getTitle',value:function getTitle()

{
if(typeof this.props.title==='string'){
return(
_react2.default.createElement(_reactNative.Text,{
style:{
color:this.props.colors.navText?this.props.colors.navText:'black',
fontSize:25,
fontWeight:'300',
fontFamily:_reactNative.Platform.OS==='android'?'sans-serif-light':undefined}},


this.props.title));


}
if(typeof this.props.title==='object'){
return this.props.title;
}
return _react2.default.createElement(_reactNative.View,null);
}},{key:'render',value:function render()

{
return(


_react2.default.createElement(_reactNative.View,{style:{flex:1}},
_react2.default.createElement(_reactNative.StatusBar,{backgroundColor:this.props.colors.navBackground,barStyle:'default'}),
_react2.default.createElement(_reactNativeNavbar2.default,{
tintColor:this.props.colors.navTint,
style:{backgroundColor:this.props.colors.navBackground,zIndex:2},
title:this.getTitle(),
leftButton:this.getLeftButton(),
rightButton:this.getRightButton()}),

this.renderWithNavBar()));


}}]);return RoutableScene;}(_react.Component);exports.default=RoutableScene;


RoutableScene.defaultProps={
routeLinks:{},
leftIs:undefined,
rightIs:undefined};


RoutableScene.propTypes={
title:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string,_react2.default.PropTypes.object]),
openMenu:_react2.default.PropTypes.func,
navigator:_react2.default.PropTypes.object,
routeLinks:_react2.default.PropTypes.object,
leftIs:_react2.default.PropTypes.oneOf(['back','menu']),
rightIs:_react2.default.PropTypes.oneOf(['next','home','return']),
colors:_react2.default.PropTypes.shape({
navText:_react2.default.PropTypes.string,
navBackground:_react2.default.PropTypes.string,
navTint:_react2.default.PropTypes.string})};