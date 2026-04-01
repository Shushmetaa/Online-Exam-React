import styled from "styled-components";
import { useState } from "react";
import { FormRow } from "./ExamMaster";
import { FaTimes } from "react-icons/fa";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 15px 36px;
  width: 500px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  button {
    padding: 10px 20px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    transition: 0.2s;
    &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
  }
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textlight};
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textlight};
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const CancelBtn = styled.button`
  background: none;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textlight};
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
const ExamId=styled.div`
    width:120px;
    height:30px;
    background:${({theme})=>theme.colors.background};
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius};
    font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryLight};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding-top:5px ;
  padding-left:10px ;
`;
export default function EditExamModal({ exam, onClose, onSuccess }) {
  const [editData, setEditData] = useState({ ...exam });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateExam = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/exam/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(editData),
      });
      const result = await res.json();
      if (result.responseMessage === "success") {
        alert("Exam Updated Successfully!");
        onSuccess(); 
        onClose();   
      } else {
        alert("Error: " + result._ERROR_MESSAGE_);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Overlay>
      <Modal>
        <ModalTitle>
          <h3>Edit Exam</h3>
          <ExamId>Exam Id:{editData.examId}</ExamId>
          <FaTimes onClick={onClose} style={{cursor:"pointer"}}></FaTimes>
        </ModalTitle>

        <form onSubmit={updateExam}>
          <FormRow>
            <label>Exam Name</label>
            <input name="examName" value={editData.examName} onChange={handleChange}/>
          </FormRow>
          <FormRow>
            <label>Description</label>
            <textarea name="description" value={editData.description} onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <label>No of Questions</label>
            <input type="number" name="noOfQuestions" value={editData.noOfQuestions}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <label>Duration</label>
            <input type="number" name="duration" value={editData.duration}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <label>Pass Percentage</label>
            <input type="number" name="passPercentage" value={editData.passPercentage}
              onChange={handleChange}
            />
          </FormRow>
          <BtnRow>
            <CancelBtn type="button" onClick={onClose}>Cancel</CancelBtn>
            <button type="submit">Update Exam</button>
          </BtnRow>
        </form>
      </Modal>
    </Overlay>
  );
}