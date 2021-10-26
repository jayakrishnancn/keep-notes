export interface Note {
  title?: string | null;
  note?: string | null;
  id?: string | null;
}

export interface Response {
  success: boolean;
  data: any;
}

export interface NotesResponse extends Response {
  data: Note[] | null;
}
