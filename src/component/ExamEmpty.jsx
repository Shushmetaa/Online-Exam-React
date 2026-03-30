import styled from "styled-components";

export const EmptyWrapper=styled.div`
    height:200px;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:5px;
     grid-column: 1 / -1;
`;
export const EmptyTitle=styled.h4`
  font-weight:bold;
`;

export default function ExamEmpty({title,description}){
    return(
        <>
        <EmptyWrapper>
         <EmptyTitle>{title}</EmptyTitle>
         <p>{description}</p>
         </EmptyWrapper>
        </>
    )
}