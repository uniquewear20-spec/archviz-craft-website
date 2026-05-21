import { portfolioImages } from "@/app/data/gallery";
// Fixed Import: Added /app and curly braces to match your folder structure
import { CircularTestimonials } from "@/app/components/ui/circular-testimonials";

export default function WorkPage() {
  // Filter bedroom images from the gallery data
  const bedroomImages = portfolioImages.filter(img => img.category === 'bedrooms');

  const bedroomTestimonials = [
    {
      quote: "The morning light in our master suite looked like a photograph, not a render.",
      name: "Sarah Jenkins",
      designation: "Interior Architect",
      src: "/images/portfolio/bedrooms/elegant-master-bedroom1.png"
    },
    {
      quote: "Wasim's attention to fabric textures is ArchViz Craft's superpower.",
      name: "Marcello Rossi",
      designation: "Luxury Developer",
      src: "/images/portfolio/bedrooms/elegant-master-bedroom3.png"
    },
    {
      quote: "Exceptional atmosphere in the penthouse bedroom renders.",
      name: "Elena Rodriguez",
      designation: "Boutique Designer",
      src: "/images/portfolio/bedrooms/elegant-master-bedroom5.png"
    }
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-40">
      {/* Editorial Header Section */}
      <section className="max-w-6xl mx-auto px-8 mb-24 text-center">
        <h1 className="text-[10px] tracking-[0.5em] font-light uppercase text-stone-500 mb-6">
          01. Bedrooms — Private Sanctuaries
        </h1>
        <p className="text-xl md:text-3xl font-light tracking-wide leading-relaxed max-w-4xl mx-auto uppercase">
          CRAFTING THE UNBUILT — A collection of ultra-luxury visualizations where technical precision meets cinematic storytelling.
        </p>
      </section>

      {/* Portfolio Grid - 3 Columns */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto mb-32">
        {bedroomImages.map((img) => (
          /* Fixed: Using img.src as the key because 'id' was missing in your data */
          <div key={img.src} className="overflow-hidden bg-stone-900 aspect-[4/5]">
            <img 
              src={img.src} 
              alt="Luxury Bedroom ArchViz" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
            />
          </div>
        ))}
      </section>

      {/* Interactive Circular Testimonials Component */}
      <section className="py-24 border-t border-stone-900">
        <CircularTestimonials 
          testimonials={bedroomTestimonials} 
          colors={{
            name: "#FFFFFF",
            designation: "#78716c",
            testimony: "#a8a29e",
            arrowBackground: "#1c1917",
            arrowHoverBackground: "#C5A059" // Using the gold accent color from your brand
          }}
        />
      </section>
    </main>
  );
}