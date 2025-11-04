import { motion } from 'framer-motion'
import { useState } from 'react'
import './ProjectCard.css'

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        rotateY: -8,
        rotateX: 2,
        transition: { duration: 0.3 }
      }}
    >
      <motion.h2 
        className="project-card__title"
        animate={{
          color: isHovered ? 'transparent' : '#000000',
          WebkitTextStroke: isHovered ? '2px #ffffff' : '0px #ffffff'
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="project-card__slash">\</span>
        {project.title}
      </motion.h2>

      {isHovered && (
        <>
          <motion.div 
            className="particle particle-1"
            initial={{ scale: 0, opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              x: 0,
              filter: 'blur(0px)'
            }}
            exit={{ 
              scale: 0, 
              opacity: 0, 
              x: -30,
              filter: 'blur(10px)'
            }}
            transition={{ 
              duration: 0.5,
              delay: 0,
              ease: 'easeOut'
            }}
          />
          <motion.div 
            className="particle particle-2"
            initial={{ scale: 0, opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              x: 0,
              filter: 'blur(0px)'
            }}
            exit={{ 
              scale: 0, 
              opacity: 0, 
              x: -30,
              filter: 'blur(10px)'
            }}
            transition={{ 
              duration: 0.5,
              delay: 0.1,
              ease: 'easeOut'
            }}
          />
          <motion.div 
            className="particle particle-3"
            initial={{ scale: 0, opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              x: 0,
              filter: 'blur(0px)'
            }}
            exit={{ 
              scale: 0, 
              opacity: 0, 
              x: -30,
              filter: 'blur(10px)'
            }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,  
              ease: 'easeOut'
            }}
          />
        </>
      )}
    </motion.div>
  )
}

export default ProjectCard