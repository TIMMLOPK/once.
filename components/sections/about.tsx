import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { caveat } from '@/app/fonts'
import { cn } from '@/lib/cn'
import { CardStack } from '@/components/motions/cardStack'
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Arrow1 } from '@/components/shared/icons'
import { motion } from 'motion/react'

const socials = [
  {
    name: 'Discord (timmy_y)',
    link: 'https://discord.com',
    icon: <FaDiscord className="h-5 w-5" />
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/tw_wu_as_tim/',
    icon: <FaInstagram className="h-5 w-5" />
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/once_wu',
    icon: <FaTwitter className="h-5 w-5" />
  }
]

interface ImageCardProps {
  src: string | StaticImageData
  alt: string
  text: string
  className?: string
}

export function ImageCard({ src, alt, text, className }: ImageCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border bg-white px-2.5 pb-4 pt-2.5 shadow-lg dark:border-zinc-800 dark:bg-black',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        sizes="200px"
        width={200}
        height={200}
        className="h-[250px] w-[250px] rounded-sm object-cover"
      />
      <p className={`${caveat.className} mt-4 text-center text-xl font-bold`}>
        {text}
      </p>
    </div>
  )
}

const ImageCards = [
  { src: '/images/001.jpg', alt: 'Picture of a shop', text: 'A shop^_^' },
  { src: '/images/002.JPG', alt: 'Blue sky', text: 'Blue sky ☁️' },
  {
    src: '/images/003.JPG',
    alt: 'A very special wall',
    text: 'Really interesting wall'
  }
]

export function AboutSection() {
  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
      },
      exit: {
        transition: { staggerChildren: 0.05, staggerDirection: 1 }
      }
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px) brightness(0%)',
        y: 0
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 0.4
        }
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(10px) brightness(0%)',
        transition: {
          duration: 0.4
        }
      }
    }
  }

  return (
    <section
      className="relative m-10 mt-12 flex min-h-screen items-center justify-center md:m-12 md:px-6"
      data-section="about"
    >
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12">
        <div className="relative md:pl-10">
          <div className="relative h-[350px] max-w-[300px] space-y-12 md:max-w-[380px]">
            <CardStack items={ImageCards} />
          </div>
          <div className="absolute -top-4 flex -translate-x-1 -rotate-12 md:right-0 md:top-0 md:-translate-y-14 md:rotate-6">
            <Arrow1 className="h-12 w-12 text-zinc-400 dark:text-zinc-200" />
            <p
              className={`${caveat.className} max-w-40 text-xl font-bold text-zinc-400`}
            >
              I am also interested in{' '}
              <span className="text-black dark:text-white">Photography</span>
            </p>
          </div>
        </div>
        <motion.div
          className="relative space-y-4 font-medium text-zinc-400 lg:order-first lg:row-span-2"
          variants={blurSlideVariants.container}
          initial="hidden"
          whileInView="visible"
        >
          <motion.p
            variants={blurSlideVariants.item}
            initial="hidden"
            whileInView="visible"
          >
            I am{' '}
            <span className="font-bold text-black dark:text-white">Timmy</span>{' '}
            , a{' '}
            <span className="font-bold text-black dark:text-white">
              developer
            </span>{' '}
            who loves coding and creating 🪄. I am passionate about building
            something{' '}
            <span className="font-bold text-black dark:text-white">
              amazing
            </span>
            .
          </motion.p>
          <motion.p
            variants={blurSlideVariants.item}
            initial="hidden"
            whileInView="visible"
          >
            I am dedicated to learning new technologies and improving my skills.
            Recently, I have been working with{' '}
            <span className="font-bold text-black dark:text-white">React</span>{' '}
            and{' '}
            <span className="font-bold text-black dark:text-white">
              Next.js
            </span>{' '}
            to create web applications.
          </motion.p>
          <motion.p
            variants={blurSlideVariants.item}
            initial="hidden"
            whileInView="visible"
          >
            I am always open to new opportunities and challenges. If you have a
            project in mind or want to collaborate, feel free to reach out to
            me.
          </motion.p>
          <motion.div
            variants={blurSlideVariants.item}
            initial="hidden"
            whileInView="visible"
            className="flex items-center space-x-2 font-vt323 text-xl font-bold text-black dark:text-white"
          >
            <span>#AI</span>
            <span>#Web</span>
          </motion.div>
          <div className="flex space-x-4 border-t border-dashed border-zinc-400 pt-4 text-xs md:text-base">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                passHref
                className="group cursor-pointer"
              >
                <motion.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: Math.random() * 100 - 50,
                      rotate: Math.random() * 90 - 45,
                      scale: 0.8
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 100
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 group-hover:text-black dark:group-hover:text-white"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
