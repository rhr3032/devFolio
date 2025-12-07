import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        {/* Left side - social links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-muted-foreground text-xs sm:text-sm">find me in:</span>
          <div className="flex items-center border-l border-border">
            <a
              href="https://twitter.com/rhr_raisulrafi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1 text-muted-foreground hover:text-foreground transition-colors border-r border-border"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/rhr3032"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <a
          href="https://github.com/rhr3032"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors border-l border-border pl-3 sm:pl-4"
        >
          <span className="text-xs sm:text-sm">@rhr3032</span>
          <Github className="w-4 h-4" />
        </a>
      </div>
    </footer>
  )
}
