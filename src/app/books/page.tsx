import { books } from "@/lib/books";
import { BookCard } from "@/components/BookCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books I've Read | Vinod Santharam",
  description:
    "A collection of books that have influenced my thinking and work",
};

export default function BooksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Books I&apos;ve Read
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A curated collection of books that have shaped my perspective on
          software development, design, productivity, and life. Each book comes
          with my favorite quotes that resonated with me.
        </p>
      </div>

      <div className="space-y-8 max-w-5xl">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books added yet.</p>
        </div>
      )}
    </div>
  );
}
