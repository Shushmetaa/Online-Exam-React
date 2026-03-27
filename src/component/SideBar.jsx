import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1em;
  padding: 0.75rem;
  color: rgb(253, 255, 255);
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    background-color: rgb(152, 216, 213);
    color: black;
  }

  &.active {
    color: rgb(242, 242, 250);
    background-color: rgb(7, 92, 88);
    font-weight: 600;
  }
`;
const Nav = styled.div`
  background-color: rgb(17, 136, 130);
  height: 100vh;
  width: 20%;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

export default function SideBar() {
  return (
    <Nav>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/exammaster">Exam Master</StyledNavLink>
      <StyledNavLink to="/user">User Master</StyledNavLink>
      <StyledNavLink to="/reports">Reports</StyledNavLink>
      <StyledNavLink to="/search">Search</StyledNavLink>
      <StyledNavLink to="/utilities">Utilities</StyledNavLink>
    </Nav>
  );
}