import { Note, NotesResponse, Response } from "./type";

enum STORE_KEY {
  NOTES = "NOTES",
}

const sortByDate = (a: Note, b: Note) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(Number(b.id)).getTime() - new Date(Number(a.id)).getTime();
};

const getAllLocalData = (): Note[] => {
  const data: Note[] =
    JSON.parse(localStorage.getItem(STORE_KEY.NOTES) || "") || [];

  return data.sort(sortByDate);
};
const saveLocalData = (data: Note[]) => {
  if (!data) return;
  const newData = JSON.stringify(data);
  localStorage.setItem(STORE_KEY.NOTES, newData);
};

const appendLocalData = (data: Note) => {
  const prevData = getAllLocalData();
  saveLocalData([...prevData, data]);
};

const getNote = (id: string): Note | undefined => {
  const prevData = getAllLocalData();
  return prevData.find(item => item.id === id);
};

/** api  */
export const getAllNotes = (): Promise<NotesResponse> => {
  return Promise.resolve({ success: true, data: getAllLocalData() });
};

export const createNotes = (title: string, note: string): Promise<Response> => {
  let id = new Date().getTime() + "";
  appendLocalData({ title, note, id });

  return Promise.resolve({ success: true, data: null });
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
    saveLocalData(data);
    return Promise.resolve({ success: true, data });
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
