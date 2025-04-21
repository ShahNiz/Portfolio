import React, { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import useResizeObserver from "../hooks/useResizeObserver";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { mainBody, repos, about, skills } from "../editable-stuff/config.js";
import { NavLink } from "./home/migration";

const Navigation = React.forwardRef((props, ref) => {
  // const { showBlog, FirstName } = config;
  const [isTop, setIsTop] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navbarMenuRef = React.useRef();
  const navbarDimensions = useResizeObserver(navbarMenuRef);
  const navBottom = navbarDimensions ? navbarDimensions.bottom : 0;

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!navbarDimensions) return;
      currPos.y + ref.current.offsetTop - navbarDimensions.bottom > 5
        ? setIsTop(true)
        : setIsTop(false);
      setScrollPosition(currPos.y);
    },
    [navBottom]
  );

  React.useEffect(() => {
    if (!navbarDimensions) return;
    navBottom - scrollPosition >= ref.current.offsetTop
      ? setIsTop(false)
      : setIsTop(true);
  }, [navBottom, navbarDimensions, ref, scrollPosition]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar
      ref={navbarMenuRef}
      className={`px-3 fixed-top ${!isTop ? "navbar-white" : "navbar-transparent"} ${isOpen ? "nav-open" : ""}`}
      expand="lg"
      expanded={isOpen}
      onToggle={handleToggle}
    >
      <Navbar.Brand 
        className="navbar-brand" 
        href={process.env.PUBLIC_URL + "/#home"}
        onClick={() => setIsOpen(false)}
      >
        {`<${mainBody.firstName} />`}
      </Navbar.Brand>
      <Navbar.Toggle 
        aria-controls="basic-navbar-nav" 
        className="toggler"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {/* {
            <NavLink className="nav-item lead">
              <Link to={process.env.PUBLIC_URL + "/blog"}>Blog</Link>
            </NavLink>
          } */}
          {repos.show && (
            <NavLink
              href={process.env.PUBLIC_URL + "/#projects"}
              className="nav-item"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </NavLink>
          )}
          <NavLink
            className="nav-item"
            href={about.resume}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </NavLink>
          {about.show && (
            <NavLink
              className="nav-item"
              href={process.env.PUBLIC_URL + "/#aboutme"}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          )}
          {skills.show && (
            <NavLink
              className="nav-item"
              href={process.env.PUBLIC_URL + "/#skills"}
              onClick={() => setIsOpen(false)}
            >
              Skills
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;
