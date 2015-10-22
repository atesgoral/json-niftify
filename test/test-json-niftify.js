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

