import { useEffect, useRef, useState } from 'react'
import './CustomScrollbar.css'

const CustomScrollbar = ({ containerRef }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const thumbRef = useRef(null)
  const trackRef = useRef(null)
  const dragStartY = useRef(0)
  const dragStartScrollTop = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const scrollableHeight = scrollHeight - clientHeight
      
      if (scrollableHeight <= 0) {
        setIsVisible(false)
        return
      }
      
      setIsVisible(true)
      const percentage = scrollTop / scrollableHeight
      setScrollPercentage(percentage)
      
      const thumbHeightCalc = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        40
      )
      setThumbHeight(thumbHeightCalc)
    }

    updateScrollbar()
    container.addEventListener('scroll', updateScrollbar)
    window.addEventListener('resize', updateScrollbar)
    
    const resizeObserver = new ResizeObserver(updateScrollbar)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', updateScrollbar)
      window.removeEventListener('resize', updateScrollbar)
      resizeObserver.disconnect()
    }
  }, [containerRef])

  const handleMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragStartY.current = e.clientY
    dragStartScrollTop.current = containerRef.current.scrollTop
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return

      const trackRect = track.getBoundingClientRect()
      const deltaY = e.clientY - dragStartY.current
      const trackHeight = trackRect.height - thumbHeight
      const scrollRatio = container.scrollHeight - container.clientHeight
      
      const newScrollTop = dragStartScrollTop.current + (deltaY / trackHeight) * scrollRatio
      container.scrollTop = Math.max(0, Math.min(scrollRatio, newScrollTop))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, containerRef, thumbHeight])

  const handleTrackClick = (e) => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return
    
    if (e.target !== track) return

    const trackRect = track.getBoundingClientRect()
    const clickY = e.clientY - trackRect.top
    const trackHeight = trackRect.height
    const percentage = clickY / trackHeight

    const scrollableHeight = container.scrollHeight - container.clientHeight
    container.scrollTop = percentage * scrollableHeight
  }

  if (!isVisible) return null

  const maxThumbTop = containerRef.current 
    ? containerRef.current.clientHeight - thumbHeight 
    : 0
  const thumbTop = scrollPercentage * maxThumbTop

  return (
    <div 
      className="custom-scrollbar"
      ref={trackRef}
      onClick={handleTrackClick}
    >
      <div
        ref={thumbRef}
        className="custom-scrollbar__thumb"
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

export default CustomScrollbar