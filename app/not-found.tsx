import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="flex items-start gap-12 max-w-5xl">
        {/* ASCII Art 404 */}
        <pre className="text-[#607b96] text-lg leading-tight font-mono select-none">
          {`    __  __    ___    __  __
   /  |/  |  / _ \\  /  |/  |
   |  |  |  | | | | |  |  |
   |     |  | | | | |     |
   |  |  |  | |_| | |  |  |
   |__|__|   \\___/  |__|__|`}
        </pre>

        {/* Code-style error messages */}
        <div className="font-mono text-sm">
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">1</span>
            <span>
              <span className="text-[#c792ea]">const</span> <span className="text-[#addb67]">page</span>
              <span className="text-foreground"> = </span>
              <span className="text-[#82aaff]">findPage</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&apos;you-were-looking-for&apos;</span>
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
              <span className="text-[#c792ea]">if</span>
              <span className="text-foreground"> (!page) {"{"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">4</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-foreground">console.</span>
              <span className="text-[#82aaff]">log</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&quot;Oops! Looks like you took a wrong turn in the codebase.&quot;</span>
              <span className="text-foreground">);</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">5</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-foreground">console.</span>
              <span className="text-[#82aaff]">log</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&quot;But hey, since you&apos;re here...&quot;</span>
              <span className="text-foreground">);</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">6</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-foreground">console.</span>
              <span className="text-[#82aaff]">log</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&quot;🔍 Go back to the homepage and explore more cool stuff!&quot;</span>
              <span className="text-foreground">);</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">7</span>
            <span>
              <span className="text-foreground">{"  "}</span>
              <span className="text-[#c792ea]">throw new</span>
              <span className="text-foreground"> </span>
              <span className="text-[#ffd700]">Error</span>
              <span className="text-foreground">(</span>
              <span className="text-accent">&quot;404: PageNotFoundError 😕&quot;</span>
              <span className="text-foreground">);</span>
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
              <span className="text-muted-foreground">{"/* Suggestions:"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">11</span>
            <span>
              <span className="text-muted-foreground">{" * - Check the URL for typos"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">12</span>
            <span>
              <span className="text-muted-foreground">{" * - Use the site navigation"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">13</span>
            <span>
              <span className="text-muted-foreground">{" * - Or hit CMD+Z in real life 😉"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">14</span>
            <span>
              <span className="text-muted-foreground">{" */"}</span>
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">15</span>
            <span></span>
          </div>
          <div className="flex">
            <span className="w-8 text-right pr-4 text-muted-foreground select-none">16</span>
            <span>
              <span className="text-[#82aaff]">redirect</span>
              <span className="text-foreground">(</span>
              <Link href="/" className="text-accent hover:underline">
                &apos;home&apos;
              </Link>
              <span className="text-foreground">);</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
