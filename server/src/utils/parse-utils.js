const parse = (data) => (data ? JSON.parse(data) : {});
const stringify = (data) => (data ? JSON.stringify(data) : '');

module.exports = { parse, stringify };
