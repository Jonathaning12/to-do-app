import styles from './Home.module.css';
import SideBar from '../components/sideBar';
import Header from '../components/Header';
import Card from '../components/Card';
import CreateNote from '../components/CreateNote';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <SideBar />

      <div className={styles.mainContent}>
        <Header />
        <main className={styles.contentBody}>
          <CreateNote />
          
          <div className={styles.cardContainer}>
            <Card />
            <Card />
            <Card />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}