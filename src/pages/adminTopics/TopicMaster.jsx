import styled from "styled-components";
import { useEffect, useState } from "react";
import Layout from "../../component/layout";
import { EditTopic } from "./EditTopic";

const TopicMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textlight};
  font-size: 22px;
  font-weight: 700;
`;

const ExamSelectRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textlight};
    font-weight: 500;
  }

  & select {
    padding: 6px 12px;
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textlight};
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
  }
`;

const ExamInfoBar = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  padding: 14px 24px;
  display: flex;
  gap: 32px;
`;

const ExamInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & span:first-child {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  & span:last-child {
    font-size: 15px;
    font-weight: 600;
    color: white;
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 18px;
  padding: 28px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 
    0 10px 25px rgba(0,0,0,0.06),
    0 4px 10px rgba(0,0,0,0.04);
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 
      0 14px 30px rgba(0,0,0,0.08),
      0 6px 14px rgba(0,0,0,0.06);
  }
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textlight};
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: inline-block;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const FormInput = styled.input`
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.textlight};
  background: #fafafa;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    background: white;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(92, 53, 201, 0.15);
  }
`;

const CalcBadge = styled.div`
  background: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressWrap = styled.div`
  margin-bottom: 14px;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textlight};
  margin-bottom: 5px;
`;

const ProgressBg = styled.div`
  background: #e5e7eb;
  border-radius: 50px;
  height: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 10px;
  border-radius: 50px;
  background: linear-gradient(90deg, #5c35c9, #8b5cf6);
  width: ${({ $pct }) => Math.min($pct, 100)}%;
  transition: width 0.4s ease;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const SaveBtn = styled.button`
  padding: 10px 22px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  border: none;
  background: ${({ disabled }) => disabled ? '#e5e7eb' : 'linear-gradient(135deg, #5c35c9, #8b5cf6)'};
  color: ${({ disabled }) => (disabled ? '#9ca3af' : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: ${({ disabled }) => disabled ? 'none' : '0 6px 14px rgba(92,53,201,0.25)'};
  transition: all 0.25s ease;

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-1px)')};
    box-shadow: ${({ disabled }) => disabled ? 'none' : '0 10px 20px rgba(92,53,201,0.35)'};
  }
`;

const ClearBtn = styled.button`
  padding: 10px 22px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { background: #e5e7eb; }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;

const SuccessMsg = styled.p`
  color: green;
  font-size: 12px;
  margin-top: 8px;
`;

const TableHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const Th = styled.th`
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: ${({ theme }) => theme.colors.border};
`;

const Td = styled.td`
  padding: 11px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textlight};
`;

const ActionBtn = styled.button`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  margin-right: 5px;
  background: ${({ variant }) => variant === 'edit' ? '#eee8ff' : '#ffeaea'};
  color: ${({ variant }) => variant === 'edit' ? '#5c35c9' : '#c62828'};
`;

const EmptyState = styled.p`
  text-align: center;
  padding: 32px;
  color: #b0a0d0;
  font-size: 13px;
`;

// ✅ Warning bar for incomplete percentage
const WarningBar = styled.div`
  margin: 12px 0 4px;
  padding: 10px 14px;
  background: #fff8e1;
  border-radius: 8px;
  border: 1px solid #f59e0b;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #b45309;
  font-weight: 600;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SmallModal = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  width: 360px;
  max-width: 90vw;
  overflow: hidden;
`;

const SmBody = styled.div`
  padding: 28px 24px 18px;
  text-align: center;
`;

const SmIconDanger = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #ffebee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;

  svg {
    width: 26px;
    height: 26px;
  }
`;

const SmTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
`;

const SmDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
`;

const SmTagRed = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin: 8px 0;
  background: #ffebee;
  color: #c62828;
`;

const SmFooter = styled.div`
  padding: 0 24px 22px;
  display: flex;
  gap: 10px;

  button { flex: 1; }
`;

const GhostBtn = styled.button`
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  background: #f3f4f6;
  color: #6b7280;
  transition: all 0.18s;

  &:hover { background: #e5e7eb; }
`;

const DangerBtn = styled.button`
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  background: #c62828;
  color: white;
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.25);
  transition: all 0.18s;

  &:hover:not(:disabled) { background: #a81f1f; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const PurpleBtn = styled.button`
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  box-shadow: 0 4px 12px rgba(59, 42, 143, 0.3);
  transition: all 0.18s;

  &:hover { opacity: 0.9; }
`;

const SsCircleRed = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #c62828;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;

  svg {
    width: 26px;
    height: 26px;
    stroke: white;
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export function TopicMaster() {

    const [exam, setExam] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [totalPct, setTotalPct] = useState(0);
    const [topicList, setTopicList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [topicData, setTopicData] = useState({
        topicId: '',
        topicName: '',
        percentage: '',
        topicPassPercentage: ''
    });
    const [tempTopics, setTempTopics] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    // delete state
    const [deleteTarget, setDeleteTarget]           = useState(null);
    const [deleteLoading, setDeleteLoading]         = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [deletedTopicName, setDeletedTopicName]   = useState('');

    const handleEditClick = (topic) => {
        setSelectedTopic(topic);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedTopic(null);
    };

    const handleExamChange = (e) => {
        const id = e.target.value;
        setSelectedExamId(id);
        const selected = exam.find(ex => ex.examId === id);
        setSelectedExam(selected);
        setTotalPct(0);
        setTopicList([]);
        setTempTopics([]);
        setErrorMsg("");
        setSuccessMsg("");
    };

    const handleTopicChange = (e) => {
        setTopicData({ ...topicData, [e.target.name]: e.target.value });
        setErrorMsg("");
    };

    const handleAddTopic = () => {
        const pct = parseFloat(topicData.percentage || 0);

        if (!topicData.topicId || !topicData.topicName || !pct || !topicData.topicPassPercentage) {
            setErrorMsg("Please fill all fields");
            return;
        }

        const total = tempTopics.reduce((sum, t) => sum + t.percentage, 0) + pct;

        if (total > 100) {
            setErrorMsg("Total percentage cannot exceed 100%");
            return;
        }

        const questions = Math.round((pct / 100) * selectedExam.noOfQuestions);

        let lastEndingQid = 0;
        const allTopics = [...topicList, ...tempTopics].sort((a, b) => a.endingQid - b.endingQid);
        if (allTopics.length > 0) {
            lastEndingQid = allTopics[allTopics.length - 1].endingQid;
        }
        const startingQid = lastEndingQid + 1;
        const endingQid   = startingQid + questions - 1;

        const newTopic = {
            ...topicData,
            examId: selectedExamId,
            percentage: pct,
            questionsPerExam: questions,
            startingQid,
            endingQid
        };

        setTempTopics([...tempTopics, newTopic]);
        setTopicData({ topicId: '', topicName: '', percentage: '', topicPassPercentage: '' });
        setErrorMsg("");
    };

    const fetchExams = async () => {
        try {
            const res  = await fetch("/exam/api/admin/getExams", { method: "GET" });
            const data = await res.json();
            setExam(data.examList);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTopics = async (examId = selectedExamId) => {
        if (!examId) return;
        try {
            const res  = await fetch(`/exam/api/admin/topic/examTopics/${examId}`, { method: "GET" });
            const data = await res.json();
            if (data.responseMessage === "success") {
                setTopicList(data.topicList);
                const total = data.topicList.reduce((sum, t) => sum + parseFloat(t.percentage || 0), 0);
                setTotalPct(total);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveAll = async () => {
        if (tempTopics.length === 0) {
            setErrorMsg("No topics to save.");
            return;
        }

        try {
            for (const topic of tempTopics) {
                const params = new URLSearchParams();
                params.append("examId",              selectedExamId);
                params.append("topicId",             topic.topicId);
                params.append("topicName",           topic.topicName);
                params.append("percentage",          topic.percentage);
                params.append("topicPassPercentage", topic.topicPassPercentage);
                params.append("startingQid",         topic.startingQid);
                params.append("endingQid",           topic.endingQid);
                params.append("questionsPerExam",    topic.questionsPerExam);

                await fetch("/exam/api/admin/topic/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: params
                });
            }

            setSuccessMsg("All topics saved successfully!");
            setTempTopics([]);
            fetchTopics(selectedExamId);

        } catch (err) {
            console.log(err);
            setErrorMsg("Error saving topics");
        }
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("examId",  selectedExamId);
            params.append("topicId", deleteTarget.topicId);

            await fetch("/exam/api/admin/topic/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params
            });

            // ✅ instantly remove from table
            setTopicList(prev => prev.filter(t => t.topicId !== deleteTarget.topicId));
            setTotalPct(prev => prev - parseFloat(deleteTarget.percentage || 0));
            setDeletedTopicName(deleteTarget.topicName);
            setDeleteTarget(null);
            setShowDeleteSuccess(true);

        } catch (err) {
            console.log(err);
        } finally {
            setDeleteLoading(false);
        }
    };

    const clearForm = () => {
        setTopicData({ topicId: '', topicName: '', percentage: '', topicPassPercentage: '' });
        setErrorMsg("");
        setSuccessMsg("");
    };

    useEffect(() => { fetchExams(); }, []);
    useEffect(() => { if (selectedExamId) fetchTopics(selectedExamId); }, [selectedExamId]);

    const tempTotal        = tempTopics.reduce((sum, t) => sum + t.percentage, 0);
    const newTotal         = tempTotal + parseFloat(topicData.percentage || 0);
    const totalUsed        = totalPct + tempTotal;
    const isSaveDisabled   = newTotal > 100 || !topicData.topicId || !topicData.topicName || !topicData.percentage || !topicData.topicPassPercentage;
    const questionsPerExam = Math.round((parseFloat(topicData.percentage || 0) / 100) * (selectedExam?.noOfQuestions || 0));

    return (
        <Layout>
            <TopicMain>
                <PageTitle>Exam Topic Management</PageTitle>

                {!selectedExam && <p>Please select an exam to manage its topics.</p>}

                <ExamSelectRow>
                    <label>Select Exam</label>
                    <select value={selectedExamId} onChange={handleExamChange}>
                        <option value="">-- Select Exam --</option>
                        {exam.map((ex) => (
                            <option key={ex.examId} value={ex.examId}>{ex.examName}</option>
                        ))}
                    </select>
                </ExamSelectRow>

                {selectedExam && (
                    <>
                        <ExamInfoBar>
                            <ExamInfoItem>
                                <span>Exam Name</span>
                                <span>{selectedExam.examName}</span>
                            </ExamInfoItem>
                            <ExamInfoItem>
                                <span>Exam ID</span>
                                <span>{selectedExam.examId}</span>
                            </ExamInfoItem>
                            <ExamInfoItem>
                                <span>Total Questions</span>
                                <span>{selectedExam.noOfQuestions}</span>
                            </ExamInfoItem>
                            <ExamInfoItem>
                                <span>Duration</span>
                                <span>{selectedExam.duration} mins</span>
                            </ExamInfoItem>
                            <ExamInfoItem>
                                <span>Pass %</span>
                                <span>{selectedExam.passPercentage}%</span>
                            </ExamInfoItem>
                        </ExamInfoBar>

                        <TwoCol>
                            <Card>
                                <CardTitle>Add New Topic</CardTitle>

                                <form>
                                    <FormRow>
                                        <FormGroup>
                                            <FormLabel>Topic ID *</FormLabel>
                                            <FormInput type="text" name="topicId"
                                                value={topicData.topicId}
                                                onChange={handleTopicChange}
                                                placeholder="e.g. T001" />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Topic Name *</FormLabel>
                                            <FormInput type="text" name="topicName"
                                                value={topicData.topicName}
                                                onChange={handleTopicChange}
                                                placeholder="e.g. Core Java" />
                                        </FormGroup>
                                    </FormRow>

                                    <FormRow>
                                        <FormGroup>
                                            <FormLabel>Percentage (%) *</FormLabel>
                                            <FormInput type="number" name="percentage"
                                                value={topicData.percentage}
                                                onChange={handleTopicChange}
                                                placeholder="e.g. 30" />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Topic Pass % *</FormLabel>
                                            <FormInput type="number" name="topicPassPercentage"
                                                value={topicData.topicPassPercentage}
                                                onChange={handleTopicChange}
                                                placeholder="e.g. 50" />
                                        </FormGroup>
                                    </FormRow>

                                    <CalcBadge>
                                        <span>Questions from this topic:</span>
                                        <span>{questionsPerExam} questions</span>
                                    </CalcBadge>
                                    <CalcBadge>
                                        <span>QID Range:</span>
                                        <span>
                                            {(() => {
                                                const allTopics = [...topicList, ...tempTopics].sort((a, b) => a.endingQid - b.endingQid);
                                                const lastEnd   = allTopics.length > 0 ? allTopics[allTopics.length - 1].endingQid : 0;
                                                const start     = lastEnd + 1;
                                                const end       = start + questionsPerExam - 1;
                                                return `${start} - ${end}`;
                                            })()}
                                        </span>
                                    </CalcBadge>

                                    <ProgressWrap>
                                        <ProgressLabel>
                                            <span>Total % used: <b>{totalUsed}%</b></span>
                                            <span>Remaining: <b>{100 - totalUsed}%</b></span>
                                        </ProgressLabel>
                                        <ProgressBg>
                                            <ProgressFill $pct={newTotal} />
                                        </ProgressBg>
                                    </ProgressWrap>

                                    {newTotal > 100 && <ErrorMsg>Total % exceeds 100!</ErrorMsg>}
                                    {errorMsg   && <ErrorMsg>{errorMsg}</ErrorMsg>}
                                    {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}

                                    <BtnRow>
                                        <SaveBtn type="button" disabled={isSaveDisabled} onClick={handleAddTopic}>
                                            Save Topic
                                        </SaveBtn>
                                        <SaveBtn type="button" onClick={handleSaveAll}>
                                            Save All
                                        </SaveBtn>
                                        <ClearBtn type="button" onClick={clearForm}>
                                            Clear
                                        </ClearBtn>
                                    </BtnRow>
                                </form>
                            </Card>

                            <Card>
                                <CardTitle>Topics Mapped</CardTitle>
                                <TableHeader>Topics for {selectedExam.examName}</TableHeader>

                                {topicList.length === 0 && tempTopics.length === 0 ? (
                                    <EmptyState>No topics added yet</EmptyState>
                                ) : (
                                    <>
                                        <StyledTable>
                                            <thead>
                                                <tr>
                                                    <Th>Exam ID</Th>
                                                    <Th>Topic ID</Th>
                                                    <Th>Topic Name</Th>
                                                    <Th>%</Th>
                                                    <Th>Questions</Th>
                                                    <Th>Start QID</Th>
                                                    <Th>End QID</Th>
                                                    <Th>Pass %</Th>
                                                    <Th>Action</Th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[...tempTopics, ...topicList].map((topic) => (
                                                    <tr key={topic.topicId}>
                                                        <Td>{topic.examId}</Td>
                                                        <Td>{topic.topicId}</Td>
                                                        <Td>{topic.topicName}</Td>
                                                        <Td>{topic.percentage}%</Td>
                                                        <Td>{topic.questionsPerExam}</Td>
                                                        <Td>{topic.startingQid}</Td>
                                                        <Td>{topic.endingQid}</Td>
                                                        <Td>{topic.topicPassPercentage}%</Td>
                                                        <Td>
                                                            <ActionBtn variant="edit" onClick={() => handleEditClick(topic)}>Edit</ActionBtn>
                                                            <ActionBtn variant="delete" onClick={() => setDeleteTarget(topic)}>Delete</ActionBtn>
                                                        </Td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </StyledTable>

                                        {/* ✅ Warning shown when total % is not 100 */}
                                        {topicList.length > 0 && Math.round(totalPct) !== 100 && (
                                            <WarningBar>
                                                ⚠️ Total topic percentage is {Math.round(totalPct)}% — must equal 100% before exam can be used.
                                            </WarningBar>
                                        )}
                                    </>
                                )}
                            </Card>
                        </TwoCol>
                    </>
                )}
            </TopicMain>

            <EditTopic
                isOpen={editModalOpen}
                onClose={handleCloseEditModal}
                examId={selectedExamId}
                examName={selectedExam?.examName}
                noOfQuestions={selectedExam?.noOfQuestions}
                topicData={selectedTopic}
                onUpdate={fetchTopics}
            />

            {deleteTarget && !showDeleteSuccess && (
                <ModalOverlay>
                    <SmallModal>
                        <SmBody>
                            <SmIconDanger>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                </svg>
                            </SmIconDanger>
                            <SmTitle>Delete Topic?</SmTitle>
                            <SmDesc>You are about to permanently delete</SmDesc>
                            <SmTagRed>{deleteTarget.topicName} · {deleteTarget.topicId}</SmTagRed>
                            <SmDesc>This action <strong>cannot be undone</strong>.</SmDesc>
                        </SmBody>
                        <SmFooter>
                            <GhostBtn onClick={() => setDeleteTarget(null)} disabled={deleteLoading}>Cancel</GhostBtn>
                            <DangerBtn onClick={handleConfirmDelete} disabled={deleteLoading}>
                                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
                            </DangerBtn>
                        </SmFooter>
                    </SmallModal>
                </ModalOverlay>
            )}

            {showDeleteSuccess && (
                <ModalOverlay>
                    <SmallModal>
                        <SmBody>
                            <SsCircleRed>
                                <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                            </SsCircleRed>
                            <SmTitle>Topic Deleted!</SmTitle>
                            <SmDesc>
                                {deletedTopicName} has been removed successfully.
                                The topic list has been updated.
                            </SmDesc>
                        </SmBody>
                        <SmFooter>
                            <PurpleBtn onClick={() => setShowDeleteSuccess(false)}>Close</PurpleBtn>
                        </SmFooter>
                    </SmallModal>
                </ModalOverlay>
            )}

        </Layout>
    );
}
