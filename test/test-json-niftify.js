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

exports.testArrayWithTooManyItems = function (test) {
    test.strictEqual(niftify(
[
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11
]
    ),
`[
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11
]`
    );
    test.done();
};

exports.testArrayWithTooManyProps = function (test) {
    test.strictEqual(niftify(
{
  "a": 1,
  "b": 2,
  "c": 3,
  "d": 4,
  "e": 5,
  "f": 6
}
    ),
`{
  "a": 1,
  "b": 2,
  "c": 3,
  "d": 4,
  "e": 5,
  "f": 6
}`
    );
    test.done();
};

exports.testArrayWithTooManyColumns = function (test) {
    test.strictEqual(niftify(
[
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789"
]
    ),
`[
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789",
  "0123456789"
]`
    );
    test.done();
};

exports.testObjectWithTooManyColumns = function (test) {
    test.strictEqual(niftify(
{
  "a": 1234567890123,
  "b": 1234567890123,
  "c": 1234567890123,
  "d": 1234567890123
}
    ),
`{
  "a": 1234567890123,
  "b": 1234567890123,
  "c": 1234567890123,
  "d": 1234567890123
}`
    );
    test.done();
};
