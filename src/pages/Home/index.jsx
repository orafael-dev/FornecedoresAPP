/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  Container,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  EmptyListContainer,
  SearchNotFoundContainer,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import lupa from "../../assets/images/lupa.svg";
import noContacts from "../../assets/images/noContacts.svg";
import search from "../../assets/images/search.svg";

import Loader from "../../components/Loader";
import Button from "../../components/Button";
import ContactsService from "../../services/ContactsService";
import Modal from "../../components/Modal";
import toast from '../../utils/toast'

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true)
  }

  function handleCloseDeleteContact() {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted(null)
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true)

      await ContactsService.deleteContact(contactBeingDeleted.id)

      setContacts(prevState => prevState.filter((contact) => contact.id !== contactBeingDeleted.id))

      handleCloseDeleteContact()

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!'
      })
    } finally {
        setIsLoadingDelete(false)
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger={true}
        isLoading={isLoadingDelete}
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteContact}
        onConfirm={handleConfirmDeleteContact}
      >
        <strong>Tem certeza?</strong>
        <p>Esta ação não poderá ser desfeita! </p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise um contato..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifycontent={
          hasError
            ? "flex-end"
            : contacts.length > 0
            ? "space-between"
            : "center"
        }
      >
        {!hasError && contacts.length > 0 && (
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
            <Button type="button" onClick={handleTryAgain}>
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={noContacts} alt="No Contacts" />

              <p>
                Você ainda adicionou nenhum contato!
                <br />
                Clique em <strong>Novo contato</strong> para fazer um cadastro.
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={search} alt="Search icon" />
              <span>
                Oooops!
                <br />
                Nenhum resultado foi encontrado para "
                <strong>{searchTerm}</strong>"
              </span>
            </SearchNotFoundContainer>
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

                <button
                type="button"
                onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="Deletar" height="24px" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
