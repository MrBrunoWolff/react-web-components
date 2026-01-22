import { Button } from '@mrbrunowolff/react-web-components/components/ui/button';
import { FlexLayout } from '@mrbrunowolff/react-web-components/components/ui/third-party/flexlayout';

function App() {
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
              name: 'React Panel 1',
              component: 'panel',
              config: { text: 'This is panel 1 content in React' },
            },
            {
              type: 'tab',
              name: 'React Panel 2',
              component: 'panel',
              config: { text: 'This is panel 2 content in React' },
            },
          ],
        },
        {
          type: 'tabset',
          children: [
            {
              type: 'tab',
              name: 'React Panel 3',
              component: 'panel',
              config: { text: 'This is panel 3 content in React' },
            },
          ],
        },
      ],
    },
  };

  const factory = (node: { getConfig: () => { text?: string } | undefined }) => {
    const config = node.getConfig() || {};
    return <div style={{ padding: '20px' }}>{config.text || 'Empty panel'}</div>;
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>React Components Showcase</h1>
        <p>React components from our self-contained component library</p>
      </div>

      <div className='section'>
        <h2>Button Components</h2>
        <div className='button-showcase'>
          <Button variant='default'>Default</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='destructive'>Delete</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
        </div>
        <div className='button-showcase'>
          <Button size='sm'>Small</Button>
          <Button size='default'>Default</Button>
          <Button size='lg'>Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className='code-example'>
          {`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>`}
        </div>
      </div>

      <div className='section'>
        <h2>FlexLayout Component</h2>
        <div className='layout-container'>
          <FlexLayout modelJson={flexLayoutModel} factory={factory} />
        </div>
        <div className='code-example'>
          {`<FlexLayout 
  modelJson={model}
  factory={factory}
/>`}
        </div>
      </div>
    </div>
  );
}

export default App;
