const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Pages
  async getPages() {
    const res = await fetch(`${API_URL}/pages`);
    return res.json();
  },
  
  async getPage(id: string) {
    const res = await fetch(`${API_URL}/pages/${id}`);
    return res.json();
  },
  
  async getPageBySlug(slug: string) {
    const res = await fetch(`${API_URL}/pages/slug/${slug}`);
    return res.json();
  },
  
  async createPage(data: any) {
    const res = await fetch(`${API_URL}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  async updatePage(id: string, data: any) {
    const res = await fetch(`${API_URL}/pages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  async deletePage(id: string) {
    const res = await fetch(`${API_URL}/pages/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
  
  // Categories
  async getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
  },
  
  async getCategoryPages(categoryId: string) {
    const res = await fetch(`${API_URL}/categories/${categoryId}/pages`);
    return res.json();
  },
  
  // Tags
  async getTags() {
    const res = await fetch(`${API_URL}/tags`);
    return res.json();
  },
  
  async getTagPages(tagId: string) {
    const res = await fetch(`${API_URL}/tags/${tagId}/pages`);
    return res.json();
  },
  
  // Search
  async search(query: string) {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    return res.json();
  },
};
