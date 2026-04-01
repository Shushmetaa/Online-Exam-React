import styled from "styled-components";
import Layout from "../component/layout";


const LoginWrapper=styled.div`
     width:1200px;
     height:250px;
     background-color:${({ theme }) => theme.colors.accent};
`;

const LoginRow=styled.div`

`;
const LeftContent=styled.div`

`;
const RightContent=styled.div`

`;
export default function Login(){
    return(
        <>
        <Layout>
        <LoginWrapper>
            <LeftContent>

            </LeftContent>
            <RightContent>
              <LoginRow>
                  <label>Email: <span>*</span></label>
                  <input type="email"/>
              </LoginRow>
              <LoginRow>
                  <label>Password: <span>*</span></label>
                  <input type="password"/>
           </LoginRow>
           </RightContent>
        </LoginWrapper>
        </Layout>
        </>
    )
}