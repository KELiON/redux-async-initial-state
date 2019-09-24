import {
  STATE_LOADING_DONE,
  STATE_LOADING_FAILED,
  STATE_LOADING_START,
} from './actionTypes';

const middleware = load => store => {
  const { dispatch, getState } = store;
  const handleLoad = () => {
    middleware.isLoadExecuted = true;

    if (typeof load !== 'function') {
      return;
    }

    dispatch({
      type: STATE_LOADING_START,
    });

    load(getState, dispatch).then(
      state => {
        dispatch({
          type: STATE_LOADING_DONE,
          payload: {
            state,
          },
        });
      },
      error => {
        dispatch({
          type: STATE_LOADING_FAILED,
          payload: {
            error,
          },
        });
      }
    );
  };

  return next => action => {
    !middleware.isLoadExecuted && handleLoad();
    return next(action);
  };
};

export default middleware;
