import { get, push, query, ref, remove, set } from "@firebase/database";
import { db } from "../../config/firebase";
import { CreateUpdateNote, Note } from "../notes/type";

const getRef = (id?: string) => ref(db, "/notes" + (id ? `/${id}` : ""));

const sortByDate = (a: Note, b: Note) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return (
    new Date(Number(b.date || 0)).getTime() -
    new Date(Number(a.date || 0)).getTime()
  );
};

const getNotes = (id?: string): Promise<Note[] | null> => {
  return get(query(getRef())).then(snapshot => {
    if (snapshot.exists()) {
      let data: Note[] = [];
      snapshot.forEach(snap => {
        if (!snap.key) return;
        const note: Note = snap.val();
        data.push({
          ...note,
          id: snap.key,
        });
      });
      return data.sort(sortByDate);
    } else {
      return null;
    }
  }); //This should get the whole users node from db.
};

/**
 * Create new note if id is null, otherwise update note
 * @param data object to add to note
 * @param id null, for new entries, string for updating
 */
const setNotes = (
  data: CreateUpdateNote,
  id: string | null = null
): Promise<void> => {
  let date = new Date().getTime();
  data = { ...data, date };

  if (id) {
    return set(getRef(id), data);
  }
  return set(push(getRef()), data);
};

const deleteNote = (id: string) => {
  return remove(getRef(id));
};

const firebaseNotesService = { getNotes, setNotes, deleteNote };
export default firebaseNotesService;
