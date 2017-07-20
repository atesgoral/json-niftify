var niftify = require('../index');

exports.testUndefined = function (test) {
    test.strictEqual(niftify(
undefined
    ),
undefined
    );
    test.done();
};

exports.testNull = function (test) {
    test.strictEqual(niftify(
null
    ),
`null`
    );
    test.done();
};

exports.testNumber = function (test) {
    test.strictEqual(niftify(
42
    ),
`42`
    );
    test.done();
};

exports.testString = function (test) {
    test.strictEqual(niftify(
"A"
    ),
`"A"`
    );
    test.done();
};

exports.testBoolean = function (test) {
    test.strictEqual(niftify(
true
    ),
`true`
    );
    test.strictEqual(niftify(
false
    ),
`false`
    );
    test.done();
};

exports.testPrimitiveArray = function (test) {
    test.strictEqual(niftify(
[ 42, "A" ]
    ),
`[ 42, "A" ]`
    );
    test.done();
};

exports.testPrimitveObject = function (test) {
    test.strictEqual(niftify(
{ "0": "A", "B": 42 }
    ),
`{ "0": "A", "B": 42 }`
    );
    test.done();
};

exports.testComplexArray = function (test) {
    test.strictEqual(niftify(
[
  42,
  { "a": "A" }
]
    ),
`[
  42,
  { "a": "A" }
]`
    );
    test.done();
};

exports.testComplexObject = function (test) {
    test.strictEqual(niftify(
{
  "0": "A",
  "B": { "b": 42 }
}
    ),
`{
  "0": "A",
  "B": { "b": 42 }
}`
    );
    test.done();
};

// exports.testMaxColumns = function (test) {
//     test.strictEqual(niftify([ 42, 'A' ], { maxColumns: 8 }), '[\n  42,\n  "A"\n]');
//     test.done();
// };
