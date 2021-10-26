export const getAllNotes = () => Promise.resolve({ success: true, data: [] });

export const createNotes = (title: string, note: string) =>
  Promise.resolve({ success: true, data: { title, note } });

export const deleteNotes = (id: string) => Promise.resolve({ success: true });
