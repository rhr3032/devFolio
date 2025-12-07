"use client"

import { useState } from "react"
import { FileTree } from "@/components/file-tree"
import { CodePanel } from "@/components/code-panel"
import { ChevronDown, ChevronRight, Folder, FolderOpen, Mail, Phone, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const FolderIcon = ({ color, open = false }: { color: string; open?: boolean }) => {
  const Icon = open ? FolderOpen : Folder
  return <Icon className="w-4 h-4" style={{ color }} />
}

const FileIcon = ({ color }: { color: string }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const sectionContent = {
  bio: [
    { lineNumber: 1, content: <span className="text-muted-foreground">{"/**"}</span> },
    { lineNumber: 2, content: <span className="text-muted-foreground">{" * About me"}</span> },
    {
      lineNumber: 3,
      content: <span className="text-muted-foreground">{" * I have 5 years of experience in web"}</span>,
    },
    {
      lineNumber: 4,
      content: <span className="text-muted-foreground">{" * development lorem ipsum dolor sit amet,"}</span>,
    },
    {
      lineNumber: 5,
      content: <span className="text-muted-foreground">{" * consectetur adipiscing elit, sed do eiusmod"}</span>,
    },
    {
      lineNumber: 6,
      content: <span className="text-muted-foreground">{" * tempor incididunt ut labore et dolore"}</span>,
    },
    {
      lineNumber: 7,
      content: <span className="text-muted-foreground">{" * magna aliqua. Ut enim ad minim veniam,"}</span>,
    },
    {
      lineNumber: 8,
      content: <span className="text-muted-foreground">{" * quis nostrud exercitation ullamco laboris"}</span>,
    },
    {
      lineNumber: 9,
      content: <span className="text-muted-foreground">{" * nisi ut aliquip ex ea commodo consequat."}</span>,
    },
    { lineNumber: 10, content: <span className="text-muted-foreground">{" */"}</span> },
  ],
  interests: [
    { lineNumber: 1, content: <span className="text-muted-foreground">{"/**"}</span> },
    { lineNumber: 2, content: <span className="text-muted-foreground">{" * My Interests"}</span> },
    { lineNumber: 3, content: <span className="text-muted-foreground">{" *"}</span> },
    {
      lineNumber: 4,
      content: <span className="text-muted-foreground">{" * - Open source development"}</span>,
    },
    { lineNumber: 5, content: <span className="text-muted-foreground">{" * - UI/UX Design patterns"}</span> },
    {
      lineNumber: 6,
      content: <span className="text-muted-foreground">{" * - Creative coding and generative art"}</span>,
    },
    { lineNumber: 7, content: <span className="text-muted-foreground">{" * - Game development"}</span> },
    {
      lineNumber: 8,
      content: <span className="text-muted-foreground">{" * - Reading tech blogs and documentation"}</span>,
    },
    {
      lineNumber: 9,
      content: <span className="text-muted-foreground">{" * - Contributing to developer communities"}</span>,
    },
    { lineNumber: 10, content: <span className="text-muted-foreground">{" *"}</span> },
    {
      lineNumber: 11,
      content: <span className="text-muted-foreground">{" * I love exploring new technologies and"}</span>,
    },
    {
      lineNumber: 12,
      content: <span className="text-muted-foreground">{" * building side projects in my free time."}</span>,
    },
    { lineNumber: 13, content: <span className="text-muted-foreground">{" */"}</span> },
  ],
  "high-school": [
    { lineNumber: 1, content: <span className="text-muted-foreground">{"/**"}</span> },
    { lineNumber: 2, content: <span className="text-muted-foreground">{" * High School Education"}</span> },
    { lineNumber: 3, content: <span className="text-muted-foreground">{" *"}</span> },
    {
      lineNumber: 4,
      content: <span className="text-muted-foreground">{" * School: Technical High School of Sofia"}</span>,
    },
    { lineNumber: 5, content: <span className="text-muted-foreground">{" * Years: 2010 - 2014"}</span> },
    { lineNumber: 6, content: <span className="text-muted-foreground">{" * Major: Computer Science"}</span> },
    { lineNumber: 7, content: <span className="text-muted-foreground">{" *"}</span> },
    { lineNumber: 8, content: <span className="text-muted-foreground">{" * Achievements:"}</span> },
    {
      lineNumber: 9,
      content: <span className="text-muted-foreground">{" * - First place in regional coding competition"}</span>,
    },
    {
      lineNumber: 10,
      content: <span className="text-muted-foreground">{" * - Built my first website at age 15"}</span>,
    },
    { lineNumber: 11, content: <span className="text-muted-foreground">{" * - Member of robotics club"}</span> },
    { lineNumber: 12, content: <span className="text-muted-foreground">{" */"}</span> },
  ],
  university: [
    { lineNumber: 1, content: <span className="text-muted-foreground">{"/**"}</span> },
    { lineNumber: 2, content: <span className="text-muted-foreground">{" * University Education"}</span> },
    { lineNumber: 3, content: <span className="text-muted-foreground">{" *"}</span> },
    { lineNumber: 4, content: <span className="text-muted-foreground">{" * University: Sofia University"}</span> },
    {
      lineNumber: 5,
      content: <span className="text-muted-foreground">{" * Degree: Bachelor of Computer Science"}</span>,
    },
    { lineNumber: 6, content: <span className="text-muted-foreground">{" * Years: 2014 - 2018"}</span> },
    { lineNumber: 7, content: <span className="text-muted-foreground">{" * GPA: 3.9/4.0"}</span> },
    { lineNumber: 8, content: <span className="text-muted-foreground">{" *"}</span> },
    { lineNumber: 9, content: <span className="text-muted-foreground">{" * Key Courses:"}</span> },
    { lineNumber: 10, content: <span className="text-muted-foreground">{" * - Data Structures and Algorithms"}</span> },
    { lineNumber: 11, content: <span className="text-muted-foreground">{" * - Web Development"}</span> },
    { lineNumber: 12, content: <span className="text-muted-foreground">{" * - Database Management"}</span> },
    { lineNumber: 13, content: <span className="text-muted-foreground">{" * - Software Engineering"}</span> },
    { lineNumber: 14, content: <span className="text-muted-foreground">{" *"}</span> },
    {
      lineNumber: 15,
      content: <span className="text-muted-foreground">{" * Thesis: 'Modern Web Application Architecture'"}</span>,
    },
    { lineNumber: 16, content: <span className="text-muted-foreground">{" */"}</span> },
  ],
  education: [
    { lineNumber: 1, content: <span className="text-muted-foreground">{"/**"}</span> },
    { lineNumber: 2, content: <span className="text-muted-foreground">{" * Education Overview"}</span> },
    { lineNumber: 3, content: <span className="text-muted-foreground">{" *"}</span> },
    {
      lineNumber: 4,
      content: <span className="text-muted-foreground">{" * Select a sub-folder to view details:"}</span>,
    },
    { lineNumber: 5, content: <span className="text-muted-foreground">{" * - high-school"}</span> },
    { lineNumber: 6, content: <span className="text-muted-foreground">{" * - university"}</span> },
    { lineNumber: 7, content: <span className="text-muted-foreground">{" */"}</span> },
  ],
}

type SectionKey = keyof typeof sectionContent

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

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("education")
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true)
  const [contactsOpen, setContactsOpen] = useState(true)
  const [educationOpen, setEducationOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const personalInfoTree = [
    {
      name: "bio",
      type: "file" as const,
      icon: <FolderIcon color="#e99287" />,
      onClick: () => setActiveSection("bio"),
      isActive: activeSection === "bio",
    },
    {
      name: "interests",
      type: "file" as const,
      icon: <FolderIcon color="#43d9ad" />,
      onClick: () => setActiveSection("interests"),
      isActive: activeSection === "interests",
    },
    {
      name: "education",
      type: "folder" as const,
      icon: <FolderIcon color="#3a49a4" open={educationOpen} />,
      isOpen: educationOpen,
      onToggle: () => setEducationOpen(!educationOpen),
      onClick: () => setActiveSection("education"),
      isActive: activeSection === "education",
      children: [
        {
          name: "high-school",
          type: "file" as const,
          icon: <FileIcon color="#607b96" />,
          onClick: () => setActiveSection("high-school"),
          isActive: activeSection === "high-school",
        },
        {
          name: "university",
          type: "file" as const,
          icon: <FileIcon color="#607b96" />,
          onClick: () => setActiveSection("university"),
          isActive: activeSection === "university",
        },
      ],
    },
  ]

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-3 border-b border-border text-foreground w-full text-left"
      >
        {sidebarOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <span className="text-sm font-mono">personal-info</span>
      </button>

      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`${sidebarOpen ? "flex" : "hidden"} lg:flex w-full lg:w-56 border-b lg:border-b-0 lg:border-r border-border flex-col`}
      >
        <div className="border-b border-border">
          <button
            onClick={() => setPersonalInfoOpen(!personalInfoOpen)}
            className="hidden lg:flex items-center gap-2 px-4 py-3 text-foreground w-full text-left hover:bg-muted/20"
          >
            <motion.span
              animate={{ rotate: personalInfoOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
            <span className="text-sm font-mono">personal-info</span>
          </button>
          <AnimatePresence>
            {(personalInfoOpen || sidebarOpen) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <FileTree items={personalInfoTree} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-b border-border">
          <button
            onClick={() => setContactsOpen(!contactsOpen)}
            className="flex items-center gap-2 px-4 py-3 text-foreground w-full text-left hover:bg-muted/20"
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
      </motion.aside>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex-1 flex flex-col"
      >
        <div className="border-b border-border">
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-4 py-3 border-r border-border text-muted-foreground">
              <span className="text-sm font-mono">{activeSection}</span>
              <button className="hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 sm:p-6 overflow-auto"
        >
          <CodePanel lines={sectionContent[activeSection]} />
        </motion.div>
      </motion.div>
    </div>
  )
}
