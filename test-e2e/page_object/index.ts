import { $, $$ } from '@qavajs/po';
export default class App {
    SimpleTextElement = $('#textValue');
    SimpleTextListItems = $$('#textValueList li');
    SimpleTextInput = $('#textInput');
    FileInput = $('#fileInput');

    Action = $('#action');
    AlertButton = $('#confirm');
    PromptButton = $('#prompt');
    Button = $('#button');
    ButtonHover = $('#buttonHover');
    Input = $('#input');
    Select = $('#select');
    Buttons = $$('.button');

    FrameElement = $('#frameElement');

    NewTabLink = $('#newTabLink');

    PresentElement = $('#present');
    DetachElement = $('#detach');
    VisibleElement = $('#visible');
    HiddenElement = $('#hidden');
    NotExistingElement = $('#notExistingElement');
    EmptyCollection = $$('#emptyCollection');

    Loading = $('#loading');
    LoadingInput = $('#loadingInput');
    WaitCollection = $$('#waitCollection > div');

    ScrollElement = $('#scrollElement');

    PressCounter = $('#pressCounter');

    KeyDump = $('#keywordevent');

    Users = $$('#users > li');

    OverflowContainer = $('#overflowContainer');
    ContentEditableText = $('#contentEditable');

    IgnoreHierarchyComponent = $(new IgnoreHierarchyComponent());
    ComponentWithoutSelector = $(new ComponentWithoutSelector());

    Cookie = $('#cookie');
    LocalStorage = $('#localStorage');
    SessionStorage = $('#sessionStorage');

    DropZone = $('div#div1');
    DragElement = $('div#drag1');
    DragElementInDropZone = $('div#div1 div#drag1');
}

// @ts-ignore
class IgnoreHierarchyComponent {
    selector = '#ignoreHierarchyComponent';

    Input = $('#input', { ignoreHierarchy: true });
}

class ComponentWithoutSelector {
    Input = $('#input', { ignoreHierarchy: true });
}
