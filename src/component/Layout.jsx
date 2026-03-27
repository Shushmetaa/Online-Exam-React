import { MainContainer } from "../layoutstyles";

export default function Layout(props){
    return(
        <>
        <MainContainer> {props.children} </MainContainer>
        </>
    )
}