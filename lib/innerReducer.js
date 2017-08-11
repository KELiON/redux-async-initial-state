'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = innerReducer;

var _actionTypes = require('./actionTypes');

var actions = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
  loading: false,
  loaded: false,
  error: null
};

function innerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actions.STATE_LOADING_START:
      return {
        loaded: false,
        error: null,
        loading: true
      };
    case actions.STATE_LOADING_DONE:
      return {
        loaded: true,
        error: null,
        loading: false
      };
    case actions.STATE_LOADING_FAILED:
      return {
        loaded: false,
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
}