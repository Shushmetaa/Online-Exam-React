import { MainContainer } from "../styles/layoutstyles";
import Header from "./Header";

export default function Layout(props){
    return(
        <>
        <Header></Header>
        <MainContainer> {props.children} </MainContainer>
        </>
    )
}