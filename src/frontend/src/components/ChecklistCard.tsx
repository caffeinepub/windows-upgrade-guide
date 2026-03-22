import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { StepStatus } from "../backend.d";
import type { UpgradeStep } from "../backend.d";
import {
  useGetUserProgress,
  useResetProgress,
  useUpdateProgress,
} from "../hooks/useQueries";

interface Props {
  steps: UpgradeStep[];
  isLoading: boolean;
}

function StatusBadge({ status }: { status: StepStatus }) {
  if (status === StepStatus.completed) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-success-muted text-success">
        ✓ Completed
      </span>
    );
  }
  if (status === StepStatus.inProgress) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
        ● In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
      ○ Not Started
    </span>
  );
}

export function ChecklistCard({ steps, isLoading }: Props) {
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const { data: progressData = [] } = useGetUserProgress();
  const updateProgress = useUpdateProgress();
  const resetProgress = useResetProgress();

  const progressMap = new Map<bigint, StepStatus>(
    progressData as [bigint, StepStatus][],
  );

  const completed = steps.filter(
    (s) => progressMap.get(s.id) === StepStatus.completed,
  ).length;
  const percent =
    steps.length > 0 ? Math.round((completed / steps.length) * 100) : 0;

  const handleStepClick = (step: UpgradeStep) => {
    const current = progressMap.get(step.id) ?? StepStatus.notStarted;
    setExpandedId((prev) => (prev === step.id ? null : step.id));
    if (current === StepStatus.notStarted) {
      updateProgress.mutate({ stepId: step.id, status: StepStatus.inProgress });
    }
  };

  const handleMarkComplete = (stepId: bigint) => {
    updateProgress.mutate(
      { stepId, status: StepStatus.completed },
      { onSuccess: () => toast.success("Step marked as complete!") },
    );
  };

  const handleMarkInProgress = (stepId: bigint) => {
    updateProgress.mutate(
      { stepId, status: StepStatus.inProgress },
      { onSuccess: () => toast.success("Step marked as in progress.") },
    );
  };

  const handleReset = () => {
    resetProgress.mutate(undefined, {
      onSuccess: () => toast.success("Progress reset successfully."),
    });
  };

  const sorted = [...steps].sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <Card className="shadow-card" data-ocid="checklist.card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold text-foreground">
              Windows 11 Upgrade Checklist
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {completed} of {steps.length} steps completed
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-primary">{percent}%</span>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>
        <Progress
          value={percent}
          className="h-2 mt-3"
          data-ocid="checklist.panel"
        />

        {steps.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={resetProgress.isPending}
            className="mt-2 text-muted-foreground hover:text-foreground self-start -ml-2"
            data-ocid="checklist.delete_button"
          >
            {resetProgress.isPending ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            )}
            Reset Progress
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-12"
            data-ocid="checklist.loading_state"
          >
            <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
            <span className="text-muted-foreground text-sm">
              Loading steps...
            </span>
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="checklist.empty_state"
          >
            No steps available yet.
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((step, idx) => {
              const status = progressMap.get(step.id) ?? StepStatus.notStarted;
              const isExpanded = expandedId === step.id;
              const ocidSuffix = idx + 1;

              return (
                <div
                  key={String(step.id)}
                  className={`border rounded-lg overflow-hidden transition-colors ${
                    isExpanded
                      ? "border-primary/30 bg-primary/[0.02]"
                      : "border-border bg-card"
                  }`}
                  data-ocid={`checklist.item.${ocidSuffix}`}
                >
                  {/* Step header */}
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 transition-colors"
                    onClick={() => handleStepClick(step)}
                    aria-expanded={isExpanded}
                  >
                    {/* Number circle */}
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        status === StepStatus.completed
                          ? "bg-success text-white"
                          : status === StepStatus.inProgress
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {status === StepStatus.completed
                        ? "✓"
                        : Number(step.order)}
                    </span>
                    <span className="flex-1 font-medium text-sm text-foreground">
                      {step.title}
                    </span>
                    <StatusBadge status={status} />
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-border space-y-3">
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {step.description}
                          </p>

                          {step.tips && (
                            <div className="flex gap-2.5 bg-primary/[0.06] border border-primary/20 rounded-md p-3">
                              <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-primary mb-0.5">
                                  Tip
                                </p>
                                <p className="text-xs text-foreground/75 leading-relaxed">
                                  {step.tips}
                                </p>
                              </div>
                            </div>
                          )}

                          {step.warnings && (
                            <div className="flex gap-2.5 bg-warning-muted border border-warning/30 rounded-md p-3">
                              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-warning-foreground mb-0.5">
                                  Warning
                                </p>
                                <p className="text-xs text-foreground/75 leading-relaxed">
                                  {step.warnings}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 pt-1">
                            {status !== StepStatus.completed && (
                              <Button
                                size="sm"
                                onClick={() => handleMarkComplete(step.id)}
                                disabled={updateProgress.isPending}
                                className="bg-success hover:bg-success/90 text-white text-xs"
                                data-ocid={`checklist.confirm_button.${ocidSuffix}`}
                              >
                                {updateProgress.isPending ? (
                                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                ) : null}
                                Mark Complete
                              </Button>
                            )}
                            {status !== StepStatus.inProgress &&
                              status !== StepStatus.completed && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkInProgress(step.id)}
                                  disabled={updateProgress.isPending}
                                  className="text-xs"
                                  data-ocid={`checklist.secondary_button.${ocidSuffix}`}
                                >
                                  Mark In Progress
                                </Button>
                              )}
                            {status === StepStatus.completed && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkInProgress(step.id)}
                                disabled={updateProgress.isPending}
                                className="text-xs text-muted-foreground"
                                data-ocid={`checklist.toggle.${ocidSuffix}`}
                              >
                                Undo
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
