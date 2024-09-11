import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function EditContact() {
  const [isLoading, setIsloading] = useState(true);
  const contactFormRef = useRef(null);
  const [contactName, setContactName] = useState("");

  const { id } = useParams();
  const history = useHistory();
  const SafeAsyncAction = useSafeAsyncAction ();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        SafeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsloading(false);
          setContactName(contact.name);
        });
      } catch (error) {
        SafeAsyncAction(() => {
          history.push("/");
          toast({
            type: "danger",
            text: "Contato não encontrado!",
          });
        });
      }
    }

    loadContact();
  }, [id, history, SafeAsyncAction]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);
      toast({
        type: "success",
        text: "Contato atualizado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu algum erro ao editar o contato!",
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? "Carregando..." : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
