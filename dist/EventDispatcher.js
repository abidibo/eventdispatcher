'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Event Dispatcher
 *
 * Implementation of an event dispatcher following the Mediator pattern
 * @namespace
 */
var EventDispatcher = {
  _prefix: 'on_',
  _listeners: {},
  /**
   * Adds a prefix to the event name
   *
   * Assures that event name doesn't match a standard Object property name
   * @param {String} evtName event name
   * @return {String} prefixed event name
   */
  evtName: function evtName(_evtName2) {
    return this._prefix + _evtName2;
  },
  /**
   * Registers a callback to an event
   *
   * @param {String} evtName name of the event
   * @param {Function} callback function binded to the event
   * @param {Mixed} bind the value of this provided to the callback
   * @return void
   */
  register: function register(evtName, callback, bind) {
    var _evtName = this.evtName(evtName);
    if (typeof this._listeners[_evtName] === 'undefined') {
      this._listeners[_evtName] = [];
    }
    this._listeners[_evtName].push([!bind ? this : bind, callback]);
  },
  /**
   * Unregisters one or all callbacks binded to the given event
   *
   * @param {String} evtName name of the event
   * @param {Function} callback function to unregister. All callbacks if empty
   * @return void
   */
  unregister: function unregister(evtName, callback) {
    var _evtName = this.evtName(evtName);
    if (typeof callback === 'undefined') {
      delete this._listeners[_evtName];
    } else {
      // splice re-indexes the array, so I'm not declaring `var len`
      // but array length is re-computed at every loop cycle
      for (var i = 0; i < this._listeners[_evtName].length; i++) {
        var listener = this._listeners[_evtName][i];
        if (listener[1] === callback) {
          this._listeners[_evtName].splice(i, 1);
        }
      }
    }
  },
  /**
   * Emits an event, all registered callbacks are called
   *
   * @param {String} evtName name of the event
   * @param {Mixed} params additional parameters passed to the callback
   */
  emit: function emit(evtName, params) {
    var _evtName = this.evtName(evtName);
    if (typeof this._listeners[_evtName] !== 'undefined') {
      for (var i = 0, l = this._listeners[_evtName].length; i < l; i++) {
        this._listeners[_evtName][i][1].call(this._listeners[_evtName][i][0], evtName, params);
      }
    }
  }
};

exports.default = EventDispatcher;