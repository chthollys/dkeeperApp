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

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await dkeeperApp_backend.getNotes();
      console.log(response);
      setNotes(response);
    } catch (error) {
      console.error('Error fetching notes: ', error);
      toast.error('Failed to fetch notes. Please try again later.');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = useCallback(async (title: string, content: string) => {
    setIsLoading(true);
    try {
      await dkeeperApp_backend.createNote(title, content);
      fetchNotes();
      toast.success('Note created successfully!');
    } catch (error) {
      console.error('Error creating note: ', error);
      toast.error('Failed to create note.');
    }
    setIsLoading(false);
  }, []);

  const editNote = useCallback(async (updatedData: { id: string, title: string; content: string }) => {
    setIsLoading(true);
    try {
      await dkeeperApp_backend.editNote(updatedData);
      toast.success('Note updated successfully!');
    } catch (error) {
      console.error('Error editing note: ', error);
      toast.error('Failed to update note.');
    }
    setIsLoading(false);
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await dkeeperApp_backend.deleteNote(id);
      fetchNotes();
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note: ', error);
      toast.error('Failed to delete note.');
    }
    setIsLoading(false);
  }, []);

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
