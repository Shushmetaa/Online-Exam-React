import styled from "styled-components";
import Layout from "../component/layout";
import SideBar from "../component/SideBar";
import { useState } from "react";

export const ExamMain=styled.div`
  display:flex;
`;
export const ExamForm=styled.div`
   padding:20px;
   display:flex;
   gap:20px;
   flex-direction:column;
   align-items:center;
//    width:100%;
   & span{
   color:red;
   }
   & form{
     display:flex;
     flex-direction:column;
     gap:25px;
    }
     & input{
      border-radius:5px;
      border:2px solid rgb(135, 139, 136);
      padding:5px 20px;
     }
      & button{
        padding: 10px;
  width: fit-content;    
  padding: 10px 20px;   
  cursor: pointer;
  background: rgb(17, 136, 130);
  color: white;
  border: none;
  border-radius: 5px;
  align-self:center;
   & button:hover {
    background: rgb(12, 100, 95);  
  }
      }
 
`;
const FormRow=styled.div`
display:flex;
   gap:20px;
   & label{
     width:150px;
     text-align:right;
     font-size:15px;
   }
`;
export default function ExamMaster(){

const [formData, setFormData] = useState({examId: '',
    examName: '',
    description: '',
    noOfQuestions: '',
    duration: '',
    passPercentage: ''
  });

   const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const createExam=async(e)=>{
      e.preventDefault();
    try{
        const res = await fetch("/exam/api/admin/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
});
                      const result = await res.json();
 
        if (result.responseMessage === "success") {
            alert("Exam Created Successfully!");
        } else {
            alert("Error: " + result._ERROR_MESSAGE_);
        }
    } catch (err) {
      console.error(err);
   }
}
    return(
        <>
        <Layout>
            <ExamMain>
                <SideBar></SideBar>
                <ExamForm>
                   <h2>Create Exam Here!</h2>
                   <form onSubmit={createExam}>
                    <FormRow>
                    <label>Exam Id: <span>*</span></label>
              <input type="text" name="examId" placeholder="Enter the Exam Id"  onChange={handleChange} 
              /></FormRow>
          <FormRow>
              <label>Exam Name: <span>*</span></label>
              <input type="text" name="examName" placeholder="Enter the Exam Name" onChange={handleChange}
              />
         </FormRow>
         <FormRow>
              <label>Description: <span>*</span></label>
              <input type="text" name="description" placeholder="Enter the Description" onChange={handleChange}
              />
        </FormRow>
        <FormRow>
              <label>No of Questions: <span>*</span></label>
              <input type="number"  name="noOfQuestions"  placeholder="Enter No of Questions" onChange={handleChange}
              />
        </FormRow>
         <FormRow>
              <label>Duration: <span>*</span></label>
              <input type="number" name="duration" placeholder="Enter Duration in Minutes" onChange={handleChange}
              />
        </FormRow>
        <FormRow>
              <label>Pass Percentage: <span>*</span></label>
              <input type="number" name="passPercentage" placeholder="Enter Pass Percentage" onChange={handleChange}
              />
              </FormRow>
              <button type="submit">Add Exam</button>
                   </form>
                </ExamForm>
            </ExamMain>
        </Layout>
        </>
    )
}
