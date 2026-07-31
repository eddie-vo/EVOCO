import { Aperture, Boxes, Globe, Hexagon, Orbit, Gem } from "lucide-react"

const LOGOS = [
  { icon: Aperture, name: "Sampath" },
  { icon: Boxes, name: "AdClipse" },
  { icon: Hexagon, name: "PJC Bridge" },
  { icon: Orbit, name: "ClickOrder" },
  { icon: Gem, name: "TechMate" },
  { icon: Globe, name: "NovaWorks" },
]

export function PartnerMarquee() {
  const items = [...LOGOS, ...LOGOS]

  return (
    <section className="border-y border-border bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-sm text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Meet the people we are working with
        </h2>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-16 pr-16">
          {items.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center gap-3 text-muted-foreground grayscale transition hover:text-foreground hover:grayscale-0"
            >
              <logo.icon className="size-8" />
              <span className="text-lg font-semibold">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
