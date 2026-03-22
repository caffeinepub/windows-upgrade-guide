import { Button } from "@/components/ui/button";
import { ChevronDown, Shield } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const scrollToChecklist = () => {
    document
      .getElementById("checklist")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRequirements = () => {
    document
      .getElementById("requirements")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <img
        src="/assets/generated/hero-pc-keyboard.dim_1600x700.jpg"
        alt="PC keyboard and components"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-foreground/80 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          <Shield className="w-3.5 h-3.5" />
          Step-by-Step Windows Upgrade Guide
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Upgrade to Windows 11{" "}
          <span className="text-primary">with Confidence</span>
        </h1>
        <p className="text-lg md:text-xl text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          Follow our comprehensive checklist to safely upgrade your PC — from
          backup to post-install setup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={scrollToChecklist}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-md shadow-lg"
            data-ocid="hero.primary_button"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToRequirements}
            className="border-white/50 text-white hover:bg-white/10 hover:border-white font-semibold px-8 py-3 rounded-md bg-transparent"
            data-ocid="hero.secondary_button"
          >
            Check Compatibility
          </Button>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
