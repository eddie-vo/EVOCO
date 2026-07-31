import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { TrustVideo } from "@/components/trust-video"
import { PartnerMarquee } from "@/components/partner-marquee"
import { Testimonials } from "@/components/testimonials"
import { CaseStudies } from "@/components/case-studies"
import { ScrollVideoScrollytelling } from "@/components/ScrollVideoScrollytelling"
import { ScrollyCta } from "@/components/scrolly-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <TrustVideo />
      <PartnerMarquee />
      <Testimonials />
      <CaseStudies />
      <ScrollVideoScrollytelling />
      <ScrollyCta />
      <SiteFooter />
    </main>
  )
}
