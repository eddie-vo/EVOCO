export type CaseStudy = {
  slug: string
  title: string
  client: string
  image: string
  bg: string
  accent: string
  summary: string
  body: string
  industry: string
  services: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "baaff",
    title: "Website & Photobooth for BAAFF",
    client: "Boston Asian American Film Festival",
    image: "/case-study-baaff.png",
    bg: "bg-[#fff4ec]",
    accent: "#f97316",
    summary:
      "Website redesign, interactive photobooth, plus video and photo work for festival events.",
    body: "For the Boston Asian American Film Festival (BAAFF), we redesigned the website to better showcase films, programming, and community — and built an interactive photobooth solution for their events so attendees could capture and share the festival experience on-site. We also handled video and photo work across the festival, covering moments that define the community on screen and in the room.",
    industry: "Arts & Culture",
    services: ["Web Development", "Event Experiences", "Interactive", "Video", "Photography"],
  },
  {
    slug: "samuel-vartan",
    title: "Website & Ecommerce for Samuel Vartan",
    client: "Samuel Vartan Collections",
    image: "/case-study-fashion.png",
    bg: "bg-[#f3f1ee]",
    accent: "#1c1917",
    summary:
      "Website branding and ecommerce integration for a beloved fashion brand in Boston.",
    body: "Samuel Vartan Collections needed a digital home that matched its timeless point of view. We led website branding and ecommerce integration for this beloved Boston fashion brand — from visual system and story-led product pages to a seamless checkout experience that feels as considered as the clothes.",
    industry: "Fashion / Retail",
    services: ["Brand", "Web Development", "Ecommerce"],
  },
  {
    slug: "partners-healthcare-vr",
    title: "VR Project for Partners Healthcare",
    client: "Partners Healthcare",
    image: "/case-study-partners-healthcare.png",
    bg: "bg-[#e8f4f8]",
    accent: "#0088a3",
    summary:
      "Stereoscopic VR videos for rehab patients in Boston — blending audio, visuals, and voice-over.",
    body: "For Partners Healthcare in Boston, we created stereoscopic VR videos for rehab patients — a carefully produced blend of audio, visuals, and voice-over designed to support recovery. The engagement also included training video production and explainer videos in the pre-AI era, crafted end-to-end with traditional production craft.",
    industry: "Healthcare",
    services: ["VR / Stereoscopic Video", "Training Video", "Explainer Video"],
  },
  {
    slug: "takeda-pharmaceuticals",
    title: "Media & VR for Takeda Pharmaceuticals",
    client: "Takeda Pharmaceuticals",
    image: "/case-study-takeda.png",
    bg: "bg-[#fff5f5]",
    accent: "#e30613",
    summary:
      "Media production for internal teams and global VR initiatives for documentation auditing.",
    body: "For Takeda Pharmaceuticals, we produced media for internal teams and supported global initiatives that used VR for documentation auditing — helping teams capture, review, and share complex processes with clarity across regions.",
    industry: "Healthcare",
    services: ["Media Production", "VR", "Documentation"],
  },
  {
    slug: "kw-success",
    title: "Marketing & MLS Sites for KW Teams",
    client: "Independent teams at Keller Williams Realty Success",
    image: "/case-study-kw-success.png",
    bg: "bg-[#f8f6f4]",
    accent: "#c8102e",
    summary:
      "Marketing and drone videos, strategy, and MLS-powered websites for independent teams under the brokerage.",
    body: "Within Keller Williams Realty Success, individual teams operate independently under the brokerage umbrella. We partnered with several of those teams on marketing videos and drone videos, go-to-market strategies, and MLS-powered websites — so each team could brand itself clearly, showcase live listings, and compete with a polished digital presence of its own.",
    industry: "Real Estate",
    services: ["Marketing Video", "Drone Video", "Strategy", "MLS Website"],
  },
]

export const CASE_INDUSTRIES = [
  "All",
  ...Array.from(new Set(CASE_STUDIES.map((c) => c.industry))),
] as const
