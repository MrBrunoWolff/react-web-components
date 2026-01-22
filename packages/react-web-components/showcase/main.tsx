import { createRoot } from 'react-dom/client';

// Import CSS that includes Tailwind utilities for React components
import '../src/index.css';

// Import our WC components directly from source to register them
import '../src/components/wc-ui/button';
import '../src/components/wc-ui/third-party/flexlayout';

import type { IJsonModel } from 'flexlayout-react';
// React components
import { Button } from '../src/components/ui/button';
import { FlexLayout } from '../src/components/ui/third-party/flexlayout';

// Build a sample FlexLayout model with a few tabs, to demo drag/drop
const modelReact: IJsonModel = {
  global: {},
  borders: [],
  layout: {
    type: 'row',
    children: [
      {
        type: 'tabset',
        children: [
          { type: 'tab', name: 'Welcome (react)', component: 'welcome' },
          { type: 'tab', name: 'Info (react)', component: 'info' },
        ],
      },
      {
        type: 'tabset',
        children: [{ type: 'tab', name: 'Chart (react)', component: 'chart' }],
      },
    ],
  },
};

// Mount React Button
{
  const el = document.getElementById('button-react');
  if (!el) throw new Error('button-react element not found');
  const root = createRoot(el);
  root.render(
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant='default'>Default</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='destructive'>Delete</Button>
    </div>
  );
}

// Initialize WC Button (already in HTML) – nothing to do, but can access:
{
  const wcBtn = document.getElementById('button-wc') as HTMLElement;
  wcBtn?.addEventListener('click', () => {});
}

// Mount React FlexLayout
{
  const el = document.getElementById('flex-react');
  if (!el) throw new Error('flex-react element not found');
  const root = createRoot(el);
  root.render(
    <div style={{ height: '100%', width: '100%', minHeight: 400, display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <FlexLayout modelJson={modelReact} />
      </div>
    </div>
  );
}

// Initialize WC FlexLayout
{
  const wc = document.getElementById('flex-wc') as HTMLElement & { modelJson?: unknown };
  if (wc) {
    const modelWc: IJsonModel = {
      global: {},
      borders: [],
      layout: {
        type: 'row',
        children: [
          {
            type: 'tabset',
            children: [
              { type: 'tab', name: 'Welcome (wc)', component: 'welcome' },
              { type: 'tab', name: 'Info (wc)', component: 'info' },
            ],
          },
          {
            type: 'tabset',
            children: [{ type: 'tab', name: 'Chart (wc)', component: 'chart' }],
          },
        ],
      },
    };
    // assign clone to avoid shared reference
    wc.modelJson = modelWc;
    wc.theme = 'light';
    wc.className = 'flexlayout-host';
  }
}
