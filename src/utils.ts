const MODIFIER_KEYS = ['Control', 'Shift', 'Alt', 'Command', 'Ctrl'];

/**
 * Parse 'x, y' string to coordinates array
 * @param {string} coords - 'x, y' string
 * @return {number[]} - coords array
 */
export function parseCoords(coords: string): number[] {
    return coords.split(/\s?,\s?/).map((c: string) => parseFloat(c ?? 0))
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
