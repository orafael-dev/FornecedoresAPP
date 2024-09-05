import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Header,
  ListContainer,
  InputSearchContainer,
} from "./styles";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import { useEffect, useState } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log("erro", error);
      });
  }, []);

  console.log(contacts);

  return (
    <>
      <Container>
        {/* <Loader /> */}
        {/* <Modal danger /> */}
        <InputSearchContainer>
          <input type="text" placeholder="Pesquise um contato..." />
        </InputSearchContainer>
        <Header>
          <strong>
            {contacts.length}
            {contacts.length === 1 ? " contato" : " contatos"}
          </strong>
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

        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                  <small>{contact.category_name}</small>
                )}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Editar" height="24px" />
              </Link>

              <button type="button">
                <img src={trash} alt="Deletar" height="24px" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </>
  );
}
