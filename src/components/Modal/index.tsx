import { Note } from "../../services/notes/type";
import Edit from "../Edit";

const Model = ({ note, onClose }: { note: Note; onClose: () => void }) => {
  return (
    <div
      className="fixed bg-opacity-95 overflow-y-auto  inset-0 bg-purple-900 z-10 pb-4 pt-14"
      onClick={e => {
        onClose();
      }}
    >
      <Edit data={note} onClose={onClose} />
    </div>
  );
};

export default Model;
