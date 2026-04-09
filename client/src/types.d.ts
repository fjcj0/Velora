type MarkdownItem = {
  image: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  fuel: string;
  transmission: string;
  location: string;
  description: string;
};
type MessageType = {
  type: "user" | "ai";
  message: string;
  markdowns?: MarkdownItem[];
  profilePic?: string;
};
