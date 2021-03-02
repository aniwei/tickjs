module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./componnets/UIService/index.tsx":
/*!****************************************!*\
  !*** ./componnets/UIService/index.tsx ***!
  \****************************************/
/*! exports provided: Service, UIService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Service\", function() { return Service; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UIService\", function() { return UIService; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks_useScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useScript */ \"./hooks/useScript.ts\");\n/* harmony import */ var _hooks_useMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useMessage */ \"./hooks/useMessage.ts\");\n\nvar _jsxFileName = \"/Users/weiyanhai/Downloads/tick/packages/mini-program/src/vm/server/componnets/UIService/index.tsx\";\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nfunction Service(props) {\n  Object(_hooks_useScript__WEBPACK_IMPORTED_MODULE_2__[\"useScript\"])(`/context`);\n  Object(_hooks_useScript__WEBPACK_IMPORTED_MODULE_2__[\"useScript\"])(`/uiservice`);\n  Object(_hooks_useScript__WEBPACK_IMPORTED_MODULE_2__[\"useScript\"])(() => {\n    const {\n      onLoad\n    } = props;\n    onLoad();\n  });\n\n  const subscribeMethod = (...args) => {\n    const {\n      subscribeHandler\n    } = props;\n    subscribeHandler(...args);\n  };\n\n  Object(_hooks_useMessage__WEBPACK_IMPORTED_MODULE_3__[\"useMessage\"])(`webview.custom_event_GenerateFuncReady`, subscribeMethod);\n  Object(_hooks_useMessage__WEBPACK_IMPORTED_MODULE_3__[\"useMessage\"])(`webview.custom_event_PAGE_EVENT`, subscribeMethod);\n  Object(_hooks_useMessage__WEBPACK_IMPORTED_MODULE_3__[\"useMessage\"])(`webview.custom_event_initReady_getPerformance`, subscribeMethod);\n  Object(_hooks_useMessage__WEBPACK_IMPORTED_MODULE_3__[\"useMessage\"])(`webview.custom_event_vdSync`, subscribeMethod);\n  Object(_hooks_useMessage__WEBPACK_IMPORTED_MODULE_3__[\"useMessage\"])(`webview.custom_event_tapAnyWhere`, subscribeMethod);\n  return null;\n}\nclass UIService extends react__WEBPACK_IMPORTED_MODULE_1__[\"Component\"] {\n  constructor(..._args) {\n    super(..._args);\n\n    _defineProperty(this, \"subscribeHandler\", (...args) => {\n      WeixinJSBridge.invokeCallbackHandler(...args);\n    });\n\n    _defineProperty(this, \"invokeCallbackHandler\", (...args) => {\n      WeixinJSBridge.invokeCallbackHandler(...args);\n    });\n\n    _defineProperty(this, \"onLoad\", () => {\n      const {\n        onLoad\n      } = this.props;\n      onLoad();\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Service, {\n      onLoad: this.onLoad,\n      subscribeHandler: this.subscribeHandler\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 51,\n      columnNumber: 12\n    }, this);\n  }\n\n}\n\n_defineProperty(UIService, \"defaultProps\", {\n  onLoad() {}\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25uZXRzL1VJU2VydmljZS9pbmRleC50c3g/MmM2ZCJdLCJuYW1lcyI6WyJTZXJ2aWNlIiwicHJvcHMiLCJ1c2VTY3JpcHQiLCJvbkxvYWQiLCJzdWJzY3JpYmVNZXRob2QiLCJhcmdzIiwic3Vic2NyaWJlSGFuZGxlciIsInVzZU1lc3NhZ2UiLCJVSVNlcnZpY2UiLCJDb21wb25lbnQiLCJXZWl4aW5KU0JyaWRnZSIsImludm9rZUNhbGxiYWNrSGFuZGxlciIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFHTyxTQUFTQSxPQUFULENBQWtCQyxLQUFsQixFQUF5QjtBQUM5QkMsb0VBQVMsQ0FBRSxVQUFGLENBQVQ7QUFDQUEsb0VBQVMsQ0FBRSxZQUFGLENBQVQ7QUFDQUEsb0VBQVMsQ0FBQyxNQUFNO0FBQ2QsVUFBTTtBQUFFQztBQUFGLFFBQWFGLEtBQW5CO0FBQ0FFLFVBQU07QUFDUCxHQUhRLENBQVQ7O0FBS0EsUUFBTUMsZUFBZSxHQUFHLENBQUMsR0FBR0MsSUFBSixLQUFhO0FBQ25DLFVBQU07QUFBRUM7QUFBRixRQUF1QkwsS0FBN0I7QUFDQUssb0JBQWdCLENBQUMsR0FBR0QsSUFBSixDQUFoQjtBQUNELEdBSEQ7O0FBS0FFLHNFQUFVLENBQUUsd0NBQUYsRUFBMkNILGVBQTNDLENBQVY7QUFDQUcsc0VBQVUsQ0FBRSxpQ0FBRixFQUFvQ0gsZUFBcEMsQ0FBVjtBQUNBRyxzRUFBVSxDQUFFLCtDQUFGLEVBQWtESCxlQUFsRCxDQUFWO0FBQ0FHLHNFQUFVLENBQUUsNkJBQUYsRUFBZ0NILGVBQWhDLENBQVY7QUFDQUcsc0VBQVUsQ0FBRSxrQ0FBRixFQUFxQ0gsZUFBckMsQ0FBVjtBQUVBLFNBQU8sSUFBUDtBQUNEO0FBTU0sTUFBTUksU0FBTixTQUF3QkMsK0NBQXhCLENBQThDO0FBQUE7QUFBQTs7QUFBQSw4Q0FLaEMsQ0FBQyxHQUFHSixJQUFKLEtBQWE7QUFDOUJLLG9CQUFjLENBQUNDLHFCQUFmLENBQXFDLEdBQUdOLElBQXhDO0FBQ0QsS0FQa0Q7O0FBQUEsbURBUzNCLENBQUMsR0FBR0EsSUFBSixLQUFhO0FBQ25DSyxvQkFBYyxDQUFDQyxxQkFBZixDQUFxQyxHQUFHTixJQUF4QztBQUNELEtBWGtEOztBQUFBLG9DQWExQyxNQUFNO0FBQ2IsWUFBTTtBQUFFRjtBQUFGLFVBQWEsS0FBS0YsS0FBeEI7QUFDQUUsWUFBTTtBQUNQLEtBaEJrRDtBQUFBOztBQWtCbkRTLFFBQU0sR0FBSTtBQUNSLHdCQUFPLHFFQUFDLE9BQUQ7QUFDTCxZQUFNLEVBQUUsS0FBS1QsTUFEUjtBQUVMLHNCQUFnQixFQUFFLEtBQUtHO0FBRmxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBUDtBQUlEOztBQXZCa0Q7O2dCQUF4Q0UsUyxrQkFDVztBQUNwQkwsUUFBTSxHQUFJLENBQUU7O0FBRFEsQyIsImZpbGUiOiIuL2NvbXBvbm5ldHMvVUlTZXJ2aWNlL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNjcmlwdCB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVNjcmlwdCc7XG5pbXBvcnQgeyB1c2VNZXNzYWdlIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlTWVzc2FnZSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFNlcnZpY2UgKHByb3BzKSB7XG4gIHVzZVNjcmlwdChgL2NvbnRleHRgKTtcbiAgdXNlU2NyaXB0KGAvdWlzZXJ2aWNlYCk7XG4gIHVzZVNjcmlwdCgoKSA9PiB7XG4gICAgY29uc3QgeyBvbkxvYWQgfSA9IHByb3BzO1xuICAgIG9uTG9hZCgpO1xuICB9KTtcblxuICBjb25zdCBzdWJzY3JpYmVNZXRob2QgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IHsgc3Vic2NyaWJlSGFuZGxlciB9ID0gcHJvcHM7XG4gICAgc3Vic2NyaWJlSGFuZGxlciguLi5hcmdzKTtcbiAgfVxuXG4gIHVzZU1lc3NhZ2UoYHdlYnZpZXcuY3VzdG9tX2V2ZW50X0dlbmVyYXRlRnVuY1JlYWR5YCwgc3Vic2NyaWJlTWV0aG9kKTtcbiAgdXNlTWVzc2FnZShgd2Vidmlldy5jdXN0b21fZXZlbnRfUEFHRV9FVkVOVGAsIHN1YnNjcmliZU1ldGhvZCk7XG4gIHVzZU1lc3NhZ2UoYHdlYnZpZXcuY3VzdG9tX2V2ZW50X2luaXRSZWFkeV9nZXRQZXJmb3JtYW5jZWAsIHN1YnNjcmliZU1ldGhvZCk7XG4gIHVzZU1lc3NhZ2UoYHdlYnZpZXcuY3VzdG9tX2V2ZW50X3ZkU3luY2AsIHN1YnNjcmliZU1ldGhvZCk7XG4gIHVzZU1lc3NhZ2UoYHdlYnZpZXcuY3VzdG9tX2V2ZW50X3RhcEFueVdoZXJlYCwgc3Vic2NyaWJlTWV0aG9kKTtcbiAgXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XG4gIG9uTG9hZDogRnVuY3Rpb24gfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgVUlTZXJ2aWNlIGV4dGVuZHMgQ29tcG9uZW50PElQcm9wcywge30+IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvbkxvYWQgKCkge31cbiAgfVxuXG4gIHN1YnNjcmliZUhhbmRsZXIgPSAoLi4uYXJncykgPT4ge1xuICAgIFdlaXhpbkpTQnJpZGdlLmludm9rZUNhbGxiYWNrSGFuZGxlciguLi5hcmdzKTtcbiAgfVxuXG4gIGludm9rZUNhbGxiYWNrSGFuZGxlciA9ICguLi5hcmdzKSA9PiB7XG4gICAgV2VpeGluSlNCcmlkZ2UuaW52b2tlQ2FsbGJhY2tIYW5kbGVyKC4uLmFyZ3MpO1xuICB9XG5cbiAgb25Mb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25Mb2FkIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTG9hZCgpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gPFNlcnZpY2UgXG4gICAgICBvbkxvYWQ9e3RoaXMub25Mb2FkfVxuICAgICAgc3Vic2NyaWJlSGFuZGxlcj17dGhpcy5zdWJzY3JpYmVIYW5kbGVyfSBcbiAgICAvPlxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./componnets/UIService/index.tsx\n");

/***/ }),

/***/ "./context/index.ts":
/*!**************************!*\
  !*** ./context/index.ts ***!
  \**************************/
/*! exports provided: context, Provider, Consumer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"context\", function() { return context; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Provider\", function() { return Provider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Consumer\", function() { return Consumer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst context = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"])({});\nconst {\n  Provider,\n  Consumer\n} = context;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L2luZGV4LnRzP2UyYmIiXSwibmFtZXMiOlsiY29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJQcm92aWRlciIsIkNvbnN1bWVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLE1BQU1BLE9BQU8sZ0JBQUdDLDJEQUFhLENBQUMsRUFBRCxDQUE3QjtBQUNBLE1BQU07QUFBRUMsVUFBRjtBQUFZQztBQUFaLElBQXlCSCxPQUEvQiIsImZpbGUiOiIuL2NvbnRleHQvaW5kZXgudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgY29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30pO1xuZXhwb3J0IGNvbnN0IHsgUHJvdmlkZXIsIENvbnN1bWVyIH0gPSBjb250ZXh0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/index.ts\n");

/***/ }),

/***/ "./hooks/useMessage.ts":
/*!*****************************!*\
  !*** ./hooks/useMessage.ts ***!
  \*****************************/
/*! exports provided: useMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useMessage\", function() { return useMessage; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction useMessage(name, callback) {\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    document.addEventListener(name, callback, false);\n    return () => document.removeEventListener(name, callback, false);\n  }, []);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ob29rcy91c2VNZXNzYWdlLnRzPzQyMGEiXSwibmFtZXMiOlsidXNlTWVzc2FnZSIsIm5hbWUiLCJjYWxsYmFjayIsInVzZUVmZmVjdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxTQUFTQSxVQUFULENBQXFCQyxJQUFyQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDMUNDLHlEQUFTLENBQUMsTUFBTTtBQUNkQyxZQUFRLENBQUNDLGdCQUFULENBQTBCSixJQUExQixFQUFnQ0MsUUFBaEMsRUFBMEMsS0FBMUM7QUFDQSxXQUFPLE1BQU1FLFFBQVEsQ0FBQ0UsbUJBQVQsQ0FBNkJMLElBQTdCLEVBQW1DQyxRQUFuQyxFQUE2QyxLQUE3QyxDQUFiO0FBQ0QsR0FIUSxFQUdOLEVBSE0sQ0FBVDtBQUlEIiwiZmlsZSI6Ii4vaG9va3MvdXNlTWVzc2FnZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lc3NhZ2UgKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrLCBmYWxzZSlcbiAgfSwgW10pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./hooks/useMessage.ts\n");

/***/ }),

/***/ "./hooks/useScript.ts":
/*!****************************!*\
  !*** ./hooks/useScript.ts ***!
  \****************************/
/*! exports provided: useScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useScript\", function() { return useScript; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nasync function scriptLoader(src) {\n  return new Promise((resolve, reject) => {\n    const script = document.createElement('script');\n    script.type = 'application/javascript';\n    script.src = src;\n\n    script.onload = () => resolve(src);\n\n    script.onerror = error => reject(error);\n\n    script.src = src;\n    document.head.appendChild(script);\n  });\n}\n\nfunction useScript(src, deps = []) {\n  const scripts = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useMemo\"])(() => [], []);\n  scripts.push(src);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const run = async () => {\n      let script = scripts.shift();\n\n      while (script) {\n        if (typeof script === 'function') {\n          await script();\n        } else if (typeof script === 'string') {\n          await scriptLoader(script);\n        }\n\n        script = scripts.shift();\n      }\n    };\n\n    run();\n  }, deps);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ob29rcy91c2VTY3JpcHQudHM/OTRiMCJdLCJuYW1lcyI6WyJzY3JpcHRMb2FkZXIiLCJzcmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJvbmxvYWQiLCJvbmVycm9yIiwiZXJyb3IiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJ1c2VTY3JpcHQiLCJkZXBzIiwic2NyaXB0cyIsInVzZU1lbW8iLCJwdXNoIiwidXNlRWZmZWN0IiwicnVuIiwic2hpZnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUEsZUFBZUEsWUFBZixDQUE2QkMsR0FBN0IsRUFBZ0Q7QUFDOUMsU0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDLFVBQU1DLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFFQUYsVUFBTSxDQUFDRyxJQUFQLEdBQWMsd0JBQWQ7QUFDQUgsVUFBTSxDQUFDSixHQUFQLEdBQWFBLEdBQWI7O0FBRUFJLFVBQU0sQ0FBQ0ksTUFBUCxHQUFnQixNQUFNTixPQUFPLENBQUNGLEdBQUQsQ0FBN0I7O0FBQ0FJLFVBQU0sQ0FBQ0ssT0FBUCxHQUFrQkMsS0FBRCxJQUFXUCxNQUFNLENBQUNPLEtBQUQsQ0FBbEM7O0FBQ0FOLFVBQU0sQ0FBQ0osR0FBUCxHQUFhQSxHQUFiO0FBRUFLLFlBQVEsQ0FBQ00sSUFBVCxDQUFjQyxXQUFkLENBQTBCUixNQUExQjtBQUNELEdBWE0sQ0FBUDtBQVlEOztBQUVNLFNBQVNTLFNBQVQsQ0FBb0JiLEdBQXBCLEVBQTRDYyxJQUFJLEdBQUcsRUFBbkQsRUFBdUQ7QUFDNUQsUUFBTUMsT0FBYyxHQUFHQyxxREFBTyxDQUFDLE1BQU0sRUFBUCxFQUFXLEVBQVgsQ0FBOUI7QUFFQUQsU0FBTyxDQUFDRSxJQUFSLENBQWFqQixHQUFiO0FBRUFrQix5REFBUyxDQUFDLE1BQU07QUFDZCxVQUFNQyxHQUFHLEdBQUcsWUFBWTtBQUN0QixVQUFJZixNQUFNLEdBQUdXLE9BQU8sQ0FBQ0ssS0FBUixFQUFiOztBQUVBLGFBQU9oQixNQUFQLEVBQWU7QUFDYixZQUFJLE9BQU9BLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDaEMsZ0JBQU1BLE1BQU0sRUFBWjtBQUNELFNBRkQsTUFFTyxJQUFJLE9BQU9BLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDckMsZ0JBQU1MLFlBQVksQ0FBQ0ssTUFBRCxDQUFsQjtBQUNEOztBQUVEQSxjQUFNLEdBQUdXLE9BQU8sQ0FBQ0ssS0FBUixFQUFUO0FBQ0Q7QUFDRixLQVpEOztBQWNBRCxPQUFHO0FBQ0osR0FoQlEsRUFnQk5MLElBaEJNLENBQVQ7QUFpQkQiLCJmaWxlIjoiLi9ob29rcy91c2VTY3JpcHQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5cbmFzeW5jIGZ1bmN0aW9uIHNjcmlwdExvYWRlciAoc3JjKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBcbiAgICBzY3JpcHQudHlwZSA9ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQuc3JjID0gc3JjO1xuXG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHJlc29sdmUoc3JjKTtcbiAgICBzY3JpcHQub25lcnJvciA9IChlcnJvcikgPT4gcmVqZWN0KGVycm9yKTtcbiAgICBzY3JpcHQuc3JjID0gc3JjO1xuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVNjcmlwdCAoc3JjOiBzdHJpbmcgfCBGdW5jdGlvbiwgZGVwcyA9IFtdKSB7XG4gIGNvbnN0IHNjcmlwdHM6IGFueVtdID0gdXNlTWVtbygoKSA9PiBbXSwgW10pO1xuXG4gIHNjcmlwdHMucHVzaChzcmMpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcnVuID0gYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHNjcmlwdCA9IHNjcmlwdHMuc2hpZnQoKTtcbiAgICAgIFxuICAgICAgd2hpbGUgKHNjcmlwdCkge1xuICAgICAgICBpZiAodHlwZW9mIHNjcmlwdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGF3YWl0IHNjcmlwdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzY3JpcHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYXdhaXQgc2NyaXB0TG9hZGVyKHNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY3JpcHQgPSBzY3JpcHRzLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcnVuKCk7XG4gIH0sIGRlcHMpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./hooks/useScript.ts\n");

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Index; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _componnets_UIService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../componnets/UIService */ \"./componnets/UIService/index.tsx\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context */ \"./context/index.ts\");\n\nvar _jsxFileName = \"/Users/weiyanhai/Downloads/tick/packages/mini-program/src/vm/server/pages/index.tsx\";\n\n\nfunction Index() {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_context__WEBPACK_IMPORTED_MODULE_2__[\"Provider\"], {\n    value: {},\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_componnets_UIService__WEBPACK_IMPORTED_MODULE_1__[\"UIService\"], {\n      onLoad: () => {},\n      onMessage: () => {}\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 11,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC50c3g/ZGI3NiJdLCJuYW1lcyI6WyJJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTtBQUNBO0FBR2UsU0FBU0EsS0FBVCxHQUFrQjtBQUUvQixzQkFDRSxxRUFBQyxpREFBRDtBQUFVLFNBQUssRUFBRSxFQUFqQjtBQUFBLDJCQUNFLHFFQUFDLCtEQUFEO0FBQ0UsWUFBTSxFQUFFLE1BQU0sQ0FBRSxDQURsQjtBQUVFLGVBQVMsRUFBRSxNQUFNLENBQUU7QUFGckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQVNEIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGZldGNoIGZyb20gJ2lzb21vcnBoaWMtZmV0Y2gnO1xuaW1wb3J0IHsgVUlNb2JpbGUgfSBmcm9tICcuLi9jb21wb25uZXRzL1VJTW9iaWxlJztcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJy4uL2NvbXBvbm5ldHMvVUlTZXJ2aWNlJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5kZXggKCkge1xuICBcbiAgcmV0dXJuIChcbiAgICA8UHJvdmlkZXIgdmFsdWU9e3t9fT5cbiAgICAgIDxVSVNlcnZpY2UgXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge319XG4gICAgICAgIG9uTWVzc2FnZT17KCkgPT4ge319XG4gICAgICAvPlxuICAgICAgXG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });