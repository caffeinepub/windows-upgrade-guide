import { Monitor } from "lucide-react";
import { SiGithub, SiX, SiYoutube } from "react-icons/si";

const footerLinks = [
  {
    title: "Guides",
    links: [
      "Windows 11 Upgrade",
      "Windows 10 Tips",
      "Driver Updates",
      "System Requirements",
    ],
  },
  {
    title: "Tools",
    links: [
      "PC Health Check",
      "Compatibility Check",
      "Disk Cleanup",
      "Backup Guide",
    ],
  },
  {
    title: "Support",
    links: ["FAQ", "Contact Us", "Report an Issue", "Community Forum"],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-header text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">UpgradeHub</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Your trusted guide for a smooth and safe Windows upgrade
              experience. Step-by-step, every time.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-white/50 hover:text-white transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white/50 hover:text-white transition-colors"
              >
                <SiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/50 hover:text-white transition-colors"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3 text-white/90">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-sm text-white/50 hover:text-white/80 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="hover:text-white/60 transition-colors"
            >
              Terms of Service
            </button>
            <button
              type="button"
              className="hover:text-white/60 transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
