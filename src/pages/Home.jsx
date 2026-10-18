import styles from './Home.module.css';
import SideBar from '../components/sideBar';
import Header from '../components/Header';
import Card from '../components/Card';
import CreateNote from '../components/CreateNote';
import Footer from '../components/Footer';
import Status from '../components/StatusNotes';
export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <SideBar />

      <div className={styles.mainContent}>
        <Header />
        <main className={styles.contentBody}>

          <Status />
          <CreateNote />
          
          <div className={styles.cardContainer}>
            <Card 
                status="En progreso" 
                statusType="warning"
                bgColor="#fef3c7"
                title="Revisar propuesta de diseño para cliente Acme"
                tag="Trabajo"
                time="Hoy, 18:00"
            />

            <Card 
                status="Hecha" 
                statusType="success"
                bgColor="#d1fae5"
                title="Comprar víveres semanales"
                tasks={[
                { id: 1, text: 'Leche de almendras tostadas', completed: true },
                { id: 2, text: 'Frutas frescas', completed: true }
                ]}
                tag="VidaCotidiana"
                time="Completada hace 2h"
            />

            <Card 
                status="Pendiente" 
                statusType="purple"
                bgColor="#e0f2fe"
                title="Ideas de fin de semana"
                tasks={[
                { id: 1, text: 'Paseo en bicicleta por el parque', completed: false }
                ]}
                tag="Ideas"
                time="Creado ayer"
            />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}