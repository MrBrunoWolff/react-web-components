// Import our React-based Web Components and required styles
import '@mrbrunowolff/react-web-components';
import '@mrbrunowolff/react-web-components/styles/flexlayout-light.css';

// FlexLayout model configuration
const flexLayoutModel = {
  global: {
    tabEnableClose: true,
    tabEnableRename: false,
  },
  borders: [],
  layout: {
    type: 'row',
    children: [
      {
        type: 'tabset',
        children: [
          {
            type: 'tab',
            name: 'WC Panel 1',
            component: 'panel',
            config: { text: 'This is panel 1 content in Web Components' },
          },
          {
            type: 'tab',
            name: 'WC Panel 2',
            component: 'panel',
            config: { text: 'This is panel 2 content in Web Components' },
          },
        ],
      },
      {
        type: 'tabset',
        children: [
          {
            type: 'tab',
            name: 'WC Panel 3',
            component: 'panel',
            config: { text: 'This is panel 3 content in Web Components' },
          },
        ],
      },
    ],
  },
};

// Initialize FlexLayout
document.addEventListener('DOMContentLoaded', () => {
  const wcLayout = document.getElementById('wc-layout') as HTMLElement & { modelJson?: unknown };
  if (wcLayout) {
    wcLayout.modelJson = flexLayoutModel;
  }
});
