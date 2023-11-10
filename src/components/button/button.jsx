import { BaseButton, HomeButton } from "./button.style";
import { PulseLoader } from "react-spinners";

export const BUTTON_TYPE = {
    BASE_BUTTON: "BASE_BUTTON",
    HOME_BUTTON: "HOME_BUTTON",
};

const Button = ({
    text,
    type,
    loading,
    buttonType,
    clickHandler,
    className,
}) => {
    const getButton = (buttonType = BUTTON_TYPE.BASE_BUTTON) =>
        ({
            [BUTTON_TYPE.BASE_BUTTON]: BaseButton,
            [BUTTON_TYPE.HOME_BUTTON]: HomeButton,
        }[buttonType]);

    const CustomButton = getButton(buttonType);

    return loading ? (
        <PulseLoader color="white" size={8} />
    ) : (
        <CustomButton type={type} onClick={clickHandler} className={className}>
            {loading ? "Loading..." : text}
        </CustomButton>
    );
};

export default Button;
