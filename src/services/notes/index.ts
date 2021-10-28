import firebaseNotesService from "../firebase/notes";
import { Note, NotesResponse } from "./type";

export const getAllNotes = (): Promise<NotesResponse> => {
  return firebaseNotesService.getNotes().then((notes: Note[] | null) => ({
    success: true,
    data: notes,
  }));
};

export const createNotes = (title: string, note: string): Promise<void> => {
  return firebaseNotesService.setNotes({ title, note });
};

export const updateNote = (
  id: string,
  title: string,
  note: string
): Promise<void> => {
  return firebaseNotesService.setNotes({ title, note }, id);
};

export const deleteNote = (id: string): Promise<void> => {
  return firebaseNotesService.deleteNote(id);
};
