import r2wc from '@r2wc/react-to-web-component';
import type { IJsonModel } from 'flexlayout-react';
import { useEffect } from 'react';
import { FlexLayout } from '../../ui/third-party/flexlayout';
import { BrowserElement } from '../../../lib/browser-element';
import { installWebComponentStyles } from '../../../lib/wc-styles';
import lightCss from '../../../styles/flexlayout-light.css?inline';
import darkCss from '../../../styles/flexlayout-dark.css?inline';

type FlexLayoutWrapperProps = {
  modelJson: IJsonModel;
  className?: string;
  theme?: 'light' | 'dark';
};

const FlexLayoutWrapper = ({
  modelJson,
  className,
  theme = 'light',
}: FlexLayoutWrapperProps) => {
  useEffect(installWebComponentStyles, []);
  const css = theme === 'dark' ? darkCss : lightCss;
  const mergedClass = `flexlayout-host flexlayout-theme-${theme} ${className || ''}`;
  return (
    <div
      className={mergedClass}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '400px',
      }}
    >
      <style>{css}</style>
      <FlexLayout
        modelJson={modelJson}
        className="flexlayout-container"
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

export const FlexLayoutWebComponent =
  typeof HTMLElement === 'undefined'
    ? BrowserElement
    : r2wc(FlexLayoutWrapper, {
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
      FlexLayoutWebComponent as unknown as CustomElementConstructor,
    );
  }
}
