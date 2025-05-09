export interface Tool {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface CreateToolData {
  title: string;
  link: string;
  description: string;
  tags: string[];
}
