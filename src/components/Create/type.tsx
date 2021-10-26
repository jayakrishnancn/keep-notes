import { Note } from "../../services/notes/type";

export interface CreateProps {
  onCreate: (arg0: Note) => void;
  data?: Note;
  inModal?: boolean;
}
