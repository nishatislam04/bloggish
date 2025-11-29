import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="group relative h-32 rounded-lg overflow-hidden cursor-pointer">
        {/* Background Image */}
        {category.featuredImage && (
          <Image
            src={category.featuredImage}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="font-bold text-white text-lg group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-white/80 text-sm">
            {category.postCount} {category.postCount === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>
    </Link>
  );
}
