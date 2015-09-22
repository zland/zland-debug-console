/**
 * Copyright 2015 Florian Biewald
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
 */

'use strict';

var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Immutable = require('immutable');
var Dispatcher = require('core/Dispatcher');

var Constants = require('debugConsole/Constants');
var Log = require('core/services/LogService');

var MAX_MESSAGES = 600;

var _messages = Immutable.List();
var _ids = 0;
var _showConsole = false

var LogStore = assign({}, ChangeEventEmitter, {
  getMessages: function() {
    return _messages;
  },
  showConsole: function() {
    return _showConsole;
  }
});

LogStore.dispatchToken = Dispatcher.register(function(action) {

  switch (action.type) {
    case Constants.TOGGLE_CONSOLE:
      _showConsole = !_showConsole;
      LogStore.emitChange();
      break;
  }

});

Log.addChangeListener(function(type, message, time) {
  _messages = _messages.unshift(Immutable.Map({type: type, message: message, time: time, id: _ids++}));
  if (_messages.size > MAX_MESSAGES) {
    _messages = _messages.pop();
  }
  LogStore.emitChange();
});

module.exports = LogStore;
