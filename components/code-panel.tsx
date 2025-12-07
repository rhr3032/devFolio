import type React from "react"
interface CodeLine {
  lineNumber: number
  content: React.ReactNode
}

interface CodePanelProps {
  lines: CodeLine[]
  className?: string
}

export function CodePanel({ lines, className }: CodePanelProps) {
  return (
    <div className={`font-mono text-sm ${className}`}>
      {lines.map((line) => (
        <div key={line.lineNumber} className="flex">
          <span className="w-12 text-right pr-4 text-muted-foreground select-none">{line.lineNumber}</span>
          <div className="flex-1">{line.content}</div>
        </div>
      ))}
    </div>
  )
}
