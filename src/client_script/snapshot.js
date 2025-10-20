export default function getSnapshot() {
    function getHtmlContent(document) {
        const removeNode = [
            'SCRIPT'
        ];
        const copyAttrsNode = [
            'INPUT',
            'BASE',
            'IMG',
            'LINK'
        ];
        const copyList = [
            'value',
            'href',
            'checked',
            'src'
        ];
        const doc = document.cloneNode(true);
        const elements = doc.querySelectorAll('*');
        for (const element of elements) {
            if (removeNode.includes(element.nodeName)) element.remove();
            if (copyAttrsNode.includes(element.nodeName)) {
                for (const prop in element) {
                    if (copyList.includes(prop) && element[prop] !== false) {
                        element.setAttribute(prop, element[prop])
                    }
                }
            }
        }
        const originalCanvases = document.querySelectorAll('canvas');
        Array.from(doc.querySelectorAll('canvas')).forEach((element, index) => {
            const imgData = originalCanvases[index].toDataURL();
            const parent = element.parentElement;
            const image = new Image();
            image.src = imgData;
            Array.from(element.attributes).forEach(attribute => {
                image.setAttribute(
                    attribute.nodeName === 'id' ? 'data-id' : attribute.nodeName,
                    attribute.nodeValue,
                );
            });
            parent.replaceChild(image, element);
        })
        return doc.children[0];
    }

    return getHtmlContent(document).outerHTML.replace(/[\n\t]/g, '')
}
