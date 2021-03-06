'use strict';

function astify(v, context) {
  let ast = null;

  if (v instanceof Array) {
    ast = {
      items: v.map((v) => astify(v, context))
    };
    ast.isPrimitive = ast.items.every((item) => typeof item === 'string');
    return ast;
  } else if (v instanceof Object) {
    ast = {
      props: Object.keys(v).map((key) => Object.assign({ key, context }, { val: astify(v[key]) }))
    };
    ast.isPrimitive = ast.props.every((prop) => typeof prop.val === 'string');
    return ast;
  } else {
    return JSON.stringify(v);
  }
}

function stringifyItemsSingleLine(items) {
  return items.join(', ');
}

function stringifyItemsMultiLine(items, context) {
  return context.indentation + items
    .map((item) => stringify(item, context))
    .join(',\n' + context.indentation);
}

function stringifyPropsSingleLine(props) {
  return props.map((prop) => `${JSON.stringify(prop.key)}: ${prop.val}`).join(', ');
}

function stringifyPropsMultiLine(props, context) {
  return context.indentation + props
    .map((prop) => `${JSON.stringify(prop.key)}: ${stringify(prop.val, context)}`)
    .join(',\n' + context.indentation);
}

function stringifyArray(ast, context) {
  if (ast.isPrimitive && context.config.maxItems && ast.items.length <= context.config.maxItems) {
    const singleLine = `[ ${stringifyItemsSingleLine(ast.items)} ]`;

    if (singleLine.length + (context.parent ? context.parent.indentation.length : 0) <= context.config.maxColumns) {
      return singleLine;
    }
  }

  const childContext = Object.assign(
    {},
    context,
    {
      parent: context,
      indentation: context.indentation + context.config.indentation
    }
  );

  return `[
${stringifyItemsMultiLine(ast.items, childContext)}
${context.indentation}]`;
}

function stringifyObject(ast, context) {
  if (ast.isPrimitive && context.config.maxProps && ast.props.length <= context.config.maxProps) {
    const singleLine = `{ ${stringifyPropsSingleLine(ast.props)} }`;

    if (singleLine.length + (context.parent ? context.parent.indentation.length : 0) <= context.config.maxColumns) {
      return singleLine;
    }
  }

  const childContext = Object.assign(
    {},
    context,
    {
      parent: context,
      indentation: context.indentation + context.config.indentation
    }
  );

  return `{
${stringifyPropsMultiLine(ast.props, childContext)}
${context.indentation}}`;
}

function stringify(ast, context) {
  let singleLine = null;

  if (ast === undefined) {
    return;
  } else if (typeof ast === 'string') {
    return ast;
  } else if (ast.items) {
    return stringifyArray(ast, context);
  } else if (ast.props) {
    return stringifyObject(ast, context);
  }
}

function niftify(v, config) {
  return stringify(astify(v), { indentation: '', config });
}

const defaultConfig = {
  indentation: '  ',
  maxColumns: 80, // Set to 0 for unlimited
  maxItems: 10, // Set to 0 for unlimited
  maxProps: 5 // Set to 0 for unlimited
};

module.exports = function (v, config) {
  return niftify(v, Object.assign({}, defaultConfig, config));
};
