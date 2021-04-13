const getIdParam = (req) => {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new Error(`Invalid ':id' param: "${id}"`);
};

const asyncHandler = (fn) =>
  function asyncHandlerWrap(...args) {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

module.exports = module.exports = { getIdParam, asyncHandler };
