var niftify = require('../index');

exports.testUndefined = function (test) {
    test.strictEqual(niftify(undefined), undefined);
    test.done();
};

exports.testNull = function (test) {
    test.strictEqual(niftify(null), 'null');
    test.done();
};

exports.testNumber = function (test) {
    test.strictEqual(niftify(42), '42');
    test.done();
};

exports.testString = function (test) {
    test.strictEqual(niftify('A'), '"A"');
    test.done();
};

exports.testBoolean = function (test) {
    test.strictEqual(niftify(true), 'true');
    test.strictEqual(niftify(false), 'false');
    test.done();
};

exports.testSingleLineArray = function (test) {
    test.strictEqual(niftify([ 42, 'A' ]), '[ 42, "A" ]');
    test.done();
};

exports.testSingleLineObject = function (test) {
    test.strictEqual(niftify({ '0': 'A', B: 42 }), '{ "0": "A", "B": 42 }');
    test.done();
};

exports.testForceMultiLineArray = function (test) {
    test.strictEqual(niftify([ 42, 'A' ], { forceMultiLineArray: true }), '[\n  42,\n  "A"\n]');
    test.done();
};

exports.testForceMultiLineObject = function (test) {
    test.strictEqual(niftify({ '0': 'A', B: 42 }, { forceMultiLineObject: true }), '{\n  "0": "A",\n  "B": 42\n}');
    test.done();
};

// exports.testColumnLimit = function (test) {
//     test.strictEqual(niftify([ 42, 'A' ], { maxColumns: 8 }), '[\n  42,\n  "A"\n]');
//     test.done();
// };
