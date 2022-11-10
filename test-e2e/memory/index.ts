import { resolve } from 'path';
const file = (path: string) => `file://${path}`
export default class Memory {
    valuesPage = file(resolve('./test-e2e/apps/values.html'));
    actionsPage = file(resolve('./test-e2e/apps/actions.html'));
    framePage = file(resolve('./test-e2e/apps/frame.html'));
    waitsPage = file(resolve('./test-e2e/apps/waits.html'));
    scrollPage = file(resolve('./test-e2e/apps/scroll.html'));

    array = (...args: Array<any>) => args
}
