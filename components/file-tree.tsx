"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface TreeItem {
  name: string
  type: "folder" | "file"
  icon?: React.ReactNode
  color?: string
  children?: TreeItem[]
  onClick?: () => void
  onToggle?: () => void
  isActive?: boolean
  isOpen?: boolean
  href?: string
}

interface FileTreeProps {
  items: TreeItem[]
  title?: string
}

function TreeNode({ item, depth = 0 }: { item: TreeItem; depth?: number }) {
  const [internalOpen, setInternalOpen] = useState(true)
  const isOpen = item.isOpen !== undefined ? item.isOpen : internalOpen

  const handleToggle = () => {
    if (item.onToggle) {
      item.onToggle()
    } else {
      setInternalOpen(!internalOpen)
    }
  }

  if (item.type === "folder") {
    return (
      <div>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: depth * 0.05 }}
          onClick={() => {
            handleToggle()
            item.onClick?.()
          }}
          className={cn(
            "flex items-center gap-2 w-full text-left py-1.5 px-2 transition-colors",
            item.isActive ? "text-foreground bg-muted/30" : "text-muted-foreground hover:text-foreground",
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </motion.span>
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="text-sm font-mono truncate">{item.name}</span>
        </motion.button>
        <AnimatePresence>
          {isOpen && item.children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {item.children.map((child, index) => (
                <TreeNode key={index} item={child} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (item.href) {
    return (
      <motion.a
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: depth * 0.05 }}
        href={item.href}
        className={cn(
          "flex items-center gap-2 w-full text-left py-1.5 px-2 transition-colors overflow-hidden",
          item.isActive ? "text-foreground bg-muted/30" : "text-muted-foreground hover:text-foreground",
        )}
        style={{ paddingLeft: `${depth * 16 + 24}px` }}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="text-sm font-mono truncate">{item.name}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: depth * 0.05 }}
      onClick={item.onClick}
      className={cn(
        "flex items-center gap-2 w-full text-left py-1.5 px-2 transition-colors overflow-hidden",
        item.isActive ? "text-foreground bg-muted/30" : "text-muted-foreground hover:text-foreground",
      )}
      style={{ paddingLeft: `${depth * 16 + 24}px` }}
    >
      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
      <span className="text-sm font-mono truncate">{item.name}</span>
    </motion.button>
  )
}

export function FileTree({ items, title }: FileTreeProps) {
  return (
    <div className="py-1 overflow-hidden">
      {title && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 text-foreground"
        >
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-mono truncate">{title}</span>
        </motion.div>
      )}
      {items.map((item, index) => (
        <TreeNode key={index} item={item} />
      ))}
    </div>
  )
}
