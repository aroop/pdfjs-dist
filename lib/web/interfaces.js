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
exports.IL10n = exports.IPDFAnnotationLayerFactory = exports.IPDFTextLayerFactory = exports.IRenderableView = exports.IPDFHistory = exports.IPDFLinkService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IPDFLinkService =
/*#__PURE__*/
function () {
  function IPDFLinkService() {
    _classCallCheck(this, IPDFLinkService);
  }

  _createClass(IPDFLinkService, [{
    key: "navigateTo",
    value: function navigateTo(dest) {}
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {}
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(hash) {}
  }, {
    key: "setHash",
    value: function setHash(hash) {}
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {}
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {}
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {}
  }, {
    key: "pagesCount",
    get: function get() {}
  }, {
    key: "page",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "rotation",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "externalLinkEnabled",
    get: function get() {},
    set: function set(value) {}
  }]);

  return IPDFLinkService;
}();

exports.IPDFLinkService = IPDFLinkService;

var IPDFHistory =
/*#__PURE__*/
function () {
  function IPDFHistory() {
    _classCallCheck(this, IPDFHistory);
  }

  _createClass(IPDFHistory, [{
    key: "initialize",
    value: function initialize(_ref) {
      var fingerprint = _ref.fingerprint,
          _ref$resetHistory = _ref.resetHistory,
          resetHistory = _ref$resetHistory === void 0 ? false : _ref$resetHistory,
          _ref$updateUrl = _ref.updateUrl,
          updateUrl = _ref$updateUrl === void 0 ? false : _ref$updateUrl;
    }
  }, {
    key: "push",
    value: function push(_ref2) {
      var _ref2$namedDest = _ref2.namedDest,
          namedDest = _ref2$namedDest === void 0 ? null : _ref2$namedDest,
          explicitDest = _ref2.explicitDest,
          pageNumber = _ref2.pageNumber;
    }
  }, {
    key: "pushCurrentPosition",
    value: function pushCurrentPosition() {}
  }, {
    key: "back",
    value: function back() {}
  }, {
    key: "forward",
    value: function forward() {}
  }]);

  return IPDFHistory;
}();

exports.IPDFHistory = IPDFHistory;

var IRenderableView =
/*#__PURE__*/
function () {
  function IRenderableView() {
    _classCallCheck(this, IRenderableView);
  }

  _createClass(IRenderableView, [{
    key: "draw",
    value: function draw() {}
  }, {
    key: "resume",
    value: function resume() {}
  }, {
    key: "renderingId",
    get: function get() {}
  }, {
    key: "renderingState",
    get: function get() {}
  }]);

  return IRenderableView;
}();

exports.IRenderableView = IRenderableView;

var IPDFTextLayerFactory =
/*#__PURE__*/
function () {
  function IPDFTextLayerFactory() {
    _classCallCheck(this, IPDFTextLayerFactory);
  }

  _createClass(IPDFTextLayerFactory, [{
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    }
  }]);

  return IPDFTextLayerFactory;
}();

exports.IPDFTextLayerFactory = IPDFTextLayerFactory;

var IPDFAnnotationLayerFactory =
/*#__PURE__*/
function () {
  function IPDFAnnotationLayerFactory() {
    _classCallCheck(this, IPDFAnnotationLayerFactory);
  }

  _createClass(IPDFAnnotationLayerFactory, [{
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var imageResourcesPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var renderInteractiveForms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var l10n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    }
  }]);

  return IPDFAnnotationLayerFactory;
}();

exports.IPDFAnnotationLayerFactory = IPDFAnnotationLayerFactory;

var IL10n =
/*#__PURE__*/
function () {
  function IL10n() {
    _classCallCheck(this, IL10n);
  }

  _createClass(IL10n, [{
    key: "getLanguage",
    value: function getLanguage() {
      return _regenerator["default"].async(function getLanguage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getDirection",
    value: function getDirection() {
      return _regenerator["default"].async(function getDirection$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "get",
    value: function get(key, args, fallback) {
      return _regenerator["default"].async(function get$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "translate",
    value: function translate(element) {
      return _regenerator["default"].async(function translate$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return IL10n;
}();

exports.IL10n = IL10n;