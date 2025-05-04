'use client'

import React, { useEffect, useState, memo } from 'react' // Import memo
import { motion, AnimatePresence, Variants } from 'motion/react'

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.'

// Generate a random character
function getRandomChar() {
  return characters[Math.floor(Math.random() * characters.length)]
}


type FlipCharacterProps = {
  finalChar: string
  charIndex: number
  total: number
  debug?: boolean
}


const FlipCharacter = memo(
  ({
    finalChar,
    charIndex,
    total,
    debug = false
  }: FlipCharacterProps) => {
    const [char, setChar] = useState<string | null>(null)
    const [isFlipping, setIsFlipping] = useState(false)

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
      // Reset animation state when finalChar changes
      setIsFlipping(false)
      setChar(getRandomChar()) // Start with a random char immediately

      let intervalId: NodeJS.Timeout | null = null
      let timeoutId: NodeJS.Timeout | null = null

      const startAnimation = () => {

        intervalId = setInterval(() => {
          setIsFlipping(true) // Start flipping animation
          setTimeout(() => {
            setChar(getRandomChar()) // Change the character after the first half of the flip
          }, 125) // Halfway through the animation (0.25s / 2)
        }, 250) // Flip duration

        timeoutId = setTimeout(() => {
          if (intervalId) clearInterval(intervalId)
          setIsFlipping(true) // Start flipping animation for the final character
          setTimeout(() => {
            setChar(finalChar) // Set the final character after the first half of the flip
          }, 125) // Halfway through the animation
        }, 2000) // Stop random flipping after 2 seconds
      }

      // Start animation slightly delayed to allow initial render
      const startTimeoutId = setTimeout(startAnimation, 50)

      return () => {
        if (intervalId) clearInterval(intervalId)
        if (timeoutId) clearTimeout(timeoutId)
        clearTimeout(startTimeoutId)
      }
    }, [finalChar, setChar, setIsFlipping])

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
)

FlipCharacter.displayName = 'FlipCharacter'

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

  return Array.from(message).map((char, index) => (
    <FlipCharacter
      key={index}
      finalChar={char}
      charIndex={index}
      total={message.length}
    />
  ))
}

export { AnimatedText }
