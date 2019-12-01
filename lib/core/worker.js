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
exports.WorkerMessageHandler = exports.WorkerTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util");

var _primitives = require("./primitives");

var _pdf_manager = require("./pdf_manager");

var _is_node = require("../shared/is_node");

var _message_handler = require("../shared/message_handler");

var _worker_stream = require("./worker_stream");

var _core_utils = require("./core_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WorkerTask = function WorkerTaskClosure() {
  function WorkerTask(name) {
    this.name = name;
    this.terminated = false;
    this._capability = (0, _util.createPromiseCapability)();
  }

  WorkerTask.prototype = {
    get finished() {
      return this._capability.promise;
    },

    finish: function finish() {
      this._capability.resolve();
    },
    terminate: function terminate() {
      this.terminated = true;
    },
    ensureNotTerminated: function ensureNotTerminated() {
      if (this.terminated) {
        throw new Error('Worker task was terminated');
      }
    }
  };
  return WorkerTask;
}();

exports.WorkerTask = WorkerTask;
var WorkerMessageHandler = {
  setup: function setup(handler, port) {
    var testMessageProcessed = false;
    handler.on('test', function wphSetupTest(data) {
      if (testMessageProcessed) {
        return;
      }

      testMessageProcessed = true;

      if (!(data instanceof Uint8Array)) {
        handler.send('test', null);
        return;
      }

      var supportTransfers = data[0] === 255;
      handler.postMessageTransfers = supportTransfers;
      handler.send('test', {
        supportTransfers: supportTransfers
      });
    });
    handler.on('configure', function wphConfigure(data) {
      (0, _util.setVerbosityLevel)(data.verbosity);
    });
    handler.on('GetDocRequest', function wphSetupDoc(data) {
      return WorkerMessageHandler.createDocumentHandler(data, port);
    });
  },
  createDocumentHandler: function createDocumentHandler(docParams, port) {
    var pdfManager;
    var terminated = false;
    var cancelXHRs = null;
    var WorkerTasks = [];
    var verbosity = (0, _util.getVerbosityLevel)();
    var apiVersion = docParams.apiVersion;
    var workerVersion = '2.4.164';

    if (apiVersion !== workerVersion) {
      throw new Error("The API version \"".concat(apiVersion, "\" does not match ") + "the Worker version \"".concat(workerVersion, "\"."));
    }

    var docId = docParams.docId;
    var docBaseUrl = docParams.docBaseUrl;
    var workerHandlerName = docParams.docId + '_worker';
    var handler = new _message_handler.MessageHandler(workerHandlerName, docId, port);
    handler.postMessageTransfers = docParams.postMessageTransfers;

    function ensureNotTerminated() {
      if (terminated) {
        throw new Error('Worker was terminated');
      }
    }

    function startWorkerTask(task) {
      WorkerTasks.push(task);
    }

    function finishWorkerTask(task) {
      task.finish();
      var i = WorkerTasks.indexOf(task);
      WorkerTasks.splice(i, 1);
    }

    function loadDocument(recoveryMode) {
      var _ref, _ref2, numPages, fingerprint;

      return _regenerator["default"].async(function loadDocument$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _regenerator["default"].awrap(pdfManager.ensureDoc('checkHeader'));

            case 2:
              _context.next = 4;
              return _regenerator["default"].awrap(pdfManager.ensureDoc('parseStartXRef'));

            case 4:
              _context.next = 6;
              return _regenerator["default"].awrap(pdfManager.ensureDoc('parse', [recoveryMode]));

            case 6:
              if (recoveryMode) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return _regenerator["default"].awrap(pdfManager.ensureDoc('checkFirstPage'));

            case 9:
              _context.next = 11;
              return _regenerator["default"].awrap(Promise.all([pdfManager.ensureDoc('numPages'), pdfManager.ensureDoc('fingerprint')]));

            case 11:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 2);
              numPages = _ref2[0];
              fingerprint = _ref2[1];
              return _context.abrupt("return", {
                numPages: numPages,
                fingerprint: fingerprint
              });

            case 16:
            case "end":
              return _context.stop();
          }
        }
      });
    }

    function getPdfManager(data, evaluatorOptions) {
      var pdfManagerCapability = (0, _util.createPromiseCapability)();
      var pdfManager;
      var source = data.source;

      if (source.data) {
        try {
          pdfManager = new _pdf_manager.LocalPdfManager(docId, source.data, source.password, evaluatorOptions, docBaseUrl);
          pdfManagerCapability.resolve(pdfManager);
        } catch (ex) {
          pdfManagerCapability.reject(ex);
        }

        return pdfManagerCapability.promise;
      }

      var pdfStream,
          cachedChunks = [];

      try {
        pdfStream = new _worker_stream.PDFWorkerStream(handler);
      } catch (ex) {
        pdfManagerCapability.reject(ex);
        return pdfManagerCapability.promise;
      }

      var fullRequest = pdfStream.getFullReader();
      fullRequest.headersReady.then(function () {
        if (!fullRequest.isRangeSupported) {
          return;
        }

        var disableAutoFetch = source.disableAutoFetch || fullRequest.isStreamingSupported;
        pdfManager = new _pdf_manager.NetworkPdfManager(docId, pdfStream, {
          msgHandler: handler,
          password: source.password,
          length: fullRequest.contentLength,
          disableAutoFetch: disableAutoFetch,
          rangeChunkSize: source.rangeChunkSize
        }, evaluatorOptions, docBaseUrl);

        for (var i = 0; i < cachedChunks.length; i++) {
          pdfManager.sendProgressiveData(cachedChunks[i]);
        }

        cachedChunks = [];
        pdfManagerCapability.resolve(pdfManager);
        cancelXHRs = null;
      })["catch"](function (reason) {
        pdfManagerCapability.reject(reason);
        cancelXHRs = null;
      });
      var loaded = 0;

      var flushChunks = function flushChunks() {
        var pdfFile = (0, _util.arraysToBytes)(cachedChunks);

        if (source.length && pdfFile.length !== source.length) {
          (0, _util.warn)('reported HTTP length is different from actual');
        }

        try {
          pdfManager = new _pdf_manager.LocalPdfManager(docId, pdfFile, source.password, evaluatorOptions, docBaseUrl);
          pdfManagerCapability.resolve(pdfManager);
        } catch (ex) {
          pdfManagerCapability.reject(ex);
        }

        cachedChunks = [];
      };

      var readPromise = new Promise(function (resolve, reject) {
        var readChunk = function readChunk(chunk) {
          try {
            ensureNotTerminated();

            if (chunk.done) {
              if (!pdfManager) {
                flushChunks();
              }

              cancelXHRs = null;
              return;
            }

            var data = chunk.value;
            loaded += (0, _util.arrayByteLength)(data);

            if (!fullRequest.isStreamingSupported) {
              handler.send('DocProgress', {
                loaded: loaded,
                total: Math.max(loaded, fullRequest.contentLength || 0)
              });
            }

            if (pdfManager) {
              pdfManager.sendProgressiveData(data);
            } else {
              cachedChunks.push(data);
            }

            fullRequest.read().then(readChunk, reject);
          } catch (e) {
            reject(e);
          }
        };

        fullRequest.read().then(readChunk, reject);
      });
      readPromise["catch"](function (e) {
        pdfManagerCapability.reject(e);
        cancelXHRs = null;
      });

      cancelXHRs = function cancelXHRs(reason) {
        pdfStream.cancelAllRequests(reason);
      };

      return pdfManagerCapability.promise;
    }

    function setupDoc(data) {
      function onSuccess(doc) {
        ensureNotTerminated();
        handler.send('GetDoc', {
          pdfInfo: doc
        });
      }

      function onFailure(ex) {
        ensureNotTerminated();

        if (ex instanceof _util.PasswordException) {
          var task = new WorkerTask("PasswordException: response ".concat(ex.code));
          startWorkerTask(task);
          handler.sendWithPromise('PasswordRequest', ex).then(function (data) {
            finishWorkerTask(task);
            pdfManager.updatePassword(data.password);
            pdfManagerReady();
          })["catch"](function () {
            finishWorkerTask(task);
            handler.send('DocException', ex);
          });
        } else if (ex instanceof _util.InvalidPDFException || ex instanceof _util.MissingPDFException || ex instanceof _util.UnexpectedResponseException || ex instanceof _util.UnknownErrorException) {
          handler.send('DocException', ex);
        } else {
          handler.send('DocException', new _util.UnknownErrorException(ex.message, ex.toString()));
        }
      }

      function pdfManagerReady() {
        ensureNotTerminated();
        loadDocument(false).then(onSuccess, function loadFailure(ex) {
          ensureNotTerminated();

          if (!(ex instanceof _core_utils.XRefParseException)) {
            onFailure(ex);
            return;
          }

          pdfManager.requestLoadedStream();
          pdfManager.onLoadedStream().then(function () {
            ensureNotTerminated();
            loadDocument(true).then(onSuccess, onFailure);
          });
        }, onFailure);
      }

      ensureNotTerminated();
      var evaluatorOptions = {
        forceDataSchema: data.disableCreateObjectURL,
        maxImageSize: data.maxImageSize,
        disableFontFace: data.disableFontFace,
        nativeImageDecoderSupport: data.nativeImageDecoderSupport,
        ignoreErrors: data.ignoreErrors,
        isEvalSupported: data.isEvalSupported
      };
      getPdfManager(data, evaluatorOptions).then(function (newPdfManager) {
        if (terminated) {
          newPdfManager.terminate(new _util.AbortException('Worker was terminated.'));
          throw new Error('Worker was terminated');
        }

        pdfManager = newPdfManager;
        pdfManager.onLoadedStream().then(function (stream) {
          handler.send('DataLoaded', {
            length: stream.bytes.byteLength
          });
        });
      }).then(pdfManagerReady, onFailure);
    }

    handler.on('GetPage', function wphSetupGetPage(data) {
      return pdfManager.getPage(data.pageIndex).then(function (page) {
        return Promise.all([pdfManager.ensure(page, 'rotate'), pdfManager.ensure(page, 'ref'), pdfManager.ensure(page, 'userUnit'), pdfManager.ensure(page, 'view')]).then(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 4),
              rotate = _ref4[0],
              ref = _ref4[1],
              userUnit = _ref4[2],
              view = _ref4[3];

          return {
            rotate: rotate,
            ref: ref,
            userUnit: userUnit,
            view: view
          };
        });
      });
    });
    handler.on('GetPageIndex', function wphSetupGetPageIndex(data) {
      var ref = _primitives.Ref.get(data.ref.num, data.ref.gen);

      var catalog = pdfManager.pdfDocument.catalog;
      return catalog.getPageIndex(ref);
    });
    handler.on('GetDestinations', function wphSetupGetDestinations(data) {
      return pdfManager.ensureCatalog('destinations');
    });
    handler.on('GetDestination', function wphSetupGetDestination(data) {
      return pdfManager.ensureCatalog('getDestination', [data.id]);
    });
    handler.on('GetPageLabels', function wphSetupGetPageLabels(data) {
      return pdfManager.ensureCatalog('pageLabels');
    });
    handler.on('GetPageLayout', function wphSetupGetPageLayout(data) {
      return pdfManager.ensureCatalog('pageLayout');
    });
    handler.on('GetPageMode', function wphSetupGetPageMode(data) {
      return pdfManager.ensureCatalog('pageMode');
    });
    handler.on('GetViewerPreferences', function (data) {
      return pdfManager.ensureCatalog('viewerPreferences');
    });
    handler.on('GetOpenActionDestination', function (data) {
      return pdfManager.ensureCatalog('openActionDestination');
    });
    handler.on('GetAttachments', function wphSetupGetAttachments(data) {
      return pdfManager.ensureCatalog('attachments');
    });
    handler.on('GetJavaScript', function wphSetupGetJavaScript(data) {
      return pdfManager.ensureCatalog('javaScript');
    });
    handler.on('GetOutline', function wphSetupGetOutline(data) {
      return pdfManager.ensureCatalog('documentOutline');
    });
    handler.on('GetPermissions', function (data) {
      return pdfManager.ensureCatalog('permissions');
    });
    handler.on('GetMetadata', function wphSetupGetMetadata(data) {
      return Promise.all([pdfManager.ensureDoc('documentInfo'), pdfManager.ensureCatalog('metadata')]);
    });
    handler.on('GetData', function wphSetupGetData(data) {
      pdfManager.requestLoadedStream();
      return pdfManager.onLoadedStream().then(function (stream) {
        return stream.bytes;
      });
    });
    handler.on('GetStats', function wphSetupGetStats(data) {
      return pdfManager.pdfDocument.xref.stats;
    });
    handler.on('GetAnnotations', function (_ref5) {
      var pageIndex = _ref5.pageIndex,
          intent = _ref5.intent;
      return pdfManager.getPage(pageIndex).then(function (page) {
        return page.getAnnotationsData(intent);
      });
    });
    handler.on('GetOperatorList', function wphSetupRenderPage(data, sink) {
      var pageIndex = data.pageIndex;
      pdfManager.getPage(pageIndex).then(function (page) {
        var task = new WorkerTask("GetOperatorList: page ".concat(pageIndex));
        startWorkerTask(task);
        var start = verbosity >= _util.VerbosityLevel.INFOS ? Date.now() : 0;
        page.getOperatorList({
          handler: handler,
          sink: sink,
          task: task,
          intent: data.intent,
          renderInteractiveForms: data.renderInteractiveForms
        }).then(function (operatorListInfo) {
          finishWorkerTask(task);

          if (start) {
            (0, _util.info)("page=".concat(pageIndex + 1, " - getOperatorList: time=") + "".concat(Date.now() - start, "ms, len=").concat(operatorListInfo.length));
          }

          sink.close();
        }, function (reason) {
          finishWorkerTask(task);

          if (task.terminated) {
            return;
          }

          handler.send('UnsupportedFeature', {
            featureId: _util.UNSUPPORTED_FEATURES.unknown
          });
          sink.error(reason);
        });
      });
    }, this);
    handler.on('GetTextContent', function wphExtractText(data, sink) {
      var pageIndex = data.pageIndex;

      sink.onPull = function (desiredSize) {};

      sink.onCancel = function (reason) {};

      pdfManager.getPage(pageIndex).then(function (page) {
        var task = new WorkerTask('GetTextContent: page ' + pageIndex);
        startWorkerTask(task);
        var start = verbosity >= _util.VerbosityLevel.INFOS ? Date.now() : 0;
        page.extractTextContent({
          handler: handler,
          task: task,
          sink: sink,
          normalizeWhitespace: data.normalizeWhitespace,
          combineTextItems: data.combineTextItems
        }).then(function () {
          finishWorkerTask(task);

          if (start) {
            (0, _util.info)("page=".concat(pageIndex + 1, " - getTextContent: time=") + "".concat(Date.now() - start, "ms"));
          }

          sink.close();
        }, function (reason) {
          finishWorkerTask(task);

          if (task.terminated) {
            return;
          }

          sink.error(reason);
        });
      });
    });
    handler.on('FontFallback', function (data) {
      return pdfManager.fontFallback(data.id, handler);
    });
    handler.on('Cleanup', function wphCleanup(data) {
      return pdfManager.cleanup();
    });
    handler.on('Terminate', function wphTerminate(data) {
      terminated = true;

      if (pdfManager) {
        pdfManager.terminate(new _util.AbortException('Worker was terminated.'));
        pdfManager = null;
      }

      if (cancelXHRs) {
        cancelXHRs(new _util.AbortException('Worker was terminated.'));
      }

      (0, _primitives.clearPrimitiveCaches)();
      var waitOn = [];
      WorkerTasks.forEach(function (task) {
        waitOn.push(task.finished);
        task.terminate();
      });
      return Promise.all(waitOn).then(function () {
        handler.destroy();
        handler = null;
      });
    });
    handler.on('Ready', function wphReady(data) {
      setupDoc(docParams);
      docParams = null;
    });
    return workerHandlerName;
  },
  initializeFromPort: function initializeFromPort(port) {
    var handler = new _message_handler.MessageHandler('worker', 'main', port);
    WorkerMessageHandler.setup(handler, port);
    handler.send('ready', null);
  }
};
exports.WorkerMessageHandler = WorkerMessageHandler;

function isMessagePort(maybePort) {
  return typeof maybePort.postMessage === 'function' && 'onmessage' in maybePort;
}

if (typeof window === 'undefined' && !_is_node.isNodeJS && typeof self !== 'undefined' && isMessagePort(self)) {
  WorkerMessageHandler.initializeFromPort(self);
}