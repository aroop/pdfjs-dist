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
exports.ViewHistory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;

var ViewHistory =
/*#__PURE__*/
function () {
  function ViewHistory(fingerprint) {
    var _this = this;

    var cacheSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_VIEW_HISTORY_CACHE_SIZE;

    _classCallCheck(this, ViewHistory);

    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage().then(function (databaseStr) {
      var database = JSON.parse(databaseStr || '{}');

      if (!('files' in database)) {
        database.files = [];
      } else {
        while (database.files.length >= _this.cacheSize) {
          database.files.shift();
        }
      }

      var index = -1;

      for (var i = 0, length = database.files.length; i < length; i++) {
        var branch = database.files[i];

        if (branch.fingerprint === _this.fingerprint) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        index = database.files.push({
          fingerprint: _this.fingerprint
        }) - 1;
      }

      _this.file = database.files[index];
      _this.database = database;
    });
  }

  _createClass(ViewHistory, [{
    key: "_writeToStorage",
    value: function _writeToStorage() {
      var databaseStr;
      return _regenerator["default"].async(function _writeToStorage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              databaseStr = JSON.stringify(this.database);
              localStorage.setItem('pdfjs.history', databaseStr);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_readFromStorage",
    value: function _readFromStorage() {
      return _regenerator["default"].async(function _readFromStorage$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", localStorage.getItem('pdfjs.history'));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "set",
    value: function set(name, val) {
      return _regenerator["default"].async(function set$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              this.file[name] = val;
              return _context3.abrupt("return", this._writeToStorage());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "setMultiple",
    value: function setMultiple(properties) {
      var name;
      return _regenerator["default"].async(function setMultiple$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              for (name in properties) {
                this.file[name] = properties[name];
              }

              return _context4.abrupt("return", this._writeToStorage());

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "get",
    value: function get(name, defaultValue) {
      var val;
      return _regenerator["default"].async(function get$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              val = this.file[name];
              return _context5.abrupt("return", val !== undefined ? val : defaultValue);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getMultiple",
    value: function getMultiple(properties) {
      var values, name, val;
      return _regenerator["default"].async(function getMultiple$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _regenerator["default"].awrap(this._initializedPromise);

            case 2:
              values = Object.create(null);

              for (name in properties) {
                val = this.file[name];
                values[name] = val !== undefined ? val : properties[name];
              }

              return _context6.abrupt("return", values);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ViewHistory;
}();

exports.ViewHistory = ViewHistory;