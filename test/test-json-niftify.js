var niftify = require('../index');

exports.testSerializeUndefined = function (test) {
    test.strictEqual(niftify(undefined), undefined);
    test.done();
};

exports.testSerializeNull = function (test) {
    test.strictEqual(niftify(null), 'null');
    test.done();
};

exports.testSerializeNumber = function (test) {
    test.strictEqual(niftify(42), '42');
    test.done();
};

exports.testSerializeString = function (test) {
    test.strictEqual(niftify('A'), '"A"');
    test.done();
};

exports.testSerializeBoolean = function (test) {
    test.strictEqual(niftify(true), 'true');
    test.strictEqual(niftify(false), 'false');
    test.done();
};

exports.testSerializeSingleLineArray = function (test) {
    test.strictEqual(niftify([ 42, 'A' ]), '[ 42, "A" ]');
    test.done();
};

exports.testSerializeSingleLineObject = function (test) {
    test.strictEqual(niftify({ '0': 'A', B: 42 }), '{ "0": "A", "B": 42 }');
    test.done();
};

exports.testSerializeMultiLineArray = function (test) {
    test.strictEqual(niftify([ 42, 'A' ], { forceMultiLineArray: true, indent: '  ' }), '[\n  42,\n  "A"\n]');
    test.done();
};
