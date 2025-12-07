"use client"

import { TicTacToeGame } from "@/components/tic-tac-toe-game"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function HomePage() {
  const router = useRouter()

  const handleComplete = () => {
    router.push("/about")
  }

  const handleSkip = () => {
    router.push("/about")
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:px-36 xl:px-52 relative overflow-hidden">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-16 w-full relative z-10">
        {/* Left side - Introduction */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6 text-center xl:text-left flex-shrink-0"
        >
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground font-mono text-sm sm:text-base"
            >
              Hi all. I am
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl font-normal text-foreground font-mono"
            >
              Raisul R.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-primary flex items-center gap-2 font-mono justify-center xl:justify-start flex-wrap"
            >
              <span className="text-muted-foreground">{">"}</span>
              UI/UX Designer and Front-end developer
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-1 pt-4 sm:pt-8 text-muted-foreground text-xs sm:text-sm font-mono"
          >
            <p>{"// defeat the AI to continue"}</p>
            <p>{"// find my profile on Behance:"}</p>
            <p className="break-all">
              <span className="text-[#c792ea]">const</span> <span className="text-[#addb67]">behanceLink</span>{" "}
              <span className="text-foreground">=</span>{" "}
              <Link
                href="https://behance.net/rhr3032"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                &quot;https://behance.net/rhr3032&quot;
              </Link>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="hidden md:block"
        >
          <TicTacToeGame onComplete={handleComplete} onSkip={handleSkip} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:hidden"
        >
          <button
            onClick={handleSkip}
            className="px-6 py-3 bg-secondary text-foreground font-mono rounded hover:bg-muted transition-colors"
          >
            continue to portfolio
          </button>
        </motion.div>
      </div>
    </div>
  )
}
