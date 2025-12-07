"use client"

import type React from "react"
import { useState } from "react"
import { Star, MessageCircle, X } from "lucide-react"
import Image from "next/image"

interface CodeSnippetCardProps {
  username: string
  avatar?: string
  createdAt: string
  stars: number
  code: React.ReactNode
  description?: string
}

export function CodeSnippetCard({ username, avatar, createdAt, stars, code, description }: CodeSnippetCardProps) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="bg-secondary/50 rounded-lg overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
            {avatar ? (
              <Image
                src={avatar || "/placeholder.svg"}
                alt={username}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
            )}
          </div>
          <div>
            <p className="text-primary text-sm font-mono">@{username}</p>
            <p className="text-muted-foreground text-xs font-mono">{createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-xs font-mono">
          <button
            onClick={() => description && setShowDescription(!showDescription)}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            details
          </button>
          <div className="flex items-center gap-1">
            <Star className={`w-4 h-4 ${stars > 0 ? "fill-accent text-accent" : ""}`} />
            {stars} stars
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="p-4 text-xs overflow-x-auto font-mono">{code}</div>

      {showDescription && description && (
        <div className="border-t border-border p-4 bg-secondary/30">
          <div className="flex items-start justify-between gap-4">
            <p className="text-muted-foreground text-sm font-mono">{description}</p>
            <button
              onClick={() => setShowDescription(false)}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
