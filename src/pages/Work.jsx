import styles from "./Work.module.css";
import SideBar from "../components/sideBar";
import Header from "../components/Header";
import Card from "../components/Card";
import WorkStates from "../components/WorkStates";

export default function Work() {
  return (
    <div className={styles.workLayout}>
      <SideBar />

      <div className={styles.mainContent}>
        <Header />
        <main className={styles.contentBody}>
          <div className={styles.pageHeader}>
            <div className={styles.headerTitles}>
              <span className={styles.badgeCategory}>
                WORKSPACE PRO • Q3 SPRINT
              </span>
              <h1>Espacio de Trabajo</h1>
              <p>
                Organiza tus proyectos laborales, entregas y sprints de equipo
                con claridad.
              </p>
            </div>

            <button type="button" className={styles.actionBtn}>
              + Nueva Nota de Trabajo
            </button>
          </div>

          {/*Componente de métricas superiores */}
          <WorkStates />
          <div className={styles.cardContainer}>
            <Card
              status="Pinned"
              statusType="warning"
              bgColor="#fef3c7"
              title="Lanzamiento v2.0 - Roadmap & Checklist Final"
              tasks={[
                {
                  id: 1,
                  text: "Pruebas de carga y latencia <85ms",
                  completed: true,
                },
                {
                  id: 2,
                  text: "Auditoría de seguridad tokens JWT",
                  completed: true,
                },
                {
                  id: 3,
                  text: "Revisión de copywriting con Product Marketing",
                  completed: true,
                },
                {
                  id: 4,
                  text: "Deploy a staging y smoke test final",
                  completed: false,
                },
              ]}
              tag="Proyectos"
              time="Viernes 18:00"
            />
            <Card
              status="Reunión"
              statusType="purple"
              bgColor="#f3e8ff"
              title="Minutas de reunión con Stakeholders & Presupuesto Q4"
              tasks={[
                {
                  id: 1,
                  text: "Aprobación de incremento del 18% en infraestructura",
                  completed: true,
                },
                {
                  id: 2,
                  text: "Validar arquitectura de microservicios con CTO",
                  completed: false,
                },
              ]}
              tag="Reuniones"
              time="Ayer a las 16:30"
            />
            <Card
              status="En Progreso"
              statusType="warning"
              bgColor="#ffedd5"
              title="Rediseño Componentes UI en Figma"
              tasks={[
                {
                  id: 1,
                  text: "Actualizar fichas de notas y selectores de color",
                  completed: true,
                },
                {
                  id: 2,
                  text: "Crear variantes en modo oscuro",
                  completed: false,
                },
              ]}
              tag="Diseño"
              time="Hoy, 19:00"
            />
            <Card
              status="Revisión"
              statusType="warning"
              bgColor="#fef9c3"
              title="Deck de Presentación Serie A - Métricas SaaS"
              tasks={[
                { id: 1, text: "Gráficos de Cohortes Q2", completed: true },
                {
                  id: 2,
                  text: "Proyección de ingresos 2027",
                  completed: false,
                },
              ]}
              tag="Finanzas"
              time="Mañana 11:00"
            />
            <Card
              status="Urgente"
              statusType="purple"
              bgColor="#fee2e2"
              title="Code Review: Motor de Sync & WebSockets"
              tasks={[
                {
                  id: 1,
                  text: "Resolver condición de carrera en notas concurrentes",
                  completed: false,
                },
                {
                  id: 2,
                  text: "Implementar retribución de reconexión sin pérdida",
                  completed: false,
                },
              ]}
              tag="Urgente"
              time="En revisión"
            />
            <Card
              status="Completada"
              statusType="success"
              bgColor="#d1fae5"
              title="Documentación de Endpoints API v1"
              tasks={[
                {
                  id: 1,
                  text: "Generar Colección de Postman",
                  completed: true,
                },
                {
                  id: 2,
                  text: "Publicar Swagger Docs para equipo Frontend",
                  completed: true,
                },
              ]}
              tag="Desarrollo"
              time="Completado hace 3h"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
