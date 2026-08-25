// ==========================================
// 1. User Class
// ==========================================

class User {
    public id: number;
    public name: string;
    public email: string;

    private password: string;
    private phone: string;

    protected age: number;

    // Aggregation
    public notebooks: NoteBook[] = [];

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }

    public displayInfo(): void {
        console.log("----- User Information -----");
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
}


// ==========================================
// 2. Admin Class - Inheritance
// ==========================================

class Admin extends User {

    public manageNotes(): void {
        console.log("Admin is managing notes...");
    }
}


// ==========================================
// 3. Note Class
// ==========================================

class Note {
    public id: number;
    public title: string;
    public content: string;

    // Association with User
    public userId: User;

    constructor(
        id: number,
        title: string,
        content: string,
        userId: User
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }

    public preview(): string {
        if (this.content.length > 30) {
            return this.content.substring(0, 30) + "...";
        }

        return this.content;
    }
}


// ==========================================
// 4. NoteBook Class - Composition
// ==========================================

class NoteBook {
    private notes: Note[] = [];

    public addNote(note: Note): void {
        this.notes.push(note);
        console.log(`Note "${note.title}" added successfully.`);
    }

    public removeNote(noteId: number): void {
        this.notes = this.notes.filter(
            (note) => note.id !== noteId
        );

        console.log(`Note with ID ${noteId} removed.`);
    }

    public getNotes(): Note[] {
        return this.notes;
    }
}


// ==========================================
// 5. Generic Storage Class
// ==========================================

class Storage<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    public getAllItems(): T[] {
        return this.items;
    }
}


// ==========================================
// 6. Testing the Classes
// ==========================================

// Create User
const user = new User(
    1,
    "Mostafa",
    "mostafa@gmail.com",
    "123456",
    "01000000000",
    22
);

user.displayInfo();


// Create Admin
const admin = new Admin(
    2,
    "Admin",
    "admin@gmail.com",
    "admin123",
    "01111111111",
    30
);

admin.displayInfo();
admin.manageNotes();


// Create NoteBook
const notebook = new NoteBook();


// User owns the Notebook
user.addNotebook(notebook);


// Create Notes
const note1 = new Note(
    1,
    "Node.js",
    "I am learning Node.js and TypeScript OOP concepts.",
    user
);

const note2 = new Note(
    2,
    "TypeScript",
    "TypeScript provides powerful object oriented programming features.",
    user
);


// Add Notes to Notebook
notebook.addNote(note1);
notebook.addNote(note2);


// Preview Note
console.log("\n----- Note Preview -----");
console.log(note1.preview());


// Display all notes
console.log("\n----- All Notes -----");
console.log(notebook.getNotes());


// Remove Note
notebook.removeNote(1);


// Display Notes after removing
console.log("\n----- Notes After Remove -----");
console.log(notebook.getNotes());


// ==========================================
// 7. Testing Generic Storage
// ==========================================

// Storage for Users
const userStorage = new Storage<User>();

userStorage.addItem(user);
userStorage.addItem(admin);

console.log("\n----- User Storage -----");
console.log(userStorage.getAllItems());


// Storage for Notes
const noteStorage = new Storage<Note>();

noteStorage.addItem(note1);
noteStorage.addItem(note2);

console.log("\n----- Note Storage -----");
console.log(noteStorage.getAllItems());


// Storage for Numbers
const numberStorage = new Storage<number>();

numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.addItem(30);

console.log("\n----- Number Storage -----");
console.log(numberStorage.getAllItems());