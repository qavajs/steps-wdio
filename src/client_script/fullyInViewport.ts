export default function isElementFullyInViewport(elem: HTMLElement): boolean {
    if (!elem.getBoundingClientRect) {
        return false
    }

    const rect = elem.getBoundingClientRect();

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const fullyVerticallyInViewport =
        rect.top >= 0 && rect.bottom <= windowHeight;

    const fullyHorizontallyInViewport =
        rect.left >= 0 && rect.right <= windowWidth;

    return fullyVerticallyInViewport && fullyHorizontallyInViewport
}
