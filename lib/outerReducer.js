'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = outerReducer;

var _actionTypes = require('./actionTypes');

var actions = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function outerReducer(appReducer) {
  return function (state, action) {
    if (action.type === actions.STATE_LOADING_DONE) {
      return appReducer(action.payload.state, action);
    }
    return appReducer(state, action);
  };
}