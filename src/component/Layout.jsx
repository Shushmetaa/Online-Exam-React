import { MainContainer } from "../styles/layoutstyles";

export default function Layout(props){
    return(
        <>
        <MainContainer> {props.children} </MainContainer>
        </>
    )
}