import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotesList from "./NotesList";
import CreateArea from "./CreateArea";
import { dkeeperApp_backend } from "declarations/dkeeperApp_backend";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

interface Note {
  id: string;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const withLoading = useCallback(async (callback: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await callback();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNotes = useCallback(async () => {
    const response = await dkeeperApp_backend.getNotes();
    setNotes(response);
  }, []);

  useEffect(() => {
    withLoading(fetchNotes);
  }, [fetchNotes, withLoading]);

  const createNote = useCallback(
    async (title: string, content: string) => {
      await withLoading(async () => {
        await dkeeperApp_backend.createNote(title, content);
        setNotes((prevNotes) => [
          ...prevNotes,
          { id: Date.now().toString(), title, content },
        ]);
        toast.success("Note created successfully!");
      });
    },
    [withLoading]
  );

  const editNote = useCallback(
    async (updatedData: { id: string; title: string; content: string }) => {
      await withLoading(async () => {
        await dkeeperApp_backend.editNote(updatedData);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedData.id ? { ...note, ...updatedData } : note
          )
        );
        toast.success("Note updated successfully!");
      });
    },
    [withLoading]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      await withLoading(async () => {
        await dkeeperApp_backend.deleteNote(id);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        toast.success("Note deleted successfully!");
      });
    },
    [withLoading]
  );

  return (
    <div>
      <Header />
      <CreateArea onCreateNote={createNote} />
      <NotesList notes={notes} onDelete={deleteNote} onEdit={editNote} />
      <Footer />
      <ToastContainer />
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
