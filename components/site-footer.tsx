const LINKS = ["About us", "Services", "Case Studies", "Blog", "How it Works", "Hire"]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        <span className="text-2xl font-extrabold text-primary">EV</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <li key={link}>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EddieVo. All rights reserved.</p>
      </div>
    </footer>
  )
}
