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
exports.Toolbar = void 0;

var _ui_utils = require("./ui_utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PAGE_NUMBER_LOADING_INDICATOR = 'visiblePageIsLoading';
var SCALE_SELECT_CONTAINER_PADDING = 8;
var SCALE_SELECT_PADDING = 22;

var Toolbar =
/*#__PURE__*/
function () {
  function Toolbar(options, eventBus) {
    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils.NullL10n;

    _classCallCheck(this, Toolbar);

    this.toolbar = options.container;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.buttons = [{
      element: options.previous,
      eventName: 'previouspage'
    }, {
      element: options.next,
      eventName: 'nextpage'
    }, {
      element: options.zoomIn,
      eventName: 'zoomin'
    }, {
      element: options.zoomOut,
      eventName: 'zoomout'
    }, {
      element: options.openFile,
      eventName: 'openfile'
    }, {
      element: options.print,
      eventName: 'print'
    }, {
      element: options.presentationModeButton,
      eventName: 'presentationmode'
    }, {
      element: options.download,
      eventName: 'download'
    }, {
      element: options.viewBookmark,
      eventName: null
    }];
    this.items = {
      numPages: options.numPages,
      pageNumber: options.pageNumber,
      scaleSelectContainer: options.scaleSelectContainer,
      scaleSelect: options.scaleSelect,
      customScaleOption: options.customScaleOption,
      previous: options.previous,
      next: options.next,
      zoomIn: options.zoomIn,
      zoomOut: options.zoomOut
    };
    this._wasLocalized = false;
    this.reset();

    this._bindListeners();
  }

  _createClass(Toolbar, [{
    key: "setPageNumber",
    value: function setPageNumber(pageNumber, pageLabel) {
      this.pageNumber = pageNumber;
      this.pageLabel = pageLabel;

      this._updateUIState(false);
    }
  }, {
    key: "setPagesCount",
    value: function setPagesCount(pagesCount, hasPageLabels) {
      this.pagesCount = pagesCount;
      this.hasPageLabels = hasPageLabels;

      this._updateUIState(true);
    }
  }, {
    key: "setPageScale",
    value: function setPageScale(pageScaleValue, pageScale) {
      this.pageScaleValue = (pageScaleValue || pageScale).toString();
      this.pageScale = pageScale;

      this._updateUIState(false);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pageNumber = 0;
      this.pageLabel = null;
      this.hasPageLabels = false;
      this.pagesCount = 0;
      this.pageScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
      this.pageScale = _ui_utils.DEFAULT_SCALE;

      this._updateUIState(true);

      this.updateLoadingIndicatorState();
    }
  }, {
    key: "_bindListeners",
    value: function _bindListeners() {
      var _this = this;

      var _this$items = this.items,
          pageNumber = _this$items.pageNumber,
          scaleSelect = _this$items.scaleSelect;
      var self = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
              element = _step$value.element,
              eventName = _step$value.eventName;
          element.addEventListener('click', function (evt) {
            if (eventName !== null) {
              _this.eventBus.dispatch(eventName, {
                source: _this
              });
            }
          });
        };

        for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      pageNumber.addEventListener('click', function () {
        this.select();
      });
      pageNumber.addEventListener('change', function () {
        self.eventBus.dispatch('pagenumberchanged', {
          source: self,
          value: this.value
        });
      });
      scaleSelect.addEventListener('change', function () {
        if (this.value === 'custom') {
          return;
        }

        self.eventBus.dispatch('scalechanged', {
          source: self,
          value: this.value
        });
      });
      scaleSelect.oncontextmenu = _ui_utils.noContextMenuHandler;
      this.eventBus.on('localized', function () {
        _this._wasLocalized = true;

        _this._adjustScaleWidth();

        _this._updateUIState(true);
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState() {
      var resetNumPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._wasLocalized) {
        return;
      }

      var pageNumber = this.pageNumber,
          pagesCount = this.pagesCount,
          pageScaleValue = this.pageScaleValue,
          pageScale = this.pageScale,
          items = this.items;

      if (resetNumPages) {
        if (this.hasPageLabels) {
          items.pageNumber.type = 'text';
        } else {
          items.pageNumber.type = 'number';
          this.l10n.get('of_pages', {
            pagesCount: pagesCount
          }, 'of {{pagesCount}}').then(function (msg) {
            items.numPages.textContent = msg;
          });
        }

        items.pageNumber.max = pagesCount;
      }

      if (this.hasPageLabels) {
        items.pageNumber.value = this.pageLabel;
        this.l10n.get('page_of_pages', {
          pageNumber: pageNumber,
          pagesCount: pagesCount
        }, '({{pageNumber}} of {{pagesCount}})').then(function (msg) {
          items.numPages.textContent = msg;
        });
      } else {
        items.pageNumber.value = pageNumber;
      }

      items.previous.disabled = pageNumber <= 1;
      items.next.disabled = pageNumber >= pagesCount;
      items.zoomOut.disabled = pageScale <= _ui_utils.MIN_SCALE;
      items.zoomIn.disabled = pageScale >= _ui_utils.MAX_SCALE;
      var customScale = Math.round(pageScale * 10000) / 100;
      this.l10n.get('page_scale_percent', {
        scale: customScale
      }, '{{scale}}%').then(function (msg) {
        var predefinedValueFound = false;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = items.scaleSelect.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var option = _step2.value;

            if (option.value !== pageScaleValue) {
              option.selected = false;
              continue;
            }

            option.selected = true;
            predefinedValueFound = true;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (!predefinedValueFound) {
          items.customScaleOption.textContent = msg;
          items.customScaleOption.selected = true;
        }
      });
    }
  }, {
    key: "updateLoadingIndicatorState",
    value: function updateLoadingIndicatorState() {
      var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pageNumberInput = this.items.pageNumber;
      pageNumberInput.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR, loading);
    }
  }, {
    key: "_adjustScaleWidth",
    value: function _adjustScaleWidth() {
      var container = this.items.scaleSelectContainer;
      var select = this.items.scaleSelect;

      _ui_utils.animationStarted.then(function () {
        if (container.clientWidth === 0) {
          container.setAttribute('style', 'display: inherit;');
        }

        if (container.clientWidth > 0) {
          select.setAttribute('style', 'min-width: inherit;');
          var width = select.clientWidth + SCALE_SELECT_CONTAINER_PADDING;
          select.setAttribute('style', 'min-width: ' + (width + SCALE_SELECT_PADDING) + 'px;');
          container.setAttribute('style', 'min-width: ' + width + 'px; ' + 'max-width: ' + width + 'px;');
        }
      });
    }
  }]);

  return Toolbar;
}();

exports.Toolbar = Toolbar;