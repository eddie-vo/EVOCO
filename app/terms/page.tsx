import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <main>
      <Navbar tone="light" />

      <section className="bg-background pt-16">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: August 2, 2026
          </p>

          <div className="mt-12 space-y-8 text-base leading-relaxed text-slate-600">
            <p>
              These Terms &amp; Conditions govern your use of the Eddie Vo Company website and any
              related services offered through it. By using this site, you agree to these terms.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Use of the site</h2>
              <p className="mt-3">
                You may browse and use this website for lawful purposes only. You agree not to
                misuse the site, attempt unauthorized access, or interfere with its operation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Services &amp; engagements</h2>
              <p className="mt-3">
                Project work, retainers, and deliverables are governed by separate agreements
                between Eddie Vo Company and the client. Website content does not constitute a
                binding offer unless confirmed in writing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Intellectual property</h2>
              <p className="mt-3">
                All branding, copy, design, and media on this site are owned by Eddie Vo Company or
                our licensors. You may not copy, redistribute, or reuse them without prior written
                permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Disclaimer</h2>
              <p className="mt-3">
                This website is provided &quot;as is.&quot; We make no warranties about accuracy,
                completeness, or availability. To the fullest extent permitted by law, Eddie Vo
                Company is not liable for any damages arising from your use of the site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Changes</h2>
              <p className="mt-3">
                We may update these terms from time to time. Continued use of the site after changes
                are posted means you accept the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                Questions about these terms? Reach us via our{" "}
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
