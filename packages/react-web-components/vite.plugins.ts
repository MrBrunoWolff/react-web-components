import postcss from 'postcss';
import type { Plugin } from 'vite';

// Scope the inline WC themes so light and dark layouts can coexist in light DOM.
// The public CSS files remain unscoped for React consumers that opt into them.
export function scopedFlexLayoutStyles(): Plugin {
  return {
    name: 'scope-flexlayout-themes',
    enforce: 'pre',
    transform(code, id) {
      const theme = id.match(/\/styles\/flexlayout-(light|dark)\.css\?inline/);
      if (!theme) return;
      const css = postcss.parse(code);
      css.walkRules((rule) => {
        rule.selectors = rule.selectors.map(
          (selector) => `.flexlayout-theme-${theme[1]} ${selector}`,
        );
      });
      return { code: css.toString(), map: null };
    },
  };
}
