// Importing the package on a server must not evaluate a missing DOM global.
// The fallback is never registered: custom elements are only usable in a browser.
export const BrowserElement =
  typeof HTMLElement === 'undefined'
    ? (class {} as unknown as typeof HTMLElement)
    : HTMLElement;
