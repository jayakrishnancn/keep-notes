import { fetchData } from "../apiServices";
import {
  appendLocalData,
  getAllLocalData,
  getNote,
  saveLocalData,
} from "./localData";
import { Note, NotesResponse, Response } from "./type";

/** api  */
export const getAllNotes = (): Promise<NotesResponse> => {
  return Promise.resolve({ success: true, data: getAllLocalData() });
};

export const createNotes = (title: string, note: string): Promise<Response> => {
  let id = new Date().getTime() + "";
  const data = { title, note, id };
  return fetchData(data, "POST").then(res => {
    appendLocalData(data);
    return res;
  });
};

export const updateNote = (
  id: string,
  title: string,
  note: string
): Promise<Response> => {
  if (getNote(id)) {
    const data: Note[] = [
      ...getAllLocalData().filter(item => item.id !== id),
      {
        id,
        title,
        note,
      },
    ];
    return fetchData(data, "POST").then(res => {
      saveLocalData(data);
      return res;
    });
  }
  return Promise.reject({
    success: false,
    message: "Cant find note",
    data: null,
  });
};

export const deleteNote = (id: string): Promise<Response> => {
  if (getNote(id)) {
    saveLocalData(getAllLocalData().filter(item => item.id !== id));
    return Promise.resolve({ success: true, data: null });
  }
  return Promise.reject({ success: false, message: "Cant find note" });
};
