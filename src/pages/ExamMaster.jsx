import styled from "styled-components";
import Layout from "../component/layout";
import { useState } from "react";
import { useEffect } from "react";
import ExamEmpty from "../component/ExamEmpty";
import React from "react";
import { useNavigate } from "react-router-dom";
import EditExamModal from "./EditExamModel";

const ExamMain = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width:100vw;
`;

const ExamForm = styled.div`
   max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 40px 32px;
`;
const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 32px 36px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 32px;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 28px;
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
     height: fit-content;    
     align-self: end; 
      margin-bottom: 4px; 
  }

  & button:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const FormCardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    display: inline-block;
  }

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textlight};
    margin: 0;
  }
`;
export const FormRow = styled.div`
    display: flex;
  flex-direction: column;
  gap: 6px;

  & label {
    font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryLight};
  text-transform: uppercase;
  letter-spacing: 0.6px;

  span { color: #e05260; margin-left: 2px; }
  }
   & input,
  & textarea {
       height: 44px;
       padding: 0 16px;
      border-radius: ${({ theme }) => theme.radius};
       border: 1.5px solid ${({ theme }) => theme.colors.border};
      background: ${({ theme }) => theme.colors.background};
      font-size: 14px;
      color: ${({ theme }) => theme.colors.textlight};
      outline: none;
      width: 100%;
      box-sizing: border-box;

       &::placeholder { color: ${({ theme }) => theme.colors.disabled};
       }

       &:focus {
           border-color: ${({ theme }) => theme.colors.primary};
           background: ${({ theme }) => theme.colors.surface};
       }
  }

  & textarea {
    height: 100px;
   padding: 12px 16px;
  }
 & select {
  height: 44px ;
  padding: 0 16px !important;
  border-radius: ${({ theme }) => theme.radius} !important;
  border: 1.5px solid ${({ theme }) => theme.colors.border} !important;
  background: ${({ theme }) => theme.colors.background} !important;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textlight};
  outline: none;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
`;


const TableSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.background};
  }

  span {
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.12);
    padding: 4px 12px;
    border-radius: 20px;
  }
`;
const GridWrapper = styled.div`
   overflow: auto;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 56px 140px 200px 100px 140px 120px 100px 120px 140px;
  min-width: 1100px;
`;

const GridHeader = styled.div`
background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primaryLight};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  padding: 12px 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const GridCell=styled.div`
    padding: 12px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textlight};
  display: flex;
  align-items: center;

`;

const ActionLink = styled.button`
 font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.primary};
  transition: background 0.15s, border-color 0.15s;
  margin-right: 4px;
  text-decoration:underline;
   background: none; 
  &:hover {
    background: ${({ theme }) => theme.colors.link};
    border-color: ${({ theme }) => theme.colors.border};
      text-decoration:none;
  }
`;
const EditExam=styled.div`
   height:500px;
   width:500px;
   background-color:black;
`;
export default function ExamMaster(){

const [formData, setFormData] = useState({
    examName: '',
    description: '',
    noOfQuestions: '',
    duration: '',
    passPercentage: ''
  });
  const navigate=useNavigate()

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
   }finally{
    navigate(0)
   }
}
 const [examList, setExamList] = useState([]);
 const [loading, setLoading] = useState(true);
  const fetchExams = async () => {
    setLoading(true);
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
    } finally {
    setLoading(false);  
  }
  };
   useEffect(() => {
    fetchExams();
  }, []);

  const[editExam,setEditExam]=useState(null);
  const[deleteExam,setDeleteExam]=useState(null);
    return(
        <>
        <Layout>
            <ExamMain>
                <ExamForm>
                  <FormCard>
                   <FormCardTitle>
                     <span />
                      <h3>Create New Exam</h3>
                  </FormCardTitle>
                   <form onSubmit={createExam}>
          <FormRow>
              <label>Exam Name: <span>*</span></label>
              <input type="text" name="examName" placeholder="e.g. Java Basics" onChange={handleChange}
              />
         </FormRow>
         <FormRow>
              <label>Description: <span>*</span></label>
              <textarea name="description" placeholder="Brief description of the exam..." onChange={handleChange} rows={4}
              />
        </FormRow>
        <FormRow>
              <label>No of Questions: <span>*</span></label>
              <input type="number"  name="noOfQuestions"  placeholder="e.g. 50" onChange={handleChange}
              />
        </FormRow>
         <FormRow>
              <label>Duration: <span>*</span></label>
              <input type="number" name="duration" placeholder="e.g. 90" onChange={handleChange}
              />
        </FormRow>
        <FormRow>
              <label>Pass Percentage: <span>*</span></label>
              <input type="number" name="passPercentage" placeholder="e.g. 60" onChange={handleChange}
              />
              </FormRow>
              <button type="submit">Add Exam</button>
            </form>
            </FormCard>
            <TableSection>
                <TableHeader>
                      <h3>Available Exams</h3>
                      <span>{examList.length} exam{examList.length !== 1 ? 's' : ''}</span>
                </TableHeader>
                <GridWrapper>
            <GridContainer>
               <GridHeader>S.No</GridHeader>
               <GridHeader>Exam Name</GridHeader>
               <GridHeader>Description</GridHeader>
               <GridHeader>No of Questions</GridHeader>
               <GridHeader>Duration</GridHeader>
               <GridHeader>Pass %</GridHeader>
               <GridHeader>Topics</GridHeader>
               <GridHeader>Exam</GridHeader>
               <GridHeader>Assign Users</GridHeader>
              {loading ? (
               <GridCell style={{ padding: "20px", justifyContent: "center" }}>
                Loading...
             </GridCell>) : examList.length === 0 ? (
  <ExamEmpty
    title={"Exam Is Not Added"}
    description={"Add your Exam to appear Here"}
  />
) : (
  examList.map((exam, index) => (
            <React.Fragment key={exam.examId}>
                   <GridCell>{index + 1}</GridCell>
                   <GridCell style={{ fontWeight: 600 }}>{exam.examName}</GridCell>
                   <GridCell>{exam.description}</GridCell>
                   <GridCell>{exam.noOfQuestions}</GridCell>
                   <GridCell>{exam.duration}min</GridCell>
                   <GridCell>{exam.passPercentage}%</GridCell>
                   <GridCell>
                       <ActionLink>Add</ActionLink>
                  </GridCell>
                  <GridCell>
                      <ActionLink onClick={()=>setEditExam(exam)}>Edit</ActionLink>
                       <ActionLink onClick={()=>setDeleteExam(exam)}>Delete</ActionLink>
                  </GridCell>
                 <GridCell>
                     <ActionLink>Assign Users</ActionLink>
                </GridCell>
             </React.Fragment>
  ))
)}
            </GridContainer>
            </GridWrapper>
            </TableSection>
                </ExamForm>
                {editExam && (<EditExamModal exam={editExam} onClose={() => setEditExam(null)}onSuccess={fetchExams}/>
)}
            </ExamMain>
        </Layout>
        </>
    )
}
