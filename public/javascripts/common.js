const templateCompile = (str, params) => {
  if(params === undefined || params === null) {
    return str;
  }

  if (typeof params === 'object') {
    params = params || {};
    const replaceFn = function (key, value) {
      str = str.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'gi'), value);
    };
    $.each(params, function (key, value) {
      if (value === undefined) {
        value = '';
      }
      if (value !== null && typeof value === 'object') {
        $.each(value, function (_key, _value) {
          replaceFn(key + '.' + _key, _value);
        });
      } else {
        replaceFn(key, value);
      }
    });
    return str.replace(/\{\{\w+\}\}/g, '');
  } else {
    return str.replace(/\{\{\w+\}\}/g, params);
  }
};
