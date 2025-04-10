/**
 * React Web Components Library
 * 
 * This is the main entry point for the library. 
 * Import from this file to use the web components in your application.
 */

// Import styles for the components
import './index.css';
import './colors.css';

// Import and re-export the Button Web Component
import { ButtonWebComponent } from './components/ui/button-wc';

// Export all web components
export {
  ButtonWebComponent
};

// Export a helper function to register all components
export function registerAllComponents() {
  // Make sure we're in a browser environment
  if (typeof window === 'undefined' || typeof customElements === 'undefined') {
    return;
  }
  
  // Register each component if it's not already registered
  if (!customElements.get('ui-button')) {
    customElements.define('ui-button', ButtonWebComponent);
  }
  
  // Add more component registrations here as they're added
}

// Auto-register components when imported directly via script tag
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  registerAllComponents();
} 