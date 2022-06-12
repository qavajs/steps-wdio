const { expect } = require('chai');
const validation = {
    EQUAL: 'equal',
    BE_EQUAL_TO: 'be equal to',
    HAVE_MEMBERS: 'have members of',
    MATCH: 'match',
    CONTAIN: 'contain'
}

function verify({validation, negate, er, ar}) {
    const expectClause = negate ? expect(ar).to.not : expect(ar).to;
    switch (validation) {
        case validation.EQUAL:
        case validation.BE_EQUAL_TO: expectClause.eql(er); break;
        case validation.HAVE_MEMBERS: expectClause.have.members(er); break;
        case validation.MATCH: expectClause.match(er); break;
        case validation.CONTAIN: expectClause.contain(er); break;
    }
}

module.exports = {
    verify,
    ...validation
}
