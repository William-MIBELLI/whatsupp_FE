import { StyledAuthInput, ErrorMessage } from "./authInput.style";

const AuthInput = ({ name, label, type, register, errors }) => {
  return (
    <StyledAuthInput>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={label}
        name={name}
        {...register(name)}
        error={errors}
      ></input>
      {errors && <ErrorMessage>{errors}</ErrorMessage>}
    </StyledAuthInput>
  );
};

export default AuthInput;