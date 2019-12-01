/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2019 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePreferences = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultPreferences = null;

function getDefaultPreferences() {
  if (!defaultPreferences) {
    defaultPreferences = Promise.resolve({
      "cursorToolOnLoad": 0,
      "defaultZoomValue": "",
      "disablePageLabels": false,
      "enablePrintAutoRotate": false,
      "enableWebGL": false,
      "eventBusDispatchToDOM": false,
      "externalLinkTarget": 0,
      "historyUpdateUrl": false,
      "pdfBugEnabled": false,
      "renderer": "canvas",
      "renderInteractiveForms": false,
      "sidebarViewOnLoad": -1,
      "scrollModeOnLoad": -1,
      "spreadModeOnLoad": -1,
      "textLayerMode": 1,
      "useOnlyCssZoom": false,
      "viewOnLoad": 0,
      "disableAutoFetch": false,
      "disableFontFace": false,
      "disableRange": false,
      "disableStream": false
    });
  }

  return defaultPreferences;
}

var BasePreferences =
/*#__PURE__*/
function () {
  function BasePreferences() {
    var _this = this;

    _classCallCheck(this, BasePreferences);

    if (this.constructor === BasePreferences) {
      throw new Error('Cannot initialize BasePreferences.');
    }

    this.prefs = null;
    this._initializedPromise = getDefaultPreferences().then(function (defaults) {
      Object.defineProperty(_this, 'defaults', {
        value: Object.freeze(defaults),
        writable: false,
        enumerable: true,
        configurable: false
      });
      _this.prefs = Object.assign(Object.create(null), defaults);
      return _this._readFromStorage(defaults);
    }).then(function (prefs) {
      if (!prefs) {
        return;
      }

      for (var name in prefs) {
        var defaultValue = _this.defaults[name],
            prefValue = prefs[name];

        if (defaultValue === undefined || _typeof(prefValue) !== _typeof(defaultValue)) {
          continue;
        }

        _this.prefs[name] = prefValue;
      }
    });
  }

  _createClass(BasePreferences, [{
    key: "_writeToStorage",
    value: function _writeToStorage(prefObj) {
      return _regenerator["default"].async(function _writeToStorage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              throw new Error('Not implemented: _writeToStorage');

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "_readFromStorage",
    value: function _readFromStorage(prefObj) {
      return _regenerator["default"].async(function _readFromStorage$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              throw new Error('Not implemented: _readFromStorage');

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      return _regenerator["default"].async(function reset$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              this.prefs = Object.assign(Object.create(null), this.defaults);
              return _context3.abrupt("return", this._writeToStorage(this.defaults));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var defaultValue, valueType, defaultType;
      return _regenerator["default"].async(function set$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              defaultValue = this.defaults[name];

              if (!(defaultValue === undefined)) {
                _context4.next = 7;
                break;
              }

              throw new Error("Set preference: \"".concat(name, "\" is undefined."));

            case 7:
              if (!(value === undefined)) {
                _context4.next = 9;
                break;
              }

              throw new Error('Set preference: no value is specified.');

            case 9:
              valueType = _typeof(value);
              defaultType = _typeof(defaultValue);

              if (!(valueType !== defaultType)) {
                _context4.next = 19;
                break;
              }

              if (!(valueType === 'number' && defaultType === 'string')) {
                _context4.next = 16;
                break;
              }

              value = value.toString();
              _context4.next = 17;
              break;

            case 16:
              throw new Error("Set preference: \"".concat(value, "\" is a ").concat(valueType, ", ") + "expected a ".concat(defaultType, "."));

            case 17:
              _context4.next = 21;
              break;

            case 19:
              if (!(valueType === 'number' && !Number.isInteger(value))) {
                _context4.next = 21;
                break;
              }

              throw new Error("Set preference: \"".concat(value, "\" must be an integer."));

            case 21:
              this.prefs[name] = value;
              return _context4.abrupt("return", this._writeToStorage(this.prefs));

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "get",
    value: function get(name) {
      var defaultValue, prefValue;
      return _regenerator["default"].async(function get$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              defaultValue = this.defaults[name];

              if (!(defaultValue === undefined)) {
                _context5.next = 7;
                break;
              }

              throw new Error("Get preference: \"".concat(name, "\" is undefined."));

            case 7:
              prefValue = this.prefs[name];

              if (!(prefValue !== undefined)) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("return", prefValue);

            case 10:
              return _context5.abrupt("return", defaultValue);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return _regenerator["default"].async(function getAll$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              return _context6.abrupt("return", Object.assign(Object.create(null), this.defaults, this.prefs));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return BasePreferences;
}();

exports.BasePreferences = BasePreferences;