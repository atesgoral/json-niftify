const context = {
  create: function (props) {
    return Object.assign({}, this, props);
  },
  indent: function () {
    return Object.assign({}, this, {
      indentation: this.indentation + this.config.indentation
    });
  },
  singleLine: function () {
    return Object.assign({}, this, {
      singleLine: true
    });
  }
};

// If single line array/object, item values should be forced to be single line

function isSingleLineArray(v, context) {
  if (context.config.forceMultiLineArray) {
    return false;
  }

  return true;
}

function isSingleLineObject(v, context) {
  if (context.config.forceMultiLineObject) {
    return false;
  }

  return true;
}

function singleLineArrayContents(v, context) {
  return ' ' + v.map((v) => niftify(v, context)).join(', ') + ' ';
}

function multiLineArrayContents(v, context) {
  return '\n' + context.indentation + v.map((v) => niftify(v, context)).join(',\n' + context.indentation ) + '\n'
}

function kvPair(k, v, context) {
  return JSON.stringify(k) + ': ' + niftify(v, context);
}

function singleLineObjectContents(v, context) {
  return ' ' + Object.keys(v).map((k) => kvPair(k, v[k], context)).join(', ') + ' ';
}

function multiLineObjectContents(v, context) {
  return '\n' + context.indentation + Object.keys(v).map((k) => kvPair(k, v[k], context)).join(',\n' + context.indentation ) + '\n'
}

function arrayContents(v, context) {
  if (!v.length) {
    return '';
  }

  const singleLineContents = singleLineArrayContents(v, context);

  // if (context.config.maxColumns) {
  //   if (singleLineContents.length + context.indentation.length <= context.config.maxColumns) {
  //     return singleLineContents;
  //   }
  // }

  return isSingleLineArray(v, context) // context.isSingleLineArray(v)?
    ? singleLineContents
    : multiLineArrayContents(v, context);
}

function objectContents(v, context) {
  if (!Object.keys(v).length) {
    return '';
  }

  const singleLineContents = singleLineObjectContents(v, context);

  // if (context.config.maxColumns) {
  //   if (singleLineContents.length + context.indentation <= context.config.maxColumns) {
  //     return singleLineContents;
  //   }
  // }

  return isSingleLineObject(v, context)
    ? singleLineContents
    : multiLineObjectContents(v, context);
}

function niftify(v, context) {
  if (v instanceof Array) {
    return '[' + arrayContents(v, context.indent()) + ']';
  } else if (v instanceof Object) {
    return '{' + objectContents(v, context.indent()) + '}';
  } else {
    return JSON.stringify(v);
  }
}

const defaultConfig = {
  indentation: '  '
};

module.exports = function (v, config) {
  return niftify(v, context.create({ config: Object.assign({}, defaultConfig, config), indentation: '' }));
};
