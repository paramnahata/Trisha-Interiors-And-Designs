export const IMG = {
  hallwayTv: "/images/interior-2.png",
  livingSofa: "/images/interior-3.png",
  vanity: "/images/interior-4.png",
  bedroom: "/images/interior-5.png",
  tvWall: "/images/interior-6.png",
  kiosk: "/images/interior-7.png",
  kioskRender: "/images/interior-8.png",
};

export type Category = "Residential" | "Living Spaces" | "Kitchens & Storage" | "Commercial";

export const WORK: { src: string; alt: string; caption: string; category: Category; shape: string }[] = [
  { src: IMG.tvWall, alt: "Living room media wall with marble panels, fluted wood and lit display niches", caption: "Living Space", category: "Living Spaces", shape: "md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-auto" },
  { src: IMG.hallwayTv, alt: "Living area with fluted TV panel, wooden shelving and linear wall pattern", caption: "Residential Interior", category: "Residential", shape: "md:col-span-7 aspect-[16/9]" },
  { src: IMG.bedroom, alt: "Bedroom with upholstered headboard and sliding wardrobe with curved inlays", caption: "Bedroom & Storage", category: "Kitchens & Storage", shape: "md:col-span-7 aspect-[16/9]" },
  { src: IMG.livingSofa, alt: "Grey L-shaped sofa with gold nesting tables and sheer drapes", caption: "Living Space", category: "Living Spaces", shape: "md:col-span-4 aspect-[4/5]" },
  { src: IMG.vanity, alt: "Wash area with backlit round mirror, fluted wall and walnut vanity", caption: "Residential Interior", category: "Residential", shape: "md:col-span-4 aspect-[4/5]" },
  { src: IMG.kiosk, alt: "Food kiosk in a shopping mall with display counters and wooden shelving", caption: "Commercial Interior", category: "Commercial", shape: "md:col-span-4 aspect-[4/5]" },
  { src: IMG.kioskRender, alt: "3D visualisation of a compact food kiosk layout", caption: "Commercial · 3D Visualisation", category: "Commercial", shape: "md:col-span-12 aspect-[16/7]" },
];
