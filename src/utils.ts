const MODIFIER_KEYS = ['Control', 'Shift', 'Alt', 'Command', 'Ctrl'];

/**
 * Parse 'x, y' string to coordinates array
 * @param {string} coords - 'x, y' string
 * @return {number[]} - coords array
 */
export function parseCoords(coords: string): number[] {
    return coords.split(/\s?,\s?/).map((c: string) => parseFloat(c ?? 0))
}

/**
 * Parse 'x, y' string to coordinates object
 * @param {string} coords - 'x, y' string
 * @return {{x: number, y: number}} - coords object
 */
export function parseCoordsAsObject(coords: string): {x: number, y: number} {
    const [x, y] = coords.split(/\s?,\s?/).map((c: string) => parseFloat(c ?? 0));
    return { x, y }
}

function getKey(key: string) {
    if (key in Keys) { // @ts-ignore
        return Keys[key];
    }
    return key
}

export function parseKeySequence(sequence: string | string[]): string[] {
    // @ts-ignore
    if (sequence in Keys) return [Keys[sequence]];
    if (Array.isArray(sequence)) return sequence;
    if (MODIFIER_KEYS.some(key => sequence.includes(key))) return sequence.split('+').map(getKey);
    return sequence.split('');
}

export function equalOrIncludes(value: string | string[], argument: string) {
    return Array.isArray(value)
        ? value.includes(argument)
        : value === argument;
}

export function getEventValue(entity: any) {
    return entity?.event
        ? entity.event
        : entity;
}

export function isImmediate(validation: string) {
    return validation.includes('present') && validation.includes('not')
}

export function checkIfCollection(alias: string, collection: any) {
    if (!Array.isArray(collection)) {
        throw new Error(`${alias} is not collection`);
    }
}

export function dragAndDrop(source: Element, target: Element) {
    ({
        dragdrop: function (sourceElement: Element, targetElement: Element) {
            const CustomDataTransfer = function (this: any) {
                this.data = {};
            };

            CustomDataTransfer.prototype.dropEffect = `move`;
            CustomDataTransfer.prototype.effectAllowed = `all`;
            CustomDataTransfer.prototype.files = [];
            CustomDataTransfer.prototype.items = [];
            CustomDataTransfer.prototype.types = [];
            CustomDataTransfer.prototype.clearData = function (format: any) {
                if (format) {
                    delete this.data[format];

                    const index = this.types.indexOf(format);
                    delete this.types[index];
                    delete this.data[index];
                } else {
                    this.data = {};
                }
            };
            CustomDataTransfer.prototype.setData = function (format: any, data: any) {
                this.data[format] = data;
                this.items.push(data);
                this.types.push(format);
            };
            CustomDataTransfer.prototype.getData = function (format: any) {
                if (format in this.data) {
                    return this.data[format];
                }

                return ``;
            };
            CustomDataTransfer.prototype.setDragImage = function () {
            };

            const sourceCoordinates = sourceElement.getBoundingClientRect();
            const targetCoordinates = targetElement.getBoundingClientRect();
            const mouseDownEvent = this.createEvent(
                `mousedown`,
                {
                    clientX: sourceCoordinates.left,
                    clientY: sourceCoordinates.top
                }
            );
            sourceElement.dispatchEvent(mouseDownEvent);
            const dragStartEvent = this.createEvent(
                `dragstart`,
                {
                    clientX: sourceCoordinates.left,
                    clientY: sourceCoordinates.top,
                    // @ts-ignore
                    dataTransfer: new CustomDataTransfer()
                }
            );
            sourceElement.dispatchEvent(dragStartEvent);
            const dragEvent = this.createEvent(
                `drag`,
                {
                    clientX: sourceCoordinates.left,
                    clientY: sourceCoordinates.top
                }
            );
            sourceElement.dispatchEvent(dragEvent);
            const dragEnterEvent = this.createEvent(
                `dragenter`,
                {
                    clientX: targetCoordinates.left,
                    clientY: targetCoordinates.top,
                    // @ts-ignore
                    dataTransfer: dragStartEvent.dataTransfer
                }
            );
            targetElement.dispatchEvent(dragEnterEvent);
            const dragOverEvent = this.createEvent(
                `dragover`,
                {
                    clientX: targetCoordinates.left,
                    clientY: targetCoordinates.top,
                    // @ts-ignore
                    dataTransfer: dragStartEvent.dataTransfer
                }
            );
            targetElement.dispatchEvent(dragOverEvent);
            const dropEvent = this.createEvent(
                `drop`,
                {
                    clientX: targetCoordinates.left,
                    clientY: targetCoordinates.top,
                    // @ts-ignore
                    dataTransfer: dragStartEvent.dataTransfer
                }
            );
            targetElement.dispatchEvent(dropEvent);
            const dragEndEvent = this.createEvent(
                `dragend`,
                {
                    clientX: targetCoordinates.left,
                    clientY: targetCoordinates.top,
                    // @ts-ignore
                    dataTransfer: dragStartEvent.dataTransfer
                }
            );
            sourceElement.dispatchEvent(dragEndEvent);
            const mouseUpEvent = this.createEvent(
                `mouseup`,
                {
                    clientX: targetCoordinates.left,
                    clientY: targetCoordinates.top
                }
            );
            targetElement.dispatchEvent(mouseUpEvent);
        },

        createEvent: function (eventName: string, options: any) {
            const event: any = document.createEvent(`CustomEvent`);
            event.initCustomEvent(eventName, true, true, null);

            event.view = window;
            event.detail = 0;
            event.ctlrKey = false;
            event.altKey = false;
            event.shiftKey = false;
            event.metaKey = false;
            event.button = 0;
            event.relatedTarget = null;

            if (options.clientX && options.clientY) {
                event.screenX = window.screenX + options.clientX;
                event.screenY = window.screenY + options.clientY;
            }

            for (const prop in options) {
                event[prop] = options[prop];
            }

            return event;
        }
    }).dragdrop(source, target);
}

export enum Keys {
    Ctrl = "WDIO_CONTROL",
    NULL = "",
    Cancel = "",
    Help = "",
    Backspace = "",
    Tab = "",
    Clear = "",
    Return = "",
    Enter = "",
    Shift = "",
    Control = "",
    Alt = "",
    Pause = "",
    Escape = "",
    Space = "",
    PageUp = "",
    PageDown = "",
    End = "",
    Home = "",
    ArrowLeft = "",
    ArrowUp = "",
    ArrowRight = "",
    ArrowDown = "",
    Insert = "",
    Delete = "",
    Semicolon = "",
    Equals = "",
    Numpad0 = "",
    Numpad1 = "",
    Numpad2 = "",
    Numpad3 = "",
    Numpad4 = "",
    Numpad5 = "",
    Numpad6 = "",
    Numpad7 = "",
    Numpad8 = "",
    Numpad9 = "",
    Multiply = "",
    Add = "",
    Separator = "",
    Subtract = "",
    Decimal = "",
    Divide = "",
    F1 = "",
    F2 = "",
    F3 = "",
    F4 = "",
    F5 = "",
    F6 = "",
    F7 = "",
    F8 = "",
    F9 = "",
    F10 = "",
    F11 = "",
    F12 = "",
    Command = "",
    ZenkakuHankaku = ""
}

/**
 * Class represents virtual mouse pointer to support actions
 */
class VirtualPointer {
    origin: WebdriverIO.Element | 'viewport' = 'viewport';
    x: number = 0;
    y: number = 0;

    hover(element: WebdriverIO.Element) {
        this.origin = element;
        this.x = 0;
        this.y = 0;
    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    pointer() {
        return {
            origin: this.origin,
            x: this.x,
            y: this.y
        }
    }
    wheel() {
        return {
            origin: typeof this.origin !== 'string' ? this.origin : undefined,
            x: this.x,
            y: this.y
        }
    }
}

export const virtualPointer = new VirtualPointer();