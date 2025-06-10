import { locator } from '../../src';

export default class App {
    SimpleTextElement = locator('#textValue');
    SimpleTextElementTemplate = locator.template(selector => selector)
    SimpleTextElementNative = locator.native(({ browser }) => browser.$('#textValue'))
    SimpleTextListItems = locator(`#textValueList li`);
    SimpleTextListItemByIndex = locator.template(idx => `#textValueList li:nth-child(${idx})`);
    SimpleTextListItemByText = locator.template(text => `//ul[@id="textValueList"]/li[contains(., "${text}")]`);
    SimpleTextInput = locator('#textInput');
    FileInput = locator('#fileInput');

    Action = locator('#action');
    AlertButton = locator('#confirm');
    PromptButton = locator('#prompt');
    Button = locator('#button');
    ButtonDynamic = locator.template(selector => selector);
    ButtonNative = locator.native(({ driver}) => driver.$('#button'));
    ButtonHover = locator('#buttonHover');
    Input = locator('#input');
    Select = locator('#select');
    Buttons = locator('.button')

    FrameElement = locator('#frameElement');

    NewTabLink = locator('#newTabLink');

    PresentElement = locator('#present');
    PresentCollection = locator('#present');
    DetachElement = locator('#detach');
    VisibleElement = locator('#visible');
    HiddenElement = locator('#hidden');
    NotExistingElement = locator('#notExistingElement');
    EmptyCollection = locator('#emptyCollection');

    Loading = locator('#loading');
    LoadingInput = locator('#loadingInput');
    WaitCollection = locator('#waitCollection > div');

    ScrollElement = locator('#scrollElement');

    PressCounter = locator('#pressCounter');

    KeyDump = locator('#keywordevent');

    Users = locator('#users > li');

    OverflowContainer = locator('#overflowContainer');
    ContentEditableText = locator('#contentEditable');

    Cookie = locator('#cookie');
    LocalStorage = locator('#localStorage');
    SessionStorage = locator('#sessionStorage');

    DropZone = locator('div#div1');
    DragElement = locator('div#drag1');
    DragElementInDropZone = locator('div#div1 div#drag1');

    EventHandler = locator('#mouseEvent');
    KeyboardEventHandler = locator('#keyboardEvent');
    InfiniteScroll = locator('#infiniteScroll');
    InfiniteScrollItems = locator('#infiniteScroll li');
    InfiniteScrollItemByIndex = locator.template(idx => `#infiniteScroll li:nth-child(${idx})`);

    PseudoRandomText = locator('#randomText');
    RandomlyDisabledButton = locator('#isDisabledButton');
    FlipCoin = locator('#flipCoin');
    Coin= locator('#coin');
    DigitInput = locator('#digitInput');
    PlusButton = locator('#plusButton');

    BodyComponent = locator('body').as(BodyComponent);
    BodyComponentTemplate = locator.template((selector: string) => selector).as(BodyComponent);
    BodyComponentNative = locator.native(({ browser }) => browser.$('body')).as(BodyComponent);

    TopLevelComponent = locator.as(BodyComponent);
    NotExistingComponent = locator('#not-existingComponent').as(BodyComponent);

    defaultResolver({ alias }: { alias: string }) {
        return ({ parent }: { parent: any }) => parent.$(`//*[text()="${alias}"]`);
    }
}

class BodyComponent {
    TextElement = locator('#textValue');
}
