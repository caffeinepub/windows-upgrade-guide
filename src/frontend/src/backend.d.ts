import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpgradeStep {
    id: bigint;
    title: string;
    order: bigint;
    tips: string;
    description: string;
    warnings: string;
}
export interface Article {
    title: string;
    excerpt: string;
}
export enum StepStatus {
    notStarted = "notStarted",
    completed = "completed",
    inProgress = "inProgress"
}
export interface backendInterface {
    addArticle(title: string, excerpt: string): Promise<bigint>;
    addRequirement(key: string, value: string): Promise<void>;
    addStep(title: string, description: string, tips: string, warnings: string, order: bigint): Promise<bigint>;
    deleteArticle(id: bigint): Promise<void>;
    deleteRequirement(key: string): Promise<void>;
    deleteStep(id: bigint): Promise<void>;
    getAllArticles(): Promise<Array<Article>>;
    getAllRequirements(): Promise<Array<[string, string]>>;
    getAllSteps(): Promise<Array<UpgradeStep>>;
    getUserProgress(): Promise<Array<[bigint, StepStatus]>>;
    resetProgress(): Promise<void>;
    updateArticle(id: bigint, title: string, excerpt: string): Promise<void>;
    updateProgress(stepId: bigint, status: StepStatus): Promise<void>;
    updateRequirement(key: string, value: string): Promise<void>;
    updateStep(id: bigint, title: string, description: string, tips: string, warnings: string, order: bigint): Promise<void>;
}
