/**
 * Import all styles required for web components and export the components
 * This is the main entry point for the library
 */

// Core styles
import './index.css';
import './colors.css';
import './styles/wc-theme.css';

// Import components
import { ButtonWebComponent, registerAllComponents } from './index';

// Export components
export { 
  ButtonWebComponent,
  registerAllComponents 
};

// Auto-register components
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  registerAllComponents();
} 