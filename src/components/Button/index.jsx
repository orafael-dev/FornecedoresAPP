import PropTypes from "prop-types";
import { StyledButton } from "./styles";
import Spinner from "../Spinner";

export default function Button({
  type = "button",
  disabled = false,
  isLoading = false,
  danger = false,
  children,
  onClick = undefined
}) {
  return (
    <StyledButton
    type={type}
    disabled={disabled || isLoading}
    danger={danger}
    onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
