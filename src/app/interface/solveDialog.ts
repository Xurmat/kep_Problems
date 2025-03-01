export interface SolveDialog {
    id: number;
    title: string;
    difficultTitle: string;
    tags: string;
    rating: number;
    attempts: number;
    active: boolean;
  }
  
  export interface SolveDialogRequest {
    first: number;
    rows: number;
    sortField: string | string[];
    sortOrder: number;
    filter?: {
        firstName: string;
    };
  }