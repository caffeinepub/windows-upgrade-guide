import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useActor } from "./useActor";

const UPGRADE_STEPS = [
  {
    title: "Back Up Your Data",
    description:
      "Before upgrading, ensure all important files, photos, documents, and settings are backed up to a safe location. This protects your data in case anything goes wrong during the upgrade process.",
    tips: "Use OneDrive, Google Drive, or an external hard drive. Consider using Windows Backup or File History for a full system backup. Cloud backup is recommended for critical files.",
    warnings:
      "Failure to back up your data before upgrading can result in permanent data loss. Even though upgrades rarely cause data loss, unexpected power failures or hardware issues can occur.",
    order: 1n,
  },
  {
    title: "Check System Requirements",
    description:
      "Windows 11 has specific hardware requirements including TPM 2.0, Secure Boot, and a compatible CPU. Your PC must meet all requirements before upgrading. Use the PC Health Check tool to verify compatibility.",
    tips: "Download the free PC Health Check tool from Microsoft's website to quickly determine if your PC is compatible. Check your BIOS settings to enable TPM 2.0 and Secure Boot if needed.",
    warnings:
      "Attempting to install Windows 11 on incompatible hardware may result in instability or installation failure. Microsoft may not provide security updates for unsupported hardware.",
    order: 2n,
  },
  {
    title: "Free Up Disk Space",
    description:
      "Windows 11 requires at least 64 GB of free storage space for the upgrade. Clear out old files, uninstall unused programs, and empty the Recycle Bin to ensure enough space is available.",
    tips: "Use the built-in Disk Cleanup tool (search in Start Menu) and select 'Clean up system files' for maximum results. Storage Sense in Settings can also automatically free up space.",
    warnings:
      "Insufficient disk space is one of the most common reasons for upgrade failures. Having less than 64 GB free may cause the installation to fail midway.",
    order: 3n,
  },
  {
    title: "Update Drivers & Software",
    description:
      "Update all device drivers (graphics, audio, network) and installed software to their latest versions before upgrading. This ensures maximum compatibility with Windows 11.",
    tips: "Check your PC manufacturer's website for the latest drivers. Use Device Manager to identify outdated drivers. Update graphics drivers from NVIDIA, AMD, or Intel directly.",
    warnings:
      "Outdated drivers can cause system instability, crashes, or missing functionality after upgrading. Some older software may not be compatible with Windows 11 at all.",
    order: 4n,
  },
  {
    title: "Run Windows Update",
    description:
      "Install all pending Windows 10 updates before starting the Windows 11 upgrade. Being on the latest Windows 10 version ensures the smoothest upgrade path and reduces compatibility issues.",
    tips: "Go to Settings > Update & Security > Windows Update and click 'Check for updates'. Install all available updates, including optional ones. Restart your PC after updates complete.",
    warnings:
      "Skipping pending updates may cause conflicts during the Windows 11 installation. Some Windows 11 upgrade paths require specific Windows 10 versions.",
    order: 5n,
  },
  {
    title: "Download Windows 11",
    description:
      "Download Windows 11 through Windows Update (recommended) or use the Media Creation Tool from Microsoft's website. The download is approximately 4-5 GB and may take time depending on your internet speed.",
    tips: "For the easiest upgrade, use Windows Update. For more control, download the Windows 11 ISO file from Microsoft's website and use it with the Media Creation Tool.",
    warnings:
      "Only download Windows 11 from official Microsoft sources. Third-party downloads may contain malware or modified versions that could harm your system.",
    order: 6n,
  },
  {
    title: "Install the Upgrade",
    description:
      "Run the Windows 11 installer and follow the on-screen instructions. The installation typically takes 30-60 minutes depending on your hardware. Your PC will restart several times during the process.",
    tips: "Plug your laptop into power before starting. Close all open applications and save your work. The installer will keep your files and most settings by default.",
    warnings:
      "Do not power off or unplug your PC during installation. Interrupting the upgrade can leave your system in an unbootable state. Ensure you have a stable power source.",
    order: 7n,
  },
  {
    title: "Post-Upgrade Setup",
    description:
      "After the upgrade completes, verify that your files are intact, check that all devices are working, reconfigure any personalization settings, and check app compatibility. Install any missing drivers.",
    tips: "Check Device Manager for any devices with warning signs. Re-enable any security software or features. Explore the new Start Menu, Settings app, and Windows 11 features like Snap Layouts.",
    warnings:
      "Some older applications may not work on Windows 11. Check with software vendors for Windows 11 compatible versions. Test critical business applications before full deployment.",
    order: 8n,
  },
];

const ARTICLES = [
  {
    title: "Is Your PC Ready for Windows 11?",
    excerpt:
      "Before diving into the upgrade, find out exactly what hardware requirements Windows 11 demands and how to check if your current PC makes the cut using Microsoft's free PC Health Check tool.",
  },
  {
    title: "Top 5 Things to Do Before Upgrading Windows",
    excerpt:
      "Preparation is everything. From backing up critical data to updating outdated drivers, these five essential steps will ensure your upgrade goes smoothly without losing anything important.",
  },
  {
    title: "Windows 11 New Features Overview",
    excerpt:
      "Discover what's new in Windows 11: redesigned Start Menu, Snap Layouts for multitasking, integrated Teams, improved gaming with DirectStorage, and a completely revamped Settings experience.",
  },
];

const REQUIREMENTS = [
  ["Processor", "1 GHz or faster, 2+ cores on 64-bit compatible processor"],
  ["RAM", "4 GB minimum (8 GB recommended)"],
  ["Storage", "64 GB or larger storage device"],
  ["System Firmware", "UEFI, Secure Boot capable"],
  ["TPM", "Trusted Platform Module (TPM) version 2.0"],
  ["Graphics Card", "DirectX 12 compatible / WDDM 2.x driver"],
  [
    "Display",
    'HD (720p) display, 9" diagonal or greater, 8 bits per color channel',
  ],
];

export function useSeedData() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const seeded = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || seeded.current) return;

    const seed = async () => {
      seeded.current = true;
      try {
        const [steps, articles, requirements] = await Promise.all([
          actor.getAllSteps(),
          actor.getAllArticles(),
          actor.getAllRequirements(),
        ]);

        const promises: Promise<unknown>[] = [];

        if (steps.length === 0) {
          for (const s of UPGRADE_STEPS) {
            promises.push(
              actor.addStep(
                s.title,
                s.description,
                s.tips,
                s.warnings,
                s.order,
              ),
            );
          }
        }

        if (articles.length === 0) {
          for (const a of ARTICLES) {
            promises.push(actor.addArticle(a.title, a.excerpt));
          }
        }

        if (requirements.length === 0) {
          for (const [key, value] of REQUIREMENTS) {
            promises.push(actor.addRequirement(key, value));
          }
        }

        if (promises.length > 0) {
          await Promise.all(promises);
          queryClient.invalidateQueries({ queryKey: ["steps"] });
          queryClient.invalidateQueries({ queryKey: ["articles"] });
          queryClient.invalidateQueries({ queryKey: ["requirements"] });
        }
      } catch (err) {
        console.error("Seed data error:", err);
      }
    };

    seed();
  }, [actor, isFetching, queryClient]);
}
