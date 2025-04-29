import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";

actor DKeeper {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public type Note = {
    id : Text;
    title : Text;
    content : Text;
  };

  stable var notes : [Note] = [];

  public func generateUniqueId() : async Text {
    let canisterId = Principal.toText(Principal.fromActor(DKeeper));
    let timestamp = Time.now(); // Current time in nanoseconds
    return canisterId # "-" # Int.toText(timestamp);
  };

  public func prependNotes(element : [Note], array : [Note]) : async [Note] {
    return Array.append(element, array);
  };

  public query func getNotes() : async [Note] {
    Debug.print(debug_show(notes));
    return notes;
  };

  public func createNote(title : Text, content : Text) {
    let newNote : Note = {
      id = await generateUniqueId();
      title = title;
      content = content;
    };
    notes := await prependNotes([newNote], notes);
  };

  public func deleteNote(id : Text) {
    notes := Array.filter(notes, func (note : Note) : Bool { note.id != id });
  };

  public func editNote(updatedNote : Note) {
    notes := Array.mapFilter(
      notes,
      func (note : Note) : ?Note {
        if (note.id == updatedNote.id) {
          return ?{
            id = note.id;
            title = updatedNote.title;
            content = updatedNote.content;
          };
        };
        return ?note;
      }
    );
  }
};
