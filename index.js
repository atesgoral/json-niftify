var context = {
  create: function (props) {
    return Object.create(this, props);
  },
  indent: function () {
    return Object.create(this, {
      indentation: this.indentation + this.config.indent
    });
  },
  singleLine: function () {
    return Object.create(this, {
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
  return true;
}

function multiLineArrayContents(v, context) {
  //return
}

//[ + \ni(1),\ni(2)\n + ] context.indent(v)?

function arrayContents(v, context) {
  if (!v.length) {
    return '';
  }

  // return isSingleLineArray(v, context) // context.isSingleLineArray(v)?
  //     ? ' ' + v.map(JSON.stringify).join(', ') + ' '
  //     : v.map(JSON.stringify).join(',\n' + context.indentation ) + '\n' + context.indentation;
  return isSingleLineArray(v, context) // context.isSingleLineArray(v)?
    ? ' ' + v.map(JSON.stringify).join(', ') + ' '
    : v.map(JSON.stringify).join(',\n' + context.indentation ) + '\n' + context.indentation;

  context.singleLine()
  context.indent()
}

function objectContents(v, context) {
  function kvPair(key) {
    return '"' + key + '": ' + niftify(v[key], context);
  }

  if (!Object.keys(v).length) {
    return '';
  }

  return isSingleLineObject(v, context)
    ? ' ' + Object.keys(v).map(kvPair).join(', ') + ' '
    : Object.keys(v).map(kvPair).join(','); // @tod
}

function niftify(v, context) {
  if (v instanceof Array) {
    return '[' + arrayContents(v, context) + ']';
  } else if (v instanceof Object) {
    return '{' + objectContents(v, context) + '}';
  } else {
    return JSON.stringify(v);
  }
}

module.exports = function (v, config) {
  return niftify(v, context.create({ config: config || {}, indentation: '' }));
};
