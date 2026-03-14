export default function getAriaSnapshot(rootSelector) {
    /**
     * Maps an HTML tag + ARIA role to a readable role name.
     */
    function getRole(el) {
      const explicitRole = el.getAttribute('role');
      if (explicitRole) return explicitRole;

      const tag = el.tagName.toLowerCase();
      const type = (el.getAttribute('type') || '').toLowerCase();

      const roleMap = {
        a: el.hasAttribute('href') ? 'link' : null,
        button: 'button',
        h1: 'heading', h2: 'heading', h3: 'heading',
        h4: 'heading', h5: 'heading', h6: 'heading',
        img: 'img',
        input: {
          checkbox: 'checkbox',
          radio: 'radio',
          text: 'textbox',
          email: 'textbox',
          search: 'searchbox',
          tel: 'textbox',
          url: 'textbox',
          password: 'textbox',
          number: 'spinbutton',
          range: 'slider',
          submit: 'button',
          reset: 'button',
          button: 'button',
        }[type] || 'textbox',
        select: 'combobox',
        textarea: 'textbox',
        nav: 'navigation',
        main: 'main',
        header: 'banner',
        footer: 'contentinfo',
        aside: 'complementary',
        section: 'region',
        form: 'form',
        table: 'table',
        tr: 'row',
        th: 'columnheader',
        td: 'cell',
        ul: 'list',
        ol: 'list',
        li: 'listitem',
        dialog: 'dialog',
        details: 'group',
        summary: 'button',
        menu: 'menu',
        menuitem: 'menuitem',
        figure: 'figure',
        article: 'article',
        blockquote: 'blockquote',
        code: 'code',
        progressbar: 'progressbar',
      };

      return roleMap[tag] || null;
    }

    /**
     * Gets the accessible name for an element.
     */
    function getAccessibleName(el) {
      // aria-label takes highest priority
      if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');

      // aria-labelledby
      const labelledBy = el.getAttribute('aria-labelledby');
      if (labelledBy) {
        const label = labelledBy.split(' ')
          .map(id => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean)
          .join(' ');
        if (label) return label;
      }

      // <label> for input elements
      if (el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label) return label.textContent.trim();
      }

      // alt for images
      if (el.tagName.toLowerCase() === 'img') return el.getAttribute('alt') || '';

      // placeholder for inputs
      if (el.getAttribute('placeholder')) return el.getAttribute('placeholder');

      // title attribute
      if (el.getAttribute('title')) return el.getAttribute('title');

      // value for buttons/submits
      const tag = el.tagName.toLowerCase();
      const type = (el.getAttribute('type') || '').toLowerCase();
      if (tag === 'input' && ['submit', 'reset', 'button'].includes(type)) {
        return el.value || '';
      }

      return null;
    }

    /**
     * Determines if an element is hidden from the accessibility tree.
     */
    function isHidden(el) {
      if (el.getAttribute('aria-hidden') === 'true') return true;
      if (el.getAttribute('hidden') !== null) return true;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return true;
      return false;
    }

    /**
     * Recursively builds the ARIA tree as a list of lines.
     */
    function buildTree(el, depth = 0) {
      if (isHidden(el)) return [];

      const lines = [];
      const indent = '  '.repeat(depth);
      const role = getRole(el);
      const name = getAccessibleName(el);
      const tag = el.tagName.toLowerCase();

      // Collect extra properties
      const props = [];
      if (el.getAttribute('aria-checked') !== null)
        props.push(`checked: ${el.getAttribute('aria-checked')}`);
      if (el.getAttribute('aria-selected') !== null)
        props.push(`selected: ${el.getAttribute('aria-selected')}`);
      if (el.getAttribute('aria-expanded') !== null)
        props.push(`expanded: ${el.getAttribute('aria-expanded')}`);
      if (el.getAttribute('aria-disabled') === 'true' || el.disabled)
        props.push('disabled: true');
      if (el.getAttribute('aria-required') === 'true' || el.required)
        props.push('required: true');
      if (el.getAttribute('aria-level'))
        props.push(`level: ${el.getAttribute('aria-level')}`);

      // Heading level from tag
      const headingMatch = tag.match(/^h([1-6])$/);
      if (headingMatch && !el.getAttribute('aria-level'))
        props.push(`level: ${headingMatch[1]}`);

      if (role) {
        let line = `${indent}- ${role}`;
        if (name) line += ` "${name}"`;
        if (props.length) line += ` [${props.join(', ')}]`;
        lines.push(line);

        // Add text content for leaf-like roles
        const leafRoles = ['link', 'button', 'heading', 'listitem', 'cell', 'columnheader'];
        if (leafRoles.includes(role) && !name) {
          const text = el.textContent.trim();
          if (text) lines[lines.length - 1] += ` "${text}"`;
        }
      }

      // Recurse into children
      const childDepth = role ? depth + 1 : depth;
      for (const child of el.children) {
        lines.push(...buildTree(child, childDepth));
      }

      // If no role but has direct text and no children — surface as text node
      if (!role && el.children.length === 0) {
        const text = el.textContent.trim();
        if (text) lines.push(`${indent}- text "${text}"`);
      }

      return lines;
    }

    const root = document.querySelector(rootSelector);
    if (!root) throw new Error(`Element not found: ${rootSelector}`);

    const lines = buildTree(root, 0);
    return lines.join('\n');
  }