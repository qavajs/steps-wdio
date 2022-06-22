import { expect } from 'chai';
export const validations = {
    EQUAL: 'equal',
    EQUALS: 'equals',
    HAVE_MEMBERS: 'have members',
    MATCH: 'match',
    MATCHES: 'matches',
    CONTAIN: 'contain',
    CONTAINS: 'contains'
}

type VerifyInput = {
    AR: any,
    ER: any,
    validation: string,
    reverse: boolean
}

export function verify({AR, ER, validation, reverse}: VerifyInput) {
    const expectClause = reverse ? expect(AR).to.not : expect(AR).to;
    switch (validation) {
        case validations.EQUAL:
        case validations.EQUALS: expectClause.eql(ER); break;
        case validations.HAVE_MEMBERS: expectClause.have.members(ER); break;
        case validations.MATCHES:
        case validations.MATCH: expectClause.match(ER); break;
        case validations.CONTAINS:
        case validations.CONTAIN: expectClause.contain(ER); break;
        default: throw new Error(`validation '${validation}' is not supported`);
    }
}
