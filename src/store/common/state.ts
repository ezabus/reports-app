export interface ReportsAppState {
  tags: string[];
}

function state(): ReportsAppState {
  return {
    tags: []
  };
}

export default state;
