import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import Layout from "../component/layout";

// ====== PAGE WRAPPER (FULL BACKGROUND) ======
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  padding: 10px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;
// ====== MAIN CONTAINER ======
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;

  & span {
    color: red;
  }
`;

// ====== FORM ======
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 25px;

`;

// ====== ROW ======

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & label {
    width: 150px;
    text-align: right;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.textlight};
  }
`;
const RowTopic = styled.div`
  display: flex;
  gap: 20px;
  align-items: right;

`;

// ====== INPUTS ======
const Input = styled.input`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: 5px 20px;
  width: 250px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textlight};
`;

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: 5px 20px;
  width: 400px;
  height: 100px;
  resize: vertical;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textlight};
`;

const Select = styled.select`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: 5px 20px;
  width: 250px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textlight};
`;

// ====== OPTION ROW ======
const OptionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// ====== BUTTON ======
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap:20px;
  margin-top: 10px;`;
 
const Button = styled.button`
  padding: 10px 40px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.2s;
   &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;


export default function QuestionMaster() {
  const [form, setForm] = useState({
    examId: "",
    topicId: "",
    questionDetail: "",
    optiona: "",
    optionb: "",
    optionc: "",
    optiond: "",
    optione: "",
    answers: [],
    numAnswers: 1
  });

  const [topics, setTopics] = useState([]);

  // 🔹 Fetch topics
  useEffect(() => {
    if (form.examId) {
      fetch(`/exam/api/admin/topic/examTopics/${form.examId}`)
        .then(res => res.json())
        .then(data => setTopics(data.topicList || []))
        .catch(err => console.log(err));
    }
  }, [form.examId]);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle answers
  const handleAnswer = (option) => {
    let updated = [...form.answers];

    if (updated.includes(option)) {
      updated = updated.filter(a => a !== option);
    } else {
      updated.push(option);
    }

    setForm({ ...form, answers: updated, numAnswers: updated.length });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        answerValue: form.answers.join(","),
        questiontype: "1",
        difficultyLevel: "1",
        negativeMarkValue: "0"
      };

      const res = await fetch("/exam/api/admin/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload),
      });

      const result = await res.json();

      if (result.responseMessage === "success") {
        alert("Question Created Successfully!");
      } else {
        alert("Error: " + result._ERROR_MESSAGE_);
      }

    } catch (err) {
      console.error(err);
    }
  };
const fileInputRef = useRef(null);

const handleUpload = async (e) => {
  const file=e.target.files[0];
  if(!file){
    return;
  }
  const data = new FormData();
  data.append("file", file);
  try{
    const res=await fetch("/exam/api/admin/excel/upload/10000",{
      method:"POST",
      body:data,
    });
    const result=await res.json();
    if(result.responseMessage=="success"){
      alert("Questions Uploaded Successfully!");
    }else{
      alert("Error:"+result._ERROR_MESSAGE_);
    }
  }catch(err){
    console.log(err);
  }
};
  return (
    <Layout>
      <PageWrapper>
        <Container>

          <Title>Add Questions</Title>

          <Form onSubmit={handleSubmit}>

            <Row>
              <label>Exam Id: <span>*</span></label>
              <Input name="examId" onChange={handleChange} />
            
            <RowTopic>
              <label style={{marginLeft:"60px"}}>Topic: <span>*</span></label>
              <Select name="topicId" onChange={handleChange}>
                <option value="">Select Topic</option>
                {topics.map(t => (
                  <option key={t.topicId} value={t.topicId}>
                    {t.topicName}
                  </option>
                ))}
              </Select>
            </RowTopic>  
            </Row>

            <Row>
              <label>Question: <span>*</span></label>
              <TextArea name="questionDetail" onChange={handleChange} />
            </Row>

            {["a", "b", "c", "d", "e"].map((opt) => (
              <Row key={opt}>
                <label>Option {opt.toUpperCase()}: <span>*</span></label>

                <OptionBox>
                  <Input
                    name={`option${opt}`}
                    onChange={handleChange}
                  />

                  <input
                    type="checkbox"
                    onChange={() => handleAnswer(opt.toUpperCase())}
                  />
                  <span style={{color:"black"}}>Answer</span>
                </OptionBox>
              </Row>
            ))}
            <input type="file"  accept=".xlsx, .xls" ref={fileInputRef} style={{ display: "none" }} onChange={handleUpload}/>
           <ButtonRow>
            <Button type="submit">Add Question</Button>
<Button type="button" onClick={() => fileInputRef.current.click()}>
    Upload Excel
  </Button>
  </ButtonRow>
          </Form>
        </Container>
      </PageWrapper>
    </Layout>
  );
}