import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChecklistCard } from "./components/ChecklistCard";
import { FeaturedArticles } from "./components/FeaturedArticles";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Sidebar } from "./components/Sidebar";
import {
  useGetAllArticles,
  useGetAllRequirements,
  useGetAllSteps,
} from "./hooks/useQueries";
import { useSeedData } from "./hooks/useSeedData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
    },
  },
});

function AppContent() {
  useSeedData();

  const { data: steps = [], isLoading: stepsLoading } = useGetAllSteps();
  const { data: articles = [], isLoading: articlesLoading } =
    useGetAllArticles();
  const { data: requirements = [], isLoading: requirementsLoading } =
    useGetAllRequirements();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10" id="checklist">
          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checklist (2/3 width) */}
            <div className="lg:col-span-2">
              <ChecklistCard steps={steps} isLoading={stepsLoading} />
            </div>

            {/* Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
              <Sidebar
                requirements={requirements as [string, string][]}
                isLoading={requirementsLoading}
              />
            </div>
          </div>

          {/* Featured Articles */}
          <FeaturedArticles articles={articles} isLoading={articlesLoading} />
        </div>
      </main>

      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
