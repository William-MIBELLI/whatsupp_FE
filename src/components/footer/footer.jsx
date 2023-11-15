import { useContext } from "react";
import { Container, SwitchIcon, Text } from "./footer.style";
import Switch from "react-switch";
import { SelectThemeContext } from "../../App";

const Footer = () => {
    const { theme, setTheme } = useContext(SelectThemeContext);

    const handleChange = (checked) => {
        setTheme(checked);
    };

    return (
        <Container>
            <Switch
                onChange={handleChange}
                checked={theme}
                className="react-switch"
                height={20}
                width={40}
                checkedIcon={<SwitchIcon>😎</SwitchIcon>}
                uncheckedIcon={<SwitchIcon>🌚</SwitchIcon>}
                onColor={"green"}
            />
            <Text>2023 William MIBELLI</Text>
        </Container>
    );
};

export default Footer;
