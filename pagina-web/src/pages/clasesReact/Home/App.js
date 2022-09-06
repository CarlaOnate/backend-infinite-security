import './App.css';
import Pepo from '../Pepo'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PAGINA DE INICIO HEHE</p>
        <Link to="/jiji">
          IRME AL
        </Link>
        <Link to="/axios">
          Ver como usar axios
        </Link>
        <Pepo 
          edad={20}
        />
      </header>
    </div>
  );
}

export default Home;
