export interface Note {
  id: string;
  date?: number;
  note?: string;
  title?: string;
}

interface date {
  date?: number;
}
interface description {
  note: string;
}
interface title {
  title: string;
}

export type CreateUpdateNote = date &
  (description | title | (description & title));
export interface Response {
  success: boolean;
  data: any;
  message?: string;
}

export interface NotesResponse extends Response {
  data: Note[] | null;
}
