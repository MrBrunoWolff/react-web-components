import {
  type Action,
  type IJsonModel,
  Layout,
  Model,
  type TabNode,
} from 'flexlayout-react';
import * as React from 'react';

export interface FlexLayoutProps {
  modelJson: IJsonModel;
  factory?: (node: TabNode) => React.ReactNode;
  onAction?: (action: Action) => Action | undefined;
  className?: string;
}

export function FlexLayout({
  modelJson,
  factory,
  onAction,
  className,
}: FlexLayoutProps) {
  const [model] = React.useState(() =>
    Model.fromJson(JSON.parse(JSON.stringify(modelJson))),
  );

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        minHeight: 400,
      }}
    >
      <Layout
        model={model}
        factory={(node) =>
          factory ? factory(node) : <div>{node.getName()}</div>
        }
        onAction={onAction}
      />
    </div>
  );
}

export default FlexLayout;
