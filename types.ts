export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  tags: string[];
  createdAt: number;
}

export type ViewState = 'home' | 'admin';
export type Theme = 'light' | 'dark';
