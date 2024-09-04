import { Container, InputSearchContainer } from "./styles";
import logo from '../../assets/images/logo.svg'

export default function Header() {
  return  (
    <Container>
      <img src={logo} alt="FornecedoresApp" width={"220px"} height={"80px"} />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise um contato..." />
      </InputSearchContainer>
    </Container>
  )
}
