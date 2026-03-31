import styled from "styled-components";
import Layout from "../component/layout";
import { FormRow } from "./ExamMaster";


const LoginWrapper=styled.div`
     width:300px;
     height:250px;
     background-color:${({ theme }) => theme.colors.accent};
`;

export default function Login(){
    return(
        <>
        <Layout>
        <LoginWrapper>
            <FormRow>
                <label>Email: <span>*</span></label>
                <input type="email"/>
           </FormRow>
           <FormRow>
                <label>Password: <span>*</span></label>
                <input type="password"/>
           </FormRow>
        </LoginWrapper>
        </Layout>
        </>
    )
}