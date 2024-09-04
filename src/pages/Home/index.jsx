import { Link } from 'react-router-dom'
import { Card, Container, Header, ListContainer, InputSearchContainer } from "./styles";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import Modal from '../../components/Modal';


export default function Home() {
  return (

    <>
      <Container>
        <Modal danger />
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise um contato..." />
      </InputSearchContainer>
        <Header>
          <strong>3 contatos</strong>
          <Link to="/new">Novo contato</Link>
        </Header>
      </Container>

      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Rafael Almeida</strong>
              <small>alimentos</small>
            </div>
            <span>rafael@alimentos.com</span>
            <span>(48) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
            <img src={edit} alt="Editar" height="24px" />
            </Link>

            <button type="button">
              <img src={trash} alt="Deletar" height="24px" />
            </button>
          </div>
        </Card>

      </ListContainer>
    </>
  )
}
