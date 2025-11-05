import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home.jsx'
import ProjectOverlay from './components/ProjectOverlay'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <Router basename="/portfolio">
      <div className="App">
        <Home onProjectClick={setSelectedProject} />
        
        <AnimatePresence>
          {selectedProject && (
            <ProjectOverlay 
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
