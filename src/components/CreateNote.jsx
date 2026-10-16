

export default function CreateNote() {
    return (
        <div className="create-note">
            <h2>Create a Note</h2>
            <form>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Take a note..."></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}