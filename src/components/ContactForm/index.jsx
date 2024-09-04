import PropTypes from "prop-types";
import FormGroup from "../FormGroup";
import { Form, ButtonContainer } from "./styles";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { useState } from "react";

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');

  return (
    <Form>
      <FormGroup>
        <Input
        value={name}
        placeholder="Nome"
        onChange={(e) => setName(e.target.value) }
        />
      </FormGroup>

      <FormGroup error="Formato de e-mail inválido.">
        <Input placeholder="Email" error="null" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select placeholder="Nome">
          <option value="123"> Categoria </option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
