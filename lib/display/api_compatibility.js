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

var compatibilityParams = Object.create(null);
{
  var _require = require('../shared/is_node'),
      isNodeJS = _require.isNodeJS;

  var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
  var isIE = /Trident/.test(userAgent);
  var isIOSChrome = /CriOS/.test(userAgent);

  (function checkOnBlobSupport() {
    if (isIE || isIOSChrome) {
      compatibilityParams.disableCreateObjectURL = true;
    }
  })();

  (function checkFontFaceAndImage() {
    if (isNodeJS) {
      compatibilityParams.disableFontFace = true;
      compatibilityParams.nativeImageDecoderSupport = 'none';
    }
  })();
}
exports.apiCompatibilityParams = Object.freeze(compatibilityParams);