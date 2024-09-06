import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Container,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import lupa from "../../assets/images/icons/lupa.svg"

import Loader from "../../components/Loader";
import Button from "../../components/Button"
import ContactsServices from "../../services/ContactsService";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsServices.listContacts(orderBy);

        setContacts(contactsList);
      } catch {
        setHasError(true)
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquise um contato..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? " contato" : " contatos"}
        </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={lupa} alt="Lupa" width="110px" height="110px" />
          <div className="details">
            <strong>Ooops! Alguma coisa aconteceu...</strong>
            <Button type="button">Tentar Novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {filteredContacts.length > 0 && (
        <ListHeader order={orderBy}>
          <button onClick={handleToggleOrderBy} type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
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
    </Container>
  );
}
