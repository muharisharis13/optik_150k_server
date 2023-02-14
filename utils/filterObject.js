const filterObject = (result, allowed) => {
  if (result && allowed) {
    return Object.keys(result)
      ?.filter((filter) => allowed?.includes(filter))
      .reduce((obj, key) => {
        obj[key] = result[key];

        return obj;
      }, {});
  }

  return;
};

module.exports = filterObject;
