'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require('./actionTypes');

exports.default = function (load) {
  return function (store) {
    store.dispatch({
      type: _actionTypes.STATE_LOADING_START
    });
    load(store.getState).then(function (state) {
      store.dispatch({
        type: _actionTypes.STATE_LOADING_DONE,
        payload: { state: state }
      });
    }, function (error) {
      store.dispatch({
        type: _actionTypes.STATE_LOADING_FAILED,
        payload: { error: error }
      });
    });
    return function (next) {
      return function (action) {
        return next(action);
      };
    };
  };
};