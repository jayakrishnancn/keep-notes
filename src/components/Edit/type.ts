import { Note } from "../../services/notes/type";

export interface CreateProps {
  data: Note;
  onClose?: Function;
}
