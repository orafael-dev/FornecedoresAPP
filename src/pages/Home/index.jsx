import { Card, Container, Header, ListContainer, InputSearchContainer } from "./styles";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";


export default function Home() {
  return (

    <>
      <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise um contato..." />
      </InputSearchContainer>
        <Header>
          <strong>3 contatos</strong>
          <a href="#">Novo contato</a>
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
            <a href="/">
            <img src={edit} alt="Editar" height="24px" />
            </a>

            <button type="button">
              <img src={trash} alt="Deletar" height="24px" />
            </button>
          </div>
        </Card>
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
            <a href="/">
            <img src={edit} alt="Editar" height="24px" />
            </a>

            <button type="button">
              <img src={trash} alt="Deletar" height="24px" />
            </button>
          </div>
        </Card>
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
            <a href="/">
            <img src={edit} alt="Editar" height="24px" />
            </a>

            <button type="button">
              <img src={trash} alt="Deletar" height="24px" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </>
  )
}
