function isSingleLineArray(v, context) {
    return true;
}

function isSingleLineObject(v, context) {
    return true;
}

function arrayContents(v, context) {
    if (!v.length) {
        return '';
    }

    return isSingleLineArray(v, context)
        ? ' ' + v.map(JSON.stringify).join(', ') + ' '
        : v.map(JSON.stringify).join(','); // @todo
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
        : Object.keys(v).map(kvPair).join(','); // @todo
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
    return niftify(v, { config: config, indentation: '' });
};
