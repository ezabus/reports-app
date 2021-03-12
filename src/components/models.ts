export interface Order {
  name: string;
  description: string;
  tags: string[];
}

export interface Meta {
  totalCount: number;
}

export interface Column {
  name: string;
  field?: string;
  label?: string;
  align?: string;
}
