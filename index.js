function niftify(v) {
    return JSON.stringify(v);
}

module.exports = function (v) {
    return niftify(v);
};
