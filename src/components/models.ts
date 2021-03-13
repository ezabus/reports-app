export interface Report {
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

export interface FilterState {
  search: string;
  tags: string[];
}
