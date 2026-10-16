import SideBar from '../components/sideBar.jsx';
import Header from '../components/Header.jsx';
import Card from '../components/Card.jsx';
import CreateNote from '../components/CreateNote.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
    return(
        <>
        <div className="home">
            <Header />
            <main>
                <Card />
                <CreateNote />
            </main>
            <Footer />
        </div>

        <SideBar />
        </>
    )
    }