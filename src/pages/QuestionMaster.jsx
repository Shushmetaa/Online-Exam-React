import React, { useState, useEffect, useRef } from "react";
import Layout from "../component/layout";
import {
  ExamMain,
  ExamForm,
  FormCard,
  FormCardTitle,
  FormRow
} from "./ExamMaster"; // reuse styles

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
   
  input[type="checkbox"] {
   
    width: 20px;
    height: 16px;
    transform: scale(1.2);
    cursor: pointer;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textlight};
  }
`;
const ButtonRow = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 24px;
  padding-right: 50px;`;
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
    numAnswers: 1,
    questionType: "MCQ",
    difficultyLevel: "Easy",
    answerValue: "1",
    negativeMarkValue: "0"
  });

  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (form.examId) {
      fetch(`/exam/api/admin/topic/examTopics/${form.examId}`)
        .then(res => res.json())
        .then(data => setTopics(data.topicList || []));
    }
  }, [form.examId]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedForm = { ...form, [name]: value };

  // reset options if not MCQ
  if (name === "questionType" && value !== "MCQ") {
    updatedForm.answers = [];
    updatedForm.numAnswers = 0;
    updatedForm.optiona = "";
    updatedForm.optionb = "";
    updatedForm.optionc = "";
    updatedForm.optiond = "";
    updatedForm.optione = "";
  }

  setForm(updatedForm);
};
  const handleAnswer = (option) => {
  let updated = [...form.answers];

  if (updated.includes(option)) {
    updated = updated.filter(a => a !== option);
  } else {
    if (updated.length < Number(form.numAnswers)) {
      updated.push(option);
    } else {
      alert(`Only ${form.numAnswers} answers allowed`);
      return;
    }
  }

  setForm({
    ...form,
    answers: updated
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

  let payload = {
  ...form
};

if (form.questionType === "MCQ") {
  payload.answer = form.answers.join(",");
  payload.numAnswers = Number(form.numAnswers);
} else {
  payload.answer = form.answer || "";
  payload.numAnswers = 0;

  // clear options for descriptive
  payload.optiona = "";
  payload.optionb = "";
  payload.optionc = "";
  payload.optiond = "";
  payload.optione = "";
}

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
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/exam/api/admin/excel/upload/10000", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (result.responseMessage === "success") {
      alert("Questions Uploaded Successfully!");
    } else {
      alert("Error: " + result._ERROR_MESSAGE_);
    }
  };

  return (
    <Layout>
      <ExamMain>
        <ExamForm>

          <FormCard>
            <FormCardTitle>
              <span />
              <h3>Create Question</h3>
            </FormCardTitle>

            <form onSubmit={handleSubmit}>

              {/* <FormRow>
                <label>Exam ID <span>*</span></label>
                <input name="examId" onChange={handleChange} />
              </FormRow> */}

              <FormRow>
                <label>Topic <span>*</span></label>
                <select name="topicId" onChange={handleChange}>
                  <option value="">Select Topic</option>
                  {topics.map(t => (
                    <option key={t.topicId} value={t.topicId}>
                      {t.topicName}
                    </option>
                  ))}
                </select>
              </FormRow>

              <FormRow style={{ gridColumn: "span 2" }}>
                <label>Question <span>*</span></label>
                <textarea name="questionDetail" onChange={handleChange} />
              </FormRow>
              {form.questionType === "TRUE_FALSE" && (
              <FormRow style={{ gridColumn: "1 / 2" }}>
                <label>Select Correct Answer <span>*</span></label>

                <OptionRow>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <input
                      type="radio"
                      name="tfAnswer"
                      value="TRUE"
                      onChange={(e) =>
                        setForm({ ...form, answer: e.target.value })
                      }
                    />
                    True
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <input
                      type="radio"
                      name="tfAnswer"
                      value="FALSE"
                      onChange={(e) =>
                        setForm({ ...form, answer: e.target.value })
                      }
                    />
                    False
                  </label>
                </OptionRow>
              </FormRow>
            )}
              <FormRow style={{ gridColumn: "1 / 2" }}>
                <label>Question Type <span>*</span></label>
                <select
                  name="questionType"
                  value={form.questionType}
                  onChange={handleChange}
                >
                  <option value="MCQ">MCQ</option>
                  <option value="FILL_UPS">Fill Ups</option>
                  <option value="DESCRIPTIVE">Descriptive</option>
                  <option value="TRUE_FALSE">True / False</option>
                </select>
                {form.questionType === "FILL_UPS" && (
                <FormRow style={{ gridColumn: "2 / 3" }}>
                  <label>Correct Answer <span>*</span></label>
                    <input
                      name="answer"
                      onChange={handleChange}
                      placeholder="Enter correct word/phrase"
                    />
                  </FormRow>
                )}
              </FormRow>
              {form.questionType === "MCQ" && (
              <FormRow style={{ gridColumn: "2 / 3" }}>
                <label>Option A <span>*</span></label>
                <OptionRow>
                  <input name="optiona" onChange={handleChange} />
                  <input type="checkbox" onChange={() => handleAnswer("A")} />
                  <span>Answer</span>
                </OptionRow>
              </FormRow>
            )}
              <FormRow style={{ gridColumn: "1 / 2" }}>
                <label>Difficulty Level <span>*</span></label>
                <select
                  name="difficultyLevel"
                  value={form.difficultyLevel}
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Difficult">Difficult</option>
                </select>
              </FormRow>
              {form.questionType === "MCQ" && (
              <FormRow style={{ gridColumn: "2 / 3" }}>
                <label>Option B <span>*</span></label>
                <OptionRow>
                  <input name="optionb" onChange={handleChange} />
                  <input type="checkbox" onChange={() => handleAnswer("B")} />
                  <span>Answer</span>
                </OptionRow>
              </FormRow>
            )}
              {form.questionType === "MCQ" && (
              <FormRow style={{ gridColumn: "1 / 2" }}>
                <label>Number of Correct Answers <span>*</span></label>
                <input
                  type="number"
                  name="numAnswers"
                  min="1"
                  value={form.numAnswers}
                  onChange={handleChange}
                />
              </FormRow>
            )}
              {form.questionType === "MCQ" && (
              <FormRow style={{ gridColumn: "2 / 3" }}>
                <label>Option C <span>*</span></label>
                <OptionRow>
                  <input name="optionc" onChange={handleChange} />
                  <input type="checkbox" onChange={() => handleAnswer("C")} />
                  <span>Answer</span>
                </OptionRow>
              </FormRow>
            )}
              <FormRow style={{ gridColumn: "1 / 2" }}>
                <label>Marks per Correct Answer <span>*</span></label>
                <input
                  type="number"
                  name="answerValue"
                  value={form.answerValue}
                  onChange={handleChange}
                />
              </FormRow>
              {form.questionType === "MCQ" && (
              <FormRow style={{ gridColumn: "2 / 3" }}>
                <label>Option D <span>*</span></label>
                <OptionRow>
                  <input name="optiond" onChange={handleChange} />
                  <input type="checkbox" onChange={() => handleAnswer("D")} />
                  <span>Answer</span>
                </OptionRow>
              </FormRow>
            )}
              <FormRow style={{ gridColumn: "1 / 2" }}>
                <label>Negative Marks per Wrong Answer <span>*</span></label>
                <input
                  type="number"
                  name="negativeMarkValue"
                  value={form.negativeMarkValue}
                  onChange={handleChange}
                />
              </FormRow>
            
              {form.questionType === "MCQ" && (
              <FormRow style={{ gridColumn: "2 / 3" }}>
                <label>Option E <span>*</span></label>
                <OptionRow>
                  <input name="optione" onChange={handleChange} />
                  <input type="checkbox" onChange={() => handleAnswer("E")} />
                  <span>Answer</span>
                </OptionRow>
              </FormRow>
            )}
            
              {/* Buttons */}
              <ButtonRow>
                <button type="submit">Add Question</button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Excel
                </button>

                <input
                  type="file"
                  accept=".xlsx,.xls"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleUpload}
                />
                <button type="button" onClick={() => navigate(`/view-questions/${form.examId}`)}> View Questions </button>
              </ButtonRow>

            </form>
          </FormCard>

        </ExamForm>
      </ExamMain>
    </Layout>
  );
}