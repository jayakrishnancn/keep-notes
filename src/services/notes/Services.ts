import { Note, NotesResponse, Response } from "./type";

enum STORE_KEY {
  NOTES = "NOTES",
}

const getLocalData = (): Note[] | null => {
  const data = localStorage.getItem(STORE_KEY.NOTES);
  console.log(data);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

const appendLocalData = (data: Note) => {
  const prevData = getLocalData() || [];
  const newData = JSON.stringify([...prevData, data]);
  localStorage.setItem(STORE_KEY.NOTES, newData);
};

const removeNote = (id: string): boolean => {
  const prevData: Note[] | null = getLocalData() || [];
  const dataWithId = prevData.find(item => item.id === id);
  if (!dataWithId) {
    return false;
  }
  const newData = JSON.stringify(
    prevData?.filter(item => item.id !== id) || []
  );

  localStorage.setItem(STORE_KEY.NOTES, newData);
  return true;
};

/** api  */
export const getAllNotes = (): Promise<NotesResponse> => {
  return Promise.resolve({ success: true, data: getLocalData() });
};

export const createNotes = (title: string, note: string): Promise<Response> => {
  appendLocalData({ title, note });
  return Promise.resolve({ success: true, data: null });
};

export const updateNote = (
  id: string,
  title: string,
  note: string
): Promise<Response> => {
  return Promise.resolve({ success: true, data: null });
};

export const deleteNote = (id: string) => {
  if (removeNote(id)) {
    return Promise.resolve({ success: true });
  }
  return Promise.reject({ success: true });
};
