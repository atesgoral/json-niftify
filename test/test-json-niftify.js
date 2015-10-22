var niftify = require('../index');

exports.testSerializeNumber = function (test) {
    test.strictEqual(niftify(42), '42');
    test.done();
};
