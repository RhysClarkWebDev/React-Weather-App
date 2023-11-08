import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


const rootElement = document.getElementById('root')



if (rootElement !== null) {
    const root = createRoot(rootElement)

    root.render(
        <App />
    )
} else {
    console.error('Element with ID "root" not found.')
}
