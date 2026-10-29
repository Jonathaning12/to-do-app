import PageHeader from '../components/PageHeader';
import CreateNote from '../components/CreateNote';
import NoteBoard from '../components/NoteBoard';

export default function Live() {
  return (
    <>
      <PageHeader
        title="Vida cotidiana"
        description="Compras, casa, planes y todo lo que no es trabajo."
        category="vida"
      />
      <CreateNote category="vida" lockCategory />
      <NoteBoard
        category="vida"
        emptyTitle="Nada pendiente en casa"
        emptyText="Empieza una lista de compras: escribe el título y cada producto en una línea que empiece con «- »."
      />
    </>
  );
}
