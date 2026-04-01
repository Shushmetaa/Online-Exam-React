import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  width: 440px;
  max-width: 90vw;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderIcon = styled.div`
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 17px;
    height: 17px;
    stroke: white;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
  }
`;

const HeaderText = styled.div`
  h3 {
    font-size: 15px;
    font-weight: 700;
    color: white;
    margin: 0;
  }
  p {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
    margin: 2px 0 0;
  }
`;

const ModalBody = styled.div`
  padding: 20px 22px;
`;

const InfoBar = styled.div`
  background: #ece9f8;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    font-size: 10px;
    color: #7a6bb0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  span:last-child {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

const FormRowFull = styled.div`
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
  letter-spacing: 0.5px;
`;

const FormInput = styled.input`
  border: 1px solid #e0daf5;
  border-radius: 10px;
  padding: 10px 13px;
  font-size: 13px;
  color: #1f2937;
  background: #fafafa;
  outline: none;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    background: white;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 42, 143, 0.12);
  }
`;

const CalcBadge = styled.div`
  background: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 9px 13px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span:first-child {
    color: #7a6bb0;
    font-weight: 500;
  }
`;

const ErrorMsg = styled.p`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
`;

const ModalFooter = styled.div`
  padding: 14px 22px;
  border-top: 1px solid #f0edf8;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const PrimaryButton = styled.button`
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

  &:hover:not(:disabled) { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SecondaryButton = styled.button`
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

  &:hover:not(:disabled) { background: #e5e7eb; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
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

const SmIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #fff8e1;
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

const SmTag = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin: 8px 0;
  background: #ece9f8;
  color: ${({ theme }) => theme.colors.primary};
`;

const SmFooter = styled.div`
  padding: 0 24px 22px;
  display: flex;
  gap: 10px;

  button { flex: 1; }
`;

const SsBody = styled.div`
  padding: 30px 24px 18px;
  text-align: center;
`;

const SsCircle = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
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


export const EditTopic = ({ isOpen, onClose, examId, topicData, onUpdate, examName, noOfQuestions }) => {

  const [formData, setFormData] = useState({
    topicId: '',
    topicName: '',
    percentage: '',
    topicPassPercentage: ''
  });
  const [loading, setLoading]           = useState(false);
  const [errorMsg, setErrorMsg]         = useState('');
  const [showConfirm, setShowConfirm]   = useState(false);   // confirm popup
  const [showSuccess, setShowSuccess]   = useState(false);   // success popup

  useEffect(() => {
    if (topicData && isOpen) {
      setFormData({
        topicId:             topicData.topicId || '',
        topicName:           topicData.topicName || '',
        percentage:          topicData.percentage || '',
        topicPassPercentage: topicData.topicPassPercentage || ''
      });
      setErrorMsg('');
      setShowConfirm(false);
      setShowSuccess(false);
    }
  }, [topicData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const totalQ      = noOfQuestions || topicData?.questionsPerExam
                        ? Math.round((100 / parseFloat(topicData?.percentage || 1)) * parseFloat(topicData?.questionsPerExam || 0))
                        : 0;
  const computedQ   = Math.round((parseFloat(formData.percentage || 0) / 100) * (noOfQuestions || totalQ || 0));
  const startQid    = topicData?.startingQid || 1;
  const endQid      = startQid + computedQ - 1;

  const handleUpdateClick = () => {
    if (!formData.topicId.trim() || !formData.topicName.trim() || !formData.percentage || !formData.topicPassPercentage) {
      setErrorMsg('Please fill all required fields.');
      return;
    }
    setErrorMsg('');
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirm(false);
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append('examId',              examId || '');
      params.append('topicId',             formData.topicId.trim());
      params.append('topicName',           formData.topicName.trim());
      params.append('percentage',          formData.percentage);
      params.append('topicPassPercentage', formData.topicPassPercentage);
      params.append('startingQid',         topicData.startingQid || '');
      params.append('endingQid',           topicData.endingQid || '');
      params.append('questionsPerExam',    topicData.questionsPerExam || '');

      const res  = await fetch('/exam/api/admin/topic/update', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      const data = await res.json();

      if (data.responseMessage === 'success') {
        onUpdate(examId);
        setShowSuccess(true);
      } else {
        setErrorMsg('Error: ' + (data._ERROR_MESSAGE_ || 'Update failed'));
      }
    } catch (error) {
      console.error('Update error:', error);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !showConfirm && !showSuccess) onClose();
  };

  if (!isOpen || !topicData) return null;

  if (showSuccess) {
    return (
      <ModalOverlay>
        <SmallModal>
          <SsBody>
            <SsCircle>
              <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </SsCircle>
            <SmTitle>Topic Updated!</SmTitle>
            <SmDesc>
              {formData.topicName} ({formData.topicId}) has been updated successfully.
              The topic list has been refreshed.
            </SmDesc>
          </SsBody>
          <SmFooter>
            <PrimaryButton onClick={handleSuccessDone}>Done</PrimaryButton>
          </SmFooter>
        </SmallModal>
      </ModalOverlay>
    );
  }

  if (showConfirm) {
    return (
      <ModalOverlay>
        <SmallModal>
          <SmBody>
            <SmIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </SmIcon>
            <SmTitle>Confirm Update</SmTitle>
            <SmDesc>Are you sure you want to update</SmDesc>
            <SmTag>{formData.topicName} · {formData.topicId}</SmTag>
            <SmDesc>This will overwrite the existing topic data.</SmDesc>
          </SmBody>
          <SmFooter>
            <SecondaryButton onClick={() => setShowConfirm(false)}>Go Back</SecondaryButton>
            <PrimaryButton onClick={handleConfirmUpdate} disabled={loading}>
              {loading ? 'Updating...' : 'Yes, Update'}
            </PrimaryButton>
          </SmFooter>
        </SmallModal>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>

        <ModalHeader>
          <HeaderIcon>
            <svg viewBox="0 0 20 20">
              <path d="M4 13.5V16h2.5l7.4-7.4-2.5-2.5L4 13.5z" />
              <path d="M16.7 5.8a1 1 0 000-1.4l-1.1-1.1a1 1 0 00-1.4 0l-1.1 1.1 2.5 2.5 1.1-1.1z" />
            </svg>
          </HeaderIcon>
          <HeaderText>
            <h3>Edit Form</h3>
            <p>{examName || 'Exam'} &nbsp;·&nbsp; {examId}</p>
          </HeaderText>
        </ModalHeader>

        <ModalBody>

          <InfoBar>
            <InfoItem>
              <span>Exam ID</span>
              <span>{examId}</span>
            </InfoItem>
            <InfoItem>
              <span>Q Range</span>
              <span>
                {topicData.startingQid && topicData.endingQid
                  ? `${topicData.startingQid} – ${topicData.endingQid}`
                  : '--'}
              </span>
            </InfoItem>
            <InfoItem>
              <span>Questions</span>
              <span>{topicData.questionsPerExam || '--'}</span>
            </InfoItem>
          </InfoBar>

          <FormRow>
            <FormGroup>
              <FormLabel>Topic ID *</FormLabel>
              <FormInput
                type="text"
                name="topicId"
                value={formData.topicId}
                onChange={handleInputChange}
                placeholder="e.g. T001"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Topic Name *</FormLabel>
              <FormInput
                type="text"
                name="topicName"
                value={formData.topicName}
                onChange={handleInputChange}
                placeholder="e.g. Core Java"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Percentage (%) *</FormLabel>
              <FormInput
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                placeholder="e.g. 30"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Topic Pass % *</FormLabel>
              <FormInput
                type="number"
                name="topicPassPercentage"
                value={formData.topicPassPercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                placeholder="e.g. 50"
              />
            </FormGroup>
          </FormRow>

          <CalcBadge>
            <span>Questions from this topic:</span>
            <span>{computedQ} questions</span>
          </CalcBadge>
          <CalcBadge>
            <span>QID Range:</span>
            <span>{startQid} – {endQid}</span>
          </CalcBadge>

          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

        </ModalBody>

        <ModalFooter>
          <SecondaryButton onClick={onClose} disabled={loading}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleUpdateClick} disabled={loading}>
            {loading ? 'Updating...' : 'Update Topic'}
          </PrimaryButton>
        </ModalFooter>

      </ModalContent>
    </ModalOverlay>
  );
};
