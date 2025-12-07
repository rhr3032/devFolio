"use client"

import type React from "react"

import { useState } from "react"
import { FileTree } from "@/components/file-tree"
import { ChevronDown, ChevronRight, Mail, Phone, ExternalLink, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const contactsTree = [
  {
    name: "contact.raisulrafi@gmail.com",
    type: "file" as const,
    icon: <Mail className="w-4 h-4 text-muted-foreground" />,
    href: "mailto:contact.raisulrafi@gmail.com",
  },
  {
    name: "+880 1795-408194",
    type: "file" as const,
    icon: <Phone className="w-4 h-4 text-muted-foreground" />,
    href: "tel:+8801795408194",
  },
]

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/rhr3032",
    type: "file" as const,
    icon: <ExternalLink className="w-4 h-4 text-muted-foreground" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rhr3032",
    type: "file" as const,
    icon: <ExternalLink className="w-4 h-4 text-muted-foreground" />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/rhr_raisulrafi",
    type: "file" as const,
    icon: <ExternalLink className="w-4 h-4 text-muted-foreground" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/rhr.raisulrafi",
    type: "file" as const,
    icon: <ExternalLink className="w-4 h-4 text-muted-foreground" />,
  },
  {
    name: "Gumroad",
    url: "https://rhr3032.gumroad.com",
    type: "file" as const,
    icon: <ExternalLink className="w-4 h-4 text-muted-foreground" />,
  },
]

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [emailError, setEmailError] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contactsOpen, setContactsOpen] = useState(true)
  const [socialOpen, setSocialOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })

  const handleEmailBlur = () => {
    if (formData.email && !isValidEmail(formData.email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    if (!isValidEmail(formData.email)) {
      setEmailError(true)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        window.open(data.mailto, "_blank")
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      const mailto = `mailto:contact.raisulrafi@gmail.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      window.open(mailto, "_blank")
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewMessage = () => {
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitted(false)
    setEmailError(false)
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-3 border-b border-border text-foreground w-full text-left"
      >
        {sidebarOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <span className="text-sm font-mono">contacts</span>
      </button>

      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`${sidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border flex flex-col`}
      >
        {/* Contacts section */}
        <div className="border-b border-border">
          <button
            onClick={() => setContactsOpen(!contactsOpen)}
            className="flex items-center gap-2 px-4 py-3 text-foreground w-full text-left"
          >
            <motion.span
              animate={{ rotate: contactsOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
            <span className="text-sm font-mono">contacts</span>
          </button>
          <AnimatePresence>
            {contactsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <FileTree items={contactsTree} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Find me section */}
        <div className="border-b border-border">
          <button
            onClick={() => setSocialOpen(!socialOpen)}
            className="flex items-center gap-2 px-4 py-3 text-foreground w-full text-left"
          >
            <motion.span
              animate={{ rotate: socialOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
            <span className="text-sm font-mono">find-me-also-in</span>
          </button>
          <AnimatePresence>
            {socialOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="px-4 py-2 space-y-1 overflow-hidden"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.icon}
                    <span className="text-sm font-mono truncate">{link.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main content - Form or Success */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-border"
      >
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-mono text-foreground">Thank you!</h2>
              <p className="text-muted-foreground font-mono text-sm sm:text-base">Your message has been accepted.</p>
              <p className="text-muted-foreground font-mono text-sm sm:text-base">You will receive answer soon!</p>
              <button
                onClick={handleNewMessage}
                className="mt-6 px-4 py-2 bg-accent text-accent-foreground text-sm font-mono rounded hover:bg-accent/90 transition-colors"
              >
                send-new-message
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit} 
              className="w-full max-w-md space-y-6"
            >
              <div className="space-y-2">
                <label className="text-muted-foreground text-sm font-mono">_name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-muted-foreground transition-colors font-mono text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-sm font-mono">_email:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (emailError) setEmailError(false)
                    }}
                    onBlur={handleEmailBlur}
                    className={`w-full px-4 py-3 rounded-lg bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors font-mono text-sm sm:text-base ${
                      emailError ? "border-red-500" : "border-border focus:border-muted-foreground"
                    }`}
                  />
                  {emailError && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {emailError && <p className="text-red-500 text-sm font-mono">Wrong email address</p>}
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-sm font-mono">_message:</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="your message here ..."
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-muted-foreground transition-colors resize-none font-mono text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.message || emailError || isLoading}
                className="px-4 py-2 bg-secondary text-muted-foreground text-sm font-mono rounded hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "sending..." : "submit-message"}
              </button>
            </motion.form>
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="hidden xl:flex w-[400px] flex-col"
      >
        <div className="flex-1 p-6 font-mono text-sm">
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">1</span>
            <span>
              <span className="text-[#c792ea]">const</span> <span className="text-[#addb67]">button</span>{" "}
              <span className="text-foreground">=</span> <span className="text-foreground">document.</span>
              <span className="text-[#82aaff]">querySelector</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&apos;#sendBtn&apos;</span>
              <span className="text-foreground">);</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">2</span>
            <span></span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">3</span>
            <span>
              <span className="text-[#c792ea]">const</span> <span className="text-[#addb67]">message</span>{" "}
              <span className="text-foreground">=</span> <span className="text-foreground">{"{"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">4</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-[#82aaff]">name</span>
              <span className="text-foreground">:</span>{" "}
              <span className="text-accent">&quot;{formData.name}&quot;</span>
              <span className="text-foreground">,</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">5</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-[#82aaff]">email</span>
              <span className="text-foreground">:</span>{" "}
              <span className="text-accent">&quot;{formData.email}&quot;</span>
              <span className="text-foreground">,</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">6</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-[#82aaff]">message</span>
              <span className="text-foreground">:</span>{" "}
              <span className="text-accent">&quot;{formData.message}&quot;</span>
              <span className="text-foreground">,</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">7</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-[#82aaff]">date</span>
              <span className="text-foreground">:</span> <span className="text-accent">&quot;{currentDate}&quot;</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">8</span>
            <span>
              <span className="text-foreground">{"}"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">9</span>
            <span></span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">10</span>
            <span>
              <span className="text-foreground">button.</span>
              <span className="text-[#82aaff]">addEventListener</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&apos;click&apos;</span>
              <span className="text-foreground">, () </span>
              <span className="text-[#c792ea]">{"=>"}</span>
              <span className="text-foreground">{" {"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">11</span>
            <span>
              <span className="text-foreground">{"  "}form.</span>
              <span className="text-[#82aaff]">send</span>
              <span className="text-foreground">(message);</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">12</span>
            <span>
              <span className="text-foreground">{"})"}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
