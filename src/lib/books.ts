export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  favoriteQuotes: string[];
  year?: number;
  genre?: string;
}

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/atomic-habits.jpg",
    favoriteQuotes: [
      "You do not rise to the level of your goals. You fall to the level of your systems.",
      "Every action you take is a vote for the type of person you wish to become.",
      "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.",
    ],
    year: 2018,
    genre: "Self-Help",
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    favoriteQuotes: [
      "Deep work is the ability to focus without distraction on a cognitively demanding task.",
      "To produce at your peak level you need to work for extended periods with full concentration on a single task free from distraction.",
      "Clarity about what matters provides clarity about what does not.",
    ],
    year: 2016,
    genre: "Productivity",
  },
  {
    id: "3",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverImage:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
    favoriteQuotes: [
      "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.",
      "The design of everyday things is in great danger of becoming the design of superfluous things.",
      "Two of the most important characteristics of good design are discoverability and understanding.",
    ],
    year: 1988,
    genre: "Design",
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "/clean-code.jpg",
    favoriteQuotes: [
      "Clean code is simple and direct. Clean code reads like well-written prose.",
      "Truth can only be found in one place: the code.",
      "The ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code.",
    ],
    year: 2008,
    genre: "Programming",
  },
];
