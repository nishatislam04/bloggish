export interface Author {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  featuredImage?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  coverPhoto?: string;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt: string;
  readTime: string;
  views: number;
  reactions: {
    likes: number;
  };
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  privacy: "PUBLIC" | "PRIVATE" | "UNLISTED";
}

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  sortBy?: "newest" | "popular" | "trending";
}
