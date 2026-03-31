import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 0 20px;

  height: 60px;

  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 0.6rem 1rem;
font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.link};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-radius:12px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.surface};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.surface};
    font-weight: 600;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/exammaster">Exam Master</StyledNavLink>
        <StyledNavLink to="/user">User Master</StyledNavLink>
        <StyledNavLink to="/reports">Reports</StyledNavLink>
        <StyledNavLink to="/search">Search</StyledNavLink>
        <StyledNavLink to="/utilities">Utilities</StyledNavLink>
      </HeaderContainer>
    </HeaderWrapper>
  );
}