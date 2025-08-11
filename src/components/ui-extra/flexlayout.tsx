import * as React from "react"
import { Layout, Model, type IJsonModel, type TabNode } from "flexlayout-react"

export interface FlexLayoutProps {
  modelJson: IJsonModel
  factory?: (node: TabNode) => React.ReactNode
  onAction?: (action: unknown) => unknown
  className?: string
}

export function FlexLayout({ modelJson, factory, onAction, className }: FlexLayoutProps) {
  const [model] = React.useState(() => Model.fromJson(JSON.parse(JSON.stringify(modelJson))))

  return (
    <div
      className={className}
      style={{ position: "relative", height: "100%", width: "100%", minHeight: 400 }}
    >
      <Layout
        model={model}
        factory={(node) => (factory ? factory(node) : <div>{node.getName()}</div>)}
        onAction={onAction as any}
      />
    </div>
  )
}

export default FlexLayout


