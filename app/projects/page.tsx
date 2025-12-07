"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const technologies = [
  { name: "React", icon: <span className="text-[#61dafb]">⚛</span>, checked: true },
  { name: "HTML", icon: <span className="text-[#e34f26] font-bold text-sm">{"</>"}</span>, checked: false },
  { name: "CSS", icon: <span className="text-[#264de4] font-bold text-sm">#</span>, checked: true },
  { name: "Vue", icon: <span className="text-[#42b883] font-bold text-sm">V</span>, checked: true },
  { name: "Angular", icon: <span className="text-[#dd1b16] font-bold text-sm">A</span>, checked: false },
  { name: "Gatsby", icon: <span className="text-[#663399] font-bold text-sm">G</span>, checked: false },
  { name: "Flutter", icon: <span className="text-[#02569B] font-bold text-sm">{"<>"}</span>, checked: false },
]

const projects = [
  {
    id: 1,
    title: "Project 1",
    subtitle: "_ui-animations",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "/3d-geometric-abstract-cubes-explosion-dark-backgro.jpg",
    tech: ["React"],
    techIcon: <span className="text-[#61dafb]">⚛</span>,
  },
  {
    id: 2,
    title: "Project 2",
    subtitle: "_tetris-game",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "/retro-gaming-setup-with-neon-lights-cyan-magenta.jpg",
    tech: ["React", "CSS"],
    techIcon: <span className="text-[#61dafb]">⚛</span>,
  },
  {
    id: 3,
    title: "Project 3",
    subtitle: "_glassy-ui",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "/abstract-colorful-glass-sphere-on-keyboard.jpg",
    tech: ["CSS", "HTML"],
    techIcon: <span className="text-[#e34f26] font-bold text-sm">{"</>"}</span>,
  },
  {
    id: 4,
    title: "Project 4",
    subtitle: "_nimbus",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "/futuristic-car-delorean-style-yellow-teal-gradient.jpg",
    tech: ["Vue"],
    techIcon: <span className="text-[#42b883] font-bold text-sm">V</span>,
  },
  {
    id: 5,
    title: "Project 5",
    subtitle: "_emberize-ui",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "/pink-metallic-sphere-on-colorful-keyboard-abstract.jpg",
    tech: ["Vue", "CSS"],
    techIcon: <span className="text-[#42b883] font-bold text-sm">V</span>,
  },
]

export default function ProjectsPage() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>(["React", "CSS", "Vue"])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  const filteredProjects =
    selectedTechs.length === 0
      ? projects
      : projects.filter((project) => project.tech.some((t) => selectedTechs.includes(t)))

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-3 border-b border-border text-foreground w-full text-left"
      >
        {sidebarOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <span className="text-sm font-mono">projects</span>
      </button>

      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`${sidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border flex flex-col`}
      >
        <div className="border-b border-border">
          <button className="hidden lg:flex items-center gap-2 px-4 py-3 text-foreground w-full text-left">
            <ChevronDown className="w-4 h-4" />
            <span className="text-sm font-mono">projects</span>
          </button>
          <div className="py-2 grid grid-cols-2 lg:grid-cols-1">
            {technologies.map((tech) => (
              <label
                key={tech.name}
                className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedTechs.includes(tech.name)}
                  onChange={() => toggleTech(tech.name)}
                  className="w-4 h-4 rounded border-border bg-transparent accent-primary"
                />
                {tech.icon}
                <span className="text-sm font-mono">{tech.name}</span>
              </label>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Tab - shows selected filters */}
        <div className="border-b border-border">
          <div className="flex items-center">
            {selectedTechs.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-3 border-r border-border text-muted-foreground overflow-x-auto">
                <span className="text-sm font-mono whitespace-nowrap">{selectedTechs.join("; ")}</span>
                <button onClick={() => setSelectedTechs([])} className="hover:text-foreground flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="space-y-3"
              >
                {/* Project title */}
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-primary font-medium">{project.title}</span>
                  <span className="text-muted-foreground">{"//"}</span>
                  <span className="text-muted-foreground truncate">{project.subtitle}</span>
                </div>

                {/* Project card */}
                <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden group">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Tech badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-secondary/80 backdrop-blur-sm rounded flex items-center justify-center">
                      {project.techIcon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-muted-foreground text-sm font-mono">{project.description}</p>
                    <button className="px-4 py-2 bg-secondary text-foreground text-sm font-mono rounded hover:bg-muted transition-colors">
                      view-project
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
