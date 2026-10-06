/**
 * Import all styles required for web components and export the components
 * This is the main entry point for the library
 */

// Core styles
import { installWebComponentStyles } from './lib/wc-styles';

// Import components
import {
  ButtonWebComponent,
  FlexLayoutWebComponent,
  registerAllComponents,
} from './index';

// Export components
export { ButtonWebComponent, FlexLayoutWebComponent, registerAllComponents };

// Auto-register components
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  installWebComponentStyles();
  registerAllComponents();
}
