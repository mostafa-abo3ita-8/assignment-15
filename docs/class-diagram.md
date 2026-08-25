classDiagram

    class User {
        +number id
        +string name
        +string email
        -string password
        -string phone
        #number age
        +NoteBook[] notebooks
        +constructor(id, name, email, password, phone, age)
        +displayInfo() void
        +addNotebook(notebook) void
    }

    class Admin {
        +manageNotes() void
    }

    class Note {
        +number id
        +string title
        +string content
        +User userId
        +constructor(id, title, content, userId)
        +preview() string
    }

    class NoteBook {
        -Note[] notes
        +addNote(note) void
        +removeNote(noteId) void
        +getNotes() Note[]
    }

    class Storage~T~ {
        -T[] items
        +addItem(item) void
        +removeItem(index) void
        +getAllItems() T[]
    }


    User <|-- Admin : Inheritance

    User o-- NoteBook : Aggregation

    NoteBook *-- Note : Composition

    User -- Note : Association