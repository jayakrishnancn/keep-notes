import { Note } from "./type";

enum STORE_KEY {
  NOTES = "NOTES",
}

const sortByDate = (a: Note, b: Note) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(Number(b.id)).getTime() - new Date(Number(a.id)).getTime();
};

export const getAllLocalData = (): Note[] => {
  const data: Note[] =
    JSON.parse(localStorage.getItem(STORE_KEY.NOTES) || "") || [];

  return data.sort(sortByDate);
};

export const saveLocalData = (data: Note[]) => {
  if (!data) return;
  const newData = JSON.stringify(data);
  localStorage.setItem(STORE_KEY.NOTES, newData);
};

export const appendLocalData = (data: Note) => {
  const prevData = getAllLocalData();
  saveLocalData([...prevData, data]);
};

export const getNote = (id: string): Note | undefined => {
  const prevData = getAllLocalData();
  return prevData.find(item => item.id === id);
};
