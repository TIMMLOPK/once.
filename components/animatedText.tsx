'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'

const FlipCharacter = ({
  finalChar,
  charIndex,
  total,
  debug = false
}: {
  finalChar: string
  charIndex: number
  total: number
  debug?: boolean
}) => {
  const [char, setChar] = useState<string | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Generate a random character
  function getRandomChar() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.'
    return characters[Math.floor(Math.random() * characters.length)]
  }

  useEffect(() => {
    if (!char) {
      setChar(getRandomChar())
    }
  }, [])
  // Container variants for debug mode
  const containerVariants = {
    debug: {
      rotateX: -23,
      rotateY: 45
    },
    initial: {
      rotateX: 0,
      rotateY: 0
    }
  }

  // Character variants for flipping animation
  const charVariants: Variants = {
    hide: {
      rotateX: 90, // Rotate to 90 degrees (hide the current character)
      transition: {
        duration: 0.25,
        ease: 'easeIn'
      }
    },
    show: {
      rotateX: 0, // Rotate to 0 degrees (show the new character)
      transition: {
        duration: 0.25,
        ease: 'easeOut',
        delay: Math.sin(charIndex / total) * 0.1 // Add a delay based on the character index
      }
    },
    initial: {
      rotateX: -90 // Start new character at -90 degrees (hidden)
    }
  }

  // Update the character randomly before settling on the final character
  useEffect(() => {
    if (isAnimating) return

    setIsAnimating(true)

    const interval = setInterval(() => {
      setIsFlipping(true) // Start flipping animation
      setTimeout(() => {
        setChar(getRandomChar()) // Change the character after the first half of the flip
      }, 125) // Halfway through the animation (150ms)
    }, 250) // Every 300ms

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setIsFlipping(true) // Start flipping animation for the final character
      setTimeout(() => {
        setChar(finalChar) // Set the final character after the first half of the flip
      }, 125) // Halfway through the animation (150ms)
    }, 2000) // Stop after 2 seconds

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [finalChar])

  return (
    <motion.main
      style={{
        perspective: '1000px',
        lineHeight: 1,
        verticalAlign: 'baseline',
        transformStyle: 'preserve-3d',
        display: 'inline-block'
      }}
      animate={debug ? 'debug' : 'initial'}
      exit={debug ? 'debug' : 'initial'}
      variants={containerVariants}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char} // Use the character as the key to trigger animations
          variants={charVariants}
          initial="initial"
          animate={isFlipping ? 'hide' : 'show'} // Toggle between hide and show states
          exit="hide" // Exit animation
          onAnimationComplete={() => {
            setIsFlipping(false) // Stop flipping animation
            setIsAnimating(false) // Stop changing the character
          }}
          style={{
            display: 'inline-block',
            position: 'relative',
            height: '0.9em',
            lineHeight: 1,
            verticalAlign: 'middle',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          <motion.span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              transform: 'translate(-50%, -50%) translateZ(0.45em)',
              backfaceVisibility: 'hidden'
            }}
          >
            {char}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </motion.main>
  )
}

const AnimatedText = ({ messages }: { messages: string[] }) => {
  const [message, setMessage] = useState(messages[0])
  const changeMessage = () => {
    const nextIndex = (messages.indexOf(message) + 1) % messages.length
    const newMessage = messages[nextIndex]
    setMessage(newMessage)
  }

  useEffect(() => {
    if (message === messages[messages.length - 1]) return
    const interval = setInterval(() => {
      changeMessage()
    }, 5000)
    return () => clearInterval(interval)
  }, [messages, message])

  return (
    <div className="flex">
      <div className="relative flex gap-4">
        {Array.from(message).map((char, index) => (
          <FlipCharacter
            key={index}
            finalChar={char}
            charIndex={index}
            total={message.length}
          />
        ))}
      </div>
    </div>
  )
}

export { AnimatedText }
