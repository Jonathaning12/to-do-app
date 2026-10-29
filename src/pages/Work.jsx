import PageHeader from '../components/PageHeader';
import WorkStates from '../components/WorkStates';
import CreateNote from '../components/CreateNote';
import NoteBoard from '../components/NoteBoard';

export default function Work() {
  return (
    <>
      <PageHeader
        title="Área de trabajo"
        description="Proyectos, entregas y reuniones. Lo que vence esta semana, a la vista."
        category="trabajo"
      />
      <WorkStates />
      <CreateNote category="trabajo" lockCategory />
      <NoteBoard
        category="trabajo"
        emptyTitle="Sin notas de trabajo"
        emptyText="Anota aquí entregas, minutas y pendientes del equipo. Ponles fecha para verlas en la semana."
      />
    </>
  );
}
