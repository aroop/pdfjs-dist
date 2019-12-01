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
exports.OverlayManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OverlayManager =
/*#__PURE__*/
function () {
  function OverlayManager() {
    _classCallCheck(this, OverlayManager);

    this._overlays = {};
    this._active = null;
    this._keyDownBound = this._keyDown.bind(this);
  }

  _createClass(OverlayManager, [{
    key: "register",
    value: function register(name, element) {
      var callerCloseMethod,
          canForceClose,
          container,
          _args = arguments;
      return _regenerator["default"].async(function register$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              callerCloseMethod = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
              canForceClose = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;

              if (!(!name || !element || !(container = element.parentNode))) {
                _context.next = 6;
                break;
              }

              throw new Error('Not enough parameters.');

            case 6:
              if (!this._overlays[name]) {
                _context.next = 8;
                break;
              }

              throw new Error('The overlay is already registered.');

            case 8:
              this._overlays[name] = {
                element: element,
                container: container,
                callerCloseMethod: callerCloseMethod,
                canForceClose: canForceClose
              };

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "unregister",
    value: function unregister(name) {
      return _regenerator["default"].async(function unregister$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this._overlays[name]) {
                _context2.next = 4;
                break;
              }

              throw new Error('The overlay does not exist.');

            case 4:
              if (!(this._active === name)) {
                _context2.next = 6;
                break;
              }

              throw new Error('The overlay cannot be removed while it is active.');

            case 6:
              delete this._overlays[name];

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "open",
    value: function open(name) {
      return _regenerator["default"].async(function open$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this._overlays[name]) {
                _context3.next = 4;
                break;
              }

              throw new Error('The overlay does not exist.');

            case 4:
              if (!this._active) {
                _context3.next = 14;
                break;
              }

              if (!this._overlays[name].canForceClose) {
                _context3.next = 9;
                break;
              }

              this._closeThroughCaller();

              _context3.next = 14;
              break;

            case 9:
              if (!(this._active === name)) {
                _context3.next = 13;
                break;
              }

              throw new Error('The overlay is already active.');

            case 13:
              throw new Error('Another overlay is currently active.');

            case 14:
              this._active = name;

              this._overlays[this._active].element.classList.remove('hidden');

              this._overlays[this._active].container.classList.remove('hidden');

              window.addEventListener('keydown', this._keyDownBound);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "close",
    value: function close(name) {
      return _regenerator["default"].async(function close$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this._overlays[name]) {
                _context4.next = 4;
                break;
              }

              throw new Error('The overlay does not exist.');

            case 4:
              if (this._active) {
                _context4.next = 8;
                break;
              }

              throw new Error('The overlay is currently not active.');

            case 8:
              if (!(this._active !== name)) {
                _context4.next = 10;
                break;
              }

              throw new Error('Another overlay is currently active.');

            case 10:
              this._overlays[this._active].container.classList.add('hidden');

              this._overlays[this._active].element.classList.add('hidden');

              this._active = null;
              window.removeEventListener('keydown', this._keyDownBound);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_keyDown",
    value: function _keyDown(evt) {
      if (this._active && evt.keyCode === 27) {
        this._closeThroughCaller();

        evt.preventDefault();
      }
    }
  }, {
    key: "_closeThroughCaller",
    value: function _closeThroughCaller() {
      if (this._overlays[this._active].callerCloseMethod) {
        this._overlays[this._active].callerCloseMethod();
      }

      if (this._active) {
        this.close(this._active);
      }
    }
  }, {
    key: "active",
    get: function get() {
      return this._active;
    }
  }]);

  return OverlayManager;
}();

exports.OverlayManager = OverlayManager;