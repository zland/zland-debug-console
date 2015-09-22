/*!
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

require('debugConsole/sass/style');

var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;
var LogStore = require('debugConsole/stores/LogStore');
var GameStore = require('game/stores/GameStore');

function getStoreValues() {
  return {
    messages: LogStore.getMessages(),
    showConsole: LogStore.showConsole()
  }
}

module.exports = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.showConsole !== this.state.showConsole) {
      return true;
    }

    if (nextState.showConsole === false) {
      return false;
    }
    if (nextState.messages !== this.state.messages) {
      return true;
    }
    return false;
  },

  getInitialState: function() {
    return getStoreValues();
  },

  componentDidMount: function() {
    LogStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LogStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStoreValues());
  },

  render: function() {
    console.log('--- render debug console');
    var cx = React.addons.classSet;
    var classes = cx({
      'debug-console': true,
      'hidden': !this.state.showConsole
    });
    return (
      <aside className={classes}>
          <table>
              <tbody>
                {this.state.messages.map(function(message) {
                  return (
                    <tr key={message.get('id')}>
                      <td>{message.get('time')}</td>
                      <td>{message.get('type')}</td>
                      <td>{message.get('message')}</td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
      </aside>
    );
  }
});
