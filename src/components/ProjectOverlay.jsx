import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './ProjectOverlay.css'

const ProjectOverlay = ({ project, onClose }) => {
  const contentRef = useRef(null) 

  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* NOM FLOTTANT EN HAUT À GAUCHE */}
      <motion.div
        className="overlay__floating-name"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          LUKAS
          <br />
          SCHREINER
        </motion.h1>
      </motion.div>

      {/* INFO STYLISÉE À GAUCHE */}
      <motion.div
        className="overlay__side-info"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="overlay__side-date"
          animate={{ rotate: [0, 5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="date-label">DATE</span>
          <span className="date-value">
            {project.completedDate
              ? new Date(project.completedDate).getFullYear()
              : '--'
            }
          </span>
          <span className="date-month">
            {project.completedDate
              ? new Date(project.completedDate).toLocaleDateString('fr-FR', {
                month: 'long'
              }).toUpperCase()
              : '--'
            }
          </span>
        </motion.div>

        <motion.div
          className="overlay__side-type"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="type-label">TYPE</span>
          <span className="type-value">{project.type}</span>
        </motion.div>
      </motion.div>

      <motion.div
        ref={contentRef}
        className="overlay__content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <motion.button
          className="overlay__close"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
        >
          ✕
        </motion.button>

        {/* Contenu */}
        <motion.h2
          className="overlay__title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.title}
        </motion.h2>

        <motion.div
          className="overlay__image"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img src={project.mainImage} alt={project.title} />
        </motion.div>

        <motion.div
          className="overlay__description"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Description</h3>
          <p>{project.longDescription}</p>
        </motion.div>

        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            className="overlay__technologies"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Technologies</h3>
            <div className="overlay__tech-list">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="tech-tag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + (index * 0.05) }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Liens */}
        <motion.div
          className="overlay__links"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Voir le site →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="secondary">
              Code source →
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectOverlay