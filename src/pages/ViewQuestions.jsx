import React, { useEffect, useState } from "react";
import Layout from "../component/layout";
import {
  ExamMain,
  ExamForm,
  TableSection,
  TableHeader,
  GridWrapper,
  GridContainer,
  GridHeader
} from  "./ExamMaster";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const GridCell = styled.div`
  padding: 12px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textlight};
  display: flex;
  align-items: center;
`;

export default function ViewQuestions() {
  const { examId } = useParams(); // get examId from URL
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [examId]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`/exam/api/admin/questions/${examId}`);
      const result = await res.json();

      if (result.responseMessage === "success") {
        setQuestions(result.questionList || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <ExamMain>
        <ExamForm>

          <TableSection>
            <TableHeader>
              <h3>Questions for Exam {examId}</h3>
              <span>{questions.length} Questions</span>
            </TableHeader>

            <GridWrapper>
              <GridContainer>

                <GridHeader>ID</GridHeader>
                <GridHeader>Question</GridHeader>
                <GridHeader>Option A</GridHeader>
                <GridHeader>Option B</GridHeader>
                <GridHeader>Option C</GridHeader>
                <GridHeader>Option D</GridHeader>
                <GridHeader>Option E</GridHeader>
                <GridHeader>Answer</GridHeader>
                <GridHeader>Type</GridHeader>
                <GridHeader>Difficulty</GridHeader>

                {questions.map((q) => (
                  <React.Fragment key={q.questionId}>
                    <GridCell>{q.questionId}</GridCell>
                    <GridCell>{q.questionDetail}</GridCell>
                    <GridCell>{q.optiona}</GridCell>
                    <GridCell>{q.optionb}</GridCell>
                    <GridCell>{q.optionc}</GridCell>
                    <GridCell>{q.optiond}</GridCell>
                    <GridCell>{q.optione}</GridCell>
                    <GridCell>{q.answer}</GridCell>
                    <GridCell>{q.questionType}</GridCell>
                    <GridCell>{q.difficultyLevel}</GridCell>
                  </React.Fragment>
                ))}

              </GridContainer>
            </GridWrapper>

          </TableSection>

        </ExamForm>
      </ExamMain>
    </Layout>
  );
}