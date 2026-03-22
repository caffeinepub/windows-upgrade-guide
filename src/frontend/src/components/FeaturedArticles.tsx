import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { Article } from "../backend.d";

const ARTICLE_IMAGES = [
  "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
];

const ARTICLE_CATEGORIES = ["Compatibility", "Preparation", "New Features"];
const ARTICLE_READ_TIMES = ["4 min read", "6 min read", "5 min read"];
const SKELETON_IDS = ["sk-1", "sk-2", "sk-3"];

interface Props {
  articles: Article[];
  isLoading: boolean;
}

export function FeaturedArticles({ articles, isLoading }: Props) {
  return (
    <section className="mt-10" id="articles">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Featured Articles</h2>
        <button
          type="button"
          className="text-sm text-primary hover:underline font-medium"
          data-ocid="articles.link"
        >
          View all articles →
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {SKELETON_IDS.map((id) => (
            <div
              key={id}
              className="space-y-3"
              data-ocid="articles.loading_state"
            >
              <Skeleton className="h-44 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p
          className="text-muted-foreground text-sm"
          data-ocid="articles.empty_state"
        >
          No articles available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              data-ocid={`articles.item.${i + 1}`}
            >
              <Card className="shadow-card overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative overflow-hidden h-44">
                  <img
                    src={ARTICLE_IMAGES[i] ?? ARTICLE_IMAGES[0]}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary/90 text-white text-xs">
                      {ARTICLE_CATEGORIES[i] ?? "Guide"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-primary font-medium mt-3">
                    {ARTICLE_READ_TIMES[i] ?? "3 min read"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
