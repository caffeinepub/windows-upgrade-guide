import { Button } from "@/components/ui/button";
import { Menu, Monitor, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "#checklist" },
  { label: "Tools", href: "#requirements" },
  { label: "Community", href: "#community" },
  { label: "Support", href: "#articles" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-header text-white shadow-lg"
      data-ocid="header.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-bold text-xl shrink-0"
          data-ocid="header.link"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <span className="text-white">UpgradeHub</span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 hover:text-white transition-colors font-medium"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Sign In */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-5"
            data-ocid="header.primary_button"
          >
            Sign in
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="header.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-secondary/95 border-t border-white/10"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full mt-2 w-full"
              >
                Sign in
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
