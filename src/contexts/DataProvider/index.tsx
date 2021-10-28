import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllNotes } from "../../services/notes/services";
import { Note } from "../../services/notes/type";

interface DataProps {
  data: Note[] | null;
  fetchData: Function;
}

const DataContext = createContext<DataProps>({
  data: null,
  fetchData: () => {},
});

export const DataProvider = (props: any) => {
  const [data, setData] = useState<Note[] | null>(null);

  const fetchData = useCallback(() => {
    getAllNotes().then(({ data }) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider
      value={{
        data,
        fetchData,
      }}
      {...props}
    />
  );
};
export const useData = () => useContext(DataContext);
