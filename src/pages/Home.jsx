import PageHeader from '../components/PageHeader';
import CreateNote from '../components/CreateNote';
import NoteBoard from '../components/NoteBoard';

export default function Home() {
  return (
    <>
      <PageHeader title="Todas las notas" />
      <CreateNote />
      <NoteBoard />
    </>
  );
}
