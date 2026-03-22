import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StepStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllSteps() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["steps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSteps();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllRequirements() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["requirements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRequirements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      stepId,
      status,
    }: { stepId: bigint; status: StepStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProgress(stepId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useResetProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.resetProgress();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useAddStep() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      tips: string;
      warnings: string;
      order: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addStep(
        params.title,
        params.description,
        params.tips,
        params.warnings,
        params.order,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["steps"] });
    },
  });
}

export function useAddArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { title: string; excerpt: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.addArticle(params.title, params.excerpt);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useAddRequirement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { key: string; value: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.addRequirement(params.key, params.value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
  });
}
