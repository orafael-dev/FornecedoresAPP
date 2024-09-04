import { Container } from "./styles";
import logo from "../../assets/images/logo.svg";

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="FornecedoresApp" width={"220px"} height={"80px"} />
    </Container>
  );
}
