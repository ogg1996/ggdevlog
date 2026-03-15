import { mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';

const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: element => element.getAttribute('id'),
        renderHTML: attributes => {
          if (!attributes.id) return {};
          return { id: attributes.id };
        }
      }
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      `h${node.attrs.level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ];
  }
});

export default CustomHeading;
