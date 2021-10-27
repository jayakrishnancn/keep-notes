export interface Note {
  title?: string | null;
  note?: string | null;
  id: string;
}

export interface Response {
  success: boolean;
  data: any;
  message?: string;
}

export interface NotesResponse extends Response {
  data: Note[] | null;
}
