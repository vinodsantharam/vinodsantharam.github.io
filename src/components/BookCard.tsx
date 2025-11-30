import { Book } from "@/lib/books";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quote } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col sm:flex-row sm:h-[400px]">
      {/* Left side - Book Cover */}
      <div className="relative w-full sm:w-72 h-64 sm:h-auto flex-shrink-0 bg-muted">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, 256px"
        />
      </div>

      {/* Right side - Book Info */}
      <div className="flex flex-col flex-1">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{book.title}</CardTitle>
          <CardDescription className="text-base">
            {book.author}
            {book.year && ` • ${book.year}`}
          </CardDescription>
          {book.genre && (
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium w-fit">
              {book.genre}
            </span>
          )}
        </CardHeader>
        {book.favoriteQuotes.length > 0 && (
          <CardContent className="flex-1 pt-0">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Quote className="h-4 w-4 text-primary" />
                <span>Favorite Quotes</span>
              </div>
              <div className="space-y-3">
                {book.favoriteQuotes.map((quote, index) => (
                  <blockquote
                    key={index}
                    className="border-l-2 border-primary pl-4 italic text-sm text-muted-foreground leading-relaxed"
                  >
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </div>
    </Card>
  );
}
