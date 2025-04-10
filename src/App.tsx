import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

// Import our regular Button component
import { Button } from './components/ui/button'

// Import the web component for registration
import './components/ui/button-wc'

// Import the TailwindTest component to verify Tailwind is working
import TailwindTest from './TailwindTest'

function App() {
  const [count, setCount] = useState(0)
  const [wcClicks, setWcClicks] = useState(0)
  const webButtonRef = useRef<HTMLElement | null>(null)
  const listenerAttachedRef = useRef(false)
  
  const handleReactButtonClick = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  // Handle click for web component
  const handleWcClick = useCallback(() => {
    setWcClicks(prev => prev + 1)
  }, [])
  
  // Set up the web component reference and event listener - run once on mount
  useEffect(() => {
    const container = document.querySelector('.wc-container')
    if (container) {
      // Clear any previous content
      container.innerHTML = ''
      
      // Create the web component
      const webButton = document.createElement('ui-button')
      webButton.setAttribute('variant', 'default') // Use default variant like React button
      webButton.setAttribute('size', 'default')
      webButtonRef.current = webButton
      
      // Add the event listener (only once)
      if (!listenerAttachedRef.current) {
        webButton.addEventListener('click', handleWcClick)
        listenerAttachedRef.current = true
      }
      
      // Initial text content - match the React button's text
      webButton.textContent = `Button (Clicked: ${wcClicks})`
      
      // Append to the container
      container.appendChild(webButton)
    }
    
    // Clean up on unmount
    return () => {
      if (webButtonRef.current) {
        webButtonRef.current.removeEventListener('click', handleWcClick)
        webButtonRef.current = null
        listenerAttachedRef.current = false
      }
    }
  }, [handleWcClick, wcClicks]); // Added wcClicks dependency
  
  // Separate effect to update text content when wcClicks changes
  useEffect(() => {
    if (webButtonRef.current) {
      webButtonRef.current.textContent = `Button (Clicked: ${wcClicks})`
    }
  }, [wcClicks])

  // Array of button variants to display
  const variants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link"
  ] as const

  return (
    <div className="container">
      <h1>React Web Components Demo</h1>
      
      {/* Tailwind Test Component */}
      <TailwindTest />
      
      <div className="web-component-demo">
        <h2>Button Comparison - Click Counter</h2>        
        <div className="button-comparison">
          <div className="demo-card">
            <h3>React Button</h3>
            <Button 
              variant="default" 
              onClick={handleReactButtonClick}
            >
              Button (Clicked: {count})
            </Button>
          </div>
          
          <div className="demo-card">
            <h3>Web Component Button</h3>
            <div className="wc-container"></div>
          </div>
        </div>

        <h2 className="mt-8">Button Variants</h2>
        <div className="variant-grid">
          {variants.map(variant => (
            <div key={variant} className="variant-comparison">
              <h3>{variant}</h3>
              <div className="buttons">
                <div>
                  <p>React</p>
                  <Button variant={variant}>
                    {variant}
                  </Button>
                </div>
                <div>
                  <p>Web Component</p>
                  <ui-button variant={variant}>{variant}</ui-button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App


