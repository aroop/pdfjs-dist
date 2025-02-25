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
exports.GenericL10n = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("../external/webL10n/l10n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var webL10n = document.webL10n;

var GenericL10n =
/*#__PURE__*/
function () {
  function GenericL10n(lang) {
    _classCallCheck(this, GenericL10n);

    this._lang = lang;
    this._ready = new Promise(function (resolve, reject) {
      webL10n.setLanguage(lang, function () {
        resolve(webL10n);
      });
    });
  }

  _createClass(GenericL10n, [{
    key: "getLanguage",
    value: function getLanguage() {
      var l10n;
      return _regenerator["default"].async(function getLanguage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _regenerator["default"].awrap(this._ready);

            case 2:
              l10n = _context.sent;
              return _context.abrupt("return", l10n.getLanguage());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getDirection",
    value: function getDirection() {
      var l10n;
      return _regenerator["default"].async(function getDirection$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator["default"].awrap(this._ready);

            case 2:
              l10n = _context2.sent;
              return _context2.abrupt("return", l10n.getDirection());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "get",
    value: function get(property, args, fallback) {
      var l10n;
      return _regenerator["default"].async(function get$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(this._ready);

            case 2:
              l10n = _context3.sent;
              return _context3.abrupt("return", l10n.get(property, args, fallback));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "translate",
    value: function translate(element) {
      var l10n;
      return _regenerator["default"].async(function translate$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _regenerator["default"].awrap(this._ready);

            case 2:
              l10n = _context4.sent;
              return _context4.abrupt("return", l10n.translate(element));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return GenericL10n;
}();

exports.GenericL10n = GenericL10n;