"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: "/", label: "_hello" },
  { href: "/about", label: "_about-me" },
  { href: "/projects", label: "_projects" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    router.push(href)
  }

  return (
    <header className="border-b border-border">
      <nav className="flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors border-r border-border min-w-[120px] lg:min-w-[200px] text-sm lg:text-base truncate"
        >
          raisul-r
        </Link>

        <div className="hidden md:flex items-center border-r border-border">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 lg:px-6 py-4 text-muted-foreground hover:text-foreground transition-colors border-r border-border text-sm",
                  isActive && "text-foreground border-b-2 border-b-accent bg-secondary/30",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        <Link
          href="/contact"
          className={cn(
            "hidden md:block px-4 lg:px-6 py-4 text-muted-foreground hover:text-foreground transition-colors border-l border-border text-sm",
            pathname === "/contact" && "text-foreground border-b-2 border-b-accent bg-secondary/30",
          )}
        >
          _contact-me
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-4 text-muted-foreground hover:text-foreground border-l border-border relative w-14 h-14 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    "block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground transition-colors border-b border-border text-sm cursor-pointer",
                    isActive && "text-foreground bg-secondary/30",
                  )}
                >
                  {item.label}
                </motion.button>
              )
            })}
            <motion.button
              onClick={() => handleNavClick("/contact")}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
              className={cn(
                "block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer",
                pathname === "/contact" && "text-foreground bg-secondary/30",
              )}
            >
              _contact-me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
