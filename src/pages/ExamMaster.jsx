import styled from "styled-components";
import Layout from "../component/layout";
import { useState } from "react";
import { useEffect } from "react";
import ExamEmpty from "../component/ExamEmpty";
import React from "react";

export const ExamMain = styled.div`
  display: flex;
`;

export const ExamForm = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  width: 120%;

  & span {
    color: red;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items:center;
    gap: 25px;
  }

  & input,
  & textarea {
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    padding: 5px 20px;
    width: 250px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textlight};
    font-family: inherit;
    font-size: 14px;
  }

  & textarea {
    height: 100px;
    resize: vertical;
  }

  & button {
    padding: 10px 20px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    transition: 0.2s;
    width:fit-content;
  }

  & button:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;

  & label {
    width: 150px;
    text-align: right;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.textlight};
  }
`;

export const TableSection = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const TableHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns:
    60px 120px 150px 200px 140px 120px 100px 150px 150px 120px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  width: 100%;
`;

export const GridHeader = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textlight};
  font-weight: 600;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const GridCell=styled.div`
    padding: 8px 10px;
//   border-right: ${({ theme }) => theme.colors.border};
//   border-bottom: ${({ theme }) => theme.colors.border};
   border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  color:${({ theme }) => theme.colors.textlight};
  display: flex;
  align-items: center;
`;
export const ActionLink = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  cursor: pointer;
  margin-right: 6px;
  text-decoration: underline;

  &:hover {
    color: red;
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
 const [examList, setExamList] = useState([]);
  const fetchExams = async () => {
    try {
      const res = await fetch("/exam/api/admin/getExams", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await res.json();
      if (result.responseMessage === "success") {
        setExamList(result.examList);
      }
    } catch (err) {
      console.error(err);
    }
  };
   useEffect(() => {
    fetchExams();
  }, []);

    return(
        <>
        <Layout>
            <ExamMain>
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
              <textarea name="description" placeholder="Enter the Description" onChange={handleChange} rows={4}
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
            <TableSection>
                <TableHeader>Available Exams</TableHeader>
            <GridContainer>
               <GridHeader>Sl.No</GridHeader>
               <GridHeader>Exam ID</GridHeader>
               <GridHeader>Exam Name</GridHeader>
               <GridHeader>Description</GridHeader>
               <GridHeader>No of Questions</GridHeader>
               <GridHeader>Duration</GridHeader>
               <GridHeader>Pass %</GridHeader>
               <GridHeader>Questions</GridHeader>
               <GridHeader>Assign Users</GridHeader>
               <GridHeader>Setup Exam</GridHeader>
               {examList.length === 0 ? (                
                  <ExamEmpty
                    title={"Exam Is Not Added"}
                    description={"Add your Exam to appear Here"}
                  />
                ) :  (
  examList.map((exam, index) => (
            <React.Fragment key={exam.examId}>
                   <GridCell>{index + 1}</GridCell>
                   <GridCell>{exam.examId}</GridCell>
                   <GridCell>{exam.examName}</GridCell>
                   <GridCell>{exam.description}</GridCell>
                   <GridCell>{exam.noOfQuestions}</GridCell>
                   <GridCell>{exam.duration}</GridCell>
                   <GridCell>{exam.passPercentage}</GridCell>
                   <GridCell>
                       <ActionLink>Add</ActionLink>
                       <ActionLink>Edit</ActionLink>
                       <ActionLink>Upload</ActionLink>
                  </GridCell>
                 <GridCell>
                     <ActionLink>Assign Users</ActionLink>
                </GridCell>
                <GridCell>
                    <ActionLink>Set up</ActionLink>
               </GridCell>
             </React.Fragment>
  ))
)}
            </GridContainer>
            </TableSection>
                </ExamForm>
            </ExamMain>
        </Layout>
        </>
    )
}
