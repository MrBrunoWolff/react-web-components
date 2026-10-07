import theme from '../index.css?inline';
import colors from '../colors.css?inline';
import wrappers from '../styles/wc-theme.css?inline';

export function installWebComponentStyles() {
  if (
    typeof document === 'undefined' ||
    document.getElementById('react-web-components-theme')
  )
    return;
  const style = document.createElement('style');
  style.id = 'react-web-components-theme';
  style.textContent = `${theme}\n${colors}\n${wrappers}`;
  document.head.appendChild(style);
}
