import r2wc from '@r2wc/react-to-web-component';
import type { IJsonModel } from 'flexlayout-react';
import React from 'react';
import { FlexLayout } from '../../ui/third-party/flexlayout';

// Note: We cannot import CSS as strings in type-only builds; inject minimal styles instead.
const lightCss = `:host{display:block}.flexlayout__layout{inset:0}`;
const darkCss = lightCss;

React;

type FlexLayoutWrapperProps = {
  modelJson: IJsonModel;
  className?: string;
  theme?: 'light' | 'dark';
};

const FlexLayoutWrapper = ({ modelJson, className, theme = 'light' }: FlexLayoutWrapperProps) => {
  const css = theme === 'dark' ? darkCss : lightCss;
  const mergedClass = className ? `${className} flexlayout-host` : 'flexlayout-host';
  return (
    <div
      className={mergedClass}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}
    >
      <style>{css}</style>
      <FlexLayout
        modelJson={modelJson}
        className='flexlayout-container'
        // factory={(node) => {
        //   const comp = (node as any).getComponent?.()
        //   if (comp === 'actions') {
        //     return (
        //       <div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        //         <ui-button variant="default">WC Default</ui-button>
        //         <ui-button variant="secondary">WC Secondary</ui-button>
        //         <ui-button variant="destructive">WC Delete</ui-button>
        //       </div>
        //     )
        //   }
        //   return <div style={{ padding: 12 }}>{(node as any).getName?.()}</div>
        // }}
      />
    </div>
  );
};

export const FlexLayoutWebComponent = r2wc(FlexLayoutWrapper, {
  props: {
    modelJson: 'json',
    className: 'string',
    theme: 'string',
  },
  // Note: render in light DOM so global CSS can style it in the showcase
  shadow: undefined,
});

if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('ui-flexlayout')) {
    customElements.define(
      'ui-flexlayout',
      FlexLayoutWebComponent as unknown as CustomElementConstructor
    );
  }
}
