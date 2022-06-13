import { expect } from 'chai';
export const validations = {
    EQUAL: 'equal',
    BE_EQUAL_TO: 'be equal to',
    HAVE_MEMBERS: 'have members of',
    MATCH: 'match',
    CONTAIN: 'contain'
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
        case validations.BE_EQUAL_TO: expectClause.eql(ER); break;
        case validations.HAVE_MEMBERS: expectClause.have.members(ER); break;
        case validations.MATCH: expectClause.match(ER); break;
        case validations.CONTAIN: expectClause.contain(ER); break;
    }
}
