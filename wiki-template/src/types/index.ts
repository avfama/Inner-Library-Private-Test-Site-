export interface WikiPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
  is_published: boolean;
}

export interface CreatePageInput {
  slug: string;
  title: string;
  content: string;
}

export interface UpdatePageInput {
  title?: string;
  content?: string;
  is_published?: boolean;
}

export interface SearchResult extends WikiPage {
  rank: number;
}

export interface User {
  id: string;
  email: string;
}
