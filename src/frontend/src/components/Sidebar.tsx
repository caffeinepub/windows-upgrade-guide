import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { motion } from "motion/react";

const KEY_TIPS = [
  {
    id: "tip-backup",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning-muted",
    label: "Warning",
    text: "Always back up your data before starting any OS upgrade.",
  },
  {
    id: "tip-healthcheck",
    icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Tip",
    text: "Use PC Health Check tool to verify compatibility before downloading.",
  },
  {
    id: "tip-power",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning-muted",
    label: "Warning",
    text: "Never turn off your PC during installation — it can cause boot failures.",
  },
  {
    id: "tip-laptop",
    icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Tip",
    text: "Keep your laptop plugged into power throughout the entire upgrade process.",
  },
  {
    id: "tip-drivers",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success-muted",
    label: "Best Practice",
    text: "Update all drivers and run Windows Update before starting the upgrade.",
  },
];

const COMMUNITY_POSTS = [
  {
    id: "post-techuser",
    author: "TechUser42",
    time: "2h ago",
    content:
      "Successfully upgraded my 5-year-old laptop! The checklist here made it so easy.",
    likes: 14,
  },
  {
    id: "post-pcbuilder",
    author: "PCBuilder_Pro",
    time: "5h ago",
    content:
      "Don't skip the driver update step — had issues on my first attempt because of this.",
    likes: 27,
  },
  {
    id: "post-sarah",
    author: "Sarah_M",
    time: "1d ago",
    content: "TPM 2.0 was disabled in my BIOS, check that before you start!",
    likes: 39,
  },
];

interface RequirementsProps {
  requirements: [string, string][];
  isLoading: boolean;
}

export function Sidebar({ requirements, isLoading }: RequirementsProps) {
  return (
    <aside className="space-y-5" id="requirements">
      {/* Key Tips & Warnings */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">
              Key Tips &amp; Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            {KEY_TIPS.map((tip) => (
              <div
                key={tip.id}
                className={`flex gap-2.5 rounded-md p-2.5 ${tip.bg}`}
              >
                <tip.icon className={`w-4 h-4 ${tip.color} mt-0.5 shrink-0`} />
                <div>
                  <span className={`text-xs font-semibold ${tip.color}`}>
                    {tip.label}:{" "}
                  </span>
                  <span className="text-xs text-foreground/75">{tip.text}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* System Requirements */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-card" data-ocid="requirements.card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">
              System Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="space-y-2" data-ocid="requirements.loading_state">
                {["r1", "r2", "r3", "r4", "r5"].map((id) => (
                  <Skeleton key={id} className="h-4 w-full" />
                ))}
              </div>
            ) : requirements.length === 0 ? (
              <p
                className="text-sm text-muted-foreground"
                data-ocid="requirements.empty_state"
              >
                No requirements listed.
              </p>
            ) : (
              <div className="space-y-0">
                {requirements.map(([key, value], i) => (
                  <div key={key}>
                    {i > 0 && <Separator className="my-2" />}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground/70 shrink-0 w-28">
                        {key}
                      </span>
                      <span className="text-xs text-foreground/85 text-right leading-relaxed">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Community Forum Feed */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        id="community"
      >
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <CardTitle className="text-base font-bold">
                Community Forum
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {COMMUNITY_POSTS.map((post, i) => (
              <div key={post.id}>
                {i > 0 && <Separator className="mb-3" />}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">
                      {post.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.time}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>👍 {post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="text-xs text-primary hover:underline font-medium mt-1"
              data-ocid="community.link"
            >
              View all discussions →
            </button>
          </CardContent>
        </Card>
      </motion.div>
    </aside>
  );
}
