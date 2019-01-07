// do callback and get result as payload
export const invokeCallback = (callback, ...args) => ({
  type: 'app/invokeCallback',
  payload: callback && callback.call(null, ...args),
});

export const log = (data, type = 'table') => {
  console[type](data);
  return {
    type: 'app/log',
    payload: data,
  };
};

export const noop = explanation => ({
  type: 'app/noop',
  payload: explanation,
});

export const requestor = (type, ...args) => ({
  type,
  args,
});
