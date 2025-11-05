import { motion } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import CustomScrollbar from '../components/CustomScrollbar'
import './Home.css'

const Home = ({ onProjectClick }) => {
  const projectsRef = useRef(null)

  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* PARTIE GAUCHE - Infos */}
      <motion.aside 
        className="home__sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="home__sidebar-content">
          <motion.h1 
            className="home__name"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            LUKAS
            <br />
            SCHREINER
          </motion.h1>
          
          <motion.div 
            className="home__info"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="home__description">
              <p>Portfolio de Lukas Schreiner</p>
              <p>Étudiant en développement web</p>
            </div>
            
            <nav className="home__nav">
              <ul>
                <li><a href="#about"><span>01</span> À propos</a></li>
                <li><a href="#contact"><span>02</span> Contact</a></li>
              </ul>
            </nav>
          </motion.div>
        </div>
      </motion.aside>

      {/* PARTIE DROITE - Projets */}
      <motion.main 
        ref={projectsRef}
        className="home__projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="home__projects-container">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </motion.main>

      {/* ✅ Scrollbar custom */}
      <CustomScrollbar containerRef={projectsRef} />
    </motion.div>
  )
}

export default Home