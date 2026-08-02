import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <main>
      <Navbar tone="light" />

      <section className="bg-background pt-16">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: August 2, 2026
          </p>

          <div className="mt-12 space-y-8 text-base leading-relaxed text-slate-600">
            <p>
              Eddie Vo Company (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This
              policy explains what information we collect when you visit our website or contact us,
              and how we use it.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
              <p className="mt-3">
                When you fill out a form or reach out, we may collect your name, email address,
                company name, and any details you choose to share about your project. We also
                collect basic usage data such as pages visited and device type through standard
                analytics tools.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">How we use information</h2>
              <p className="mt-3">
                We use your information to respond to inquiries, deliver services you request,
                improve our website, and communicate about our work. We do not sell your personal
                information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
              <p className="mt-3">
                Our site may use cookies or similar technologies to understand how visitors use the
                site and to remember preferences. You can control cookies through your browser
                settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Third parties</h2>
              <p className="mt-3">
                We may use trusted service providers (for example hosting, analytics, or form
                delivery) who process data on our behalf. They are only permitted to use that data
                to perform services for us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                Questions about this policy? Reach us via our{" "}
                <a href="/contact" className="font-medium text-primary hover:underline">
                  contact page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
