import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import Navbar from "../organisms/Navbar";
import Content from "../organisms/Content";
import ContentText from "../atoms/content/ContentText";
import ThirdTitle from "../atoms/titles/ThirdTitle";
import PricingContentGroup from "../molecules/PricingContentGroup";

const Pricing = ()=>{
    const { theme } = useTheme();
    return (
        <div className={style(theme)}>
            <Navbar />
            <Content>
                <PricingContentGroup>
                    <SecondaryTitle text="Pricing SpikeStats" />
                    <ContentText>
                        Pour le moment SpikeStats est gratuit, mais nous prévoyons de mettre en place un système d'abonnement pour les fonctionnalités avancées.
                    </ContentText>
                    <ThirdTitle text="Profitez-en !"/>
                </PricingContentGroup>
            </Content>

        </div>
    )
}

const style = (theme: Theme) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas: 
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content";
    overflow: hidden;
    height: 100vh;
    font-family: "Nexa";
    background-color: ${theme.colors.white};
`

export default Pricing;