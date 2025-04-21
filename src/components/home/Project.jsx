import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Jumbotron } from "./migration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import "../../scss/Project.scss";
import movie from '../../movie.png'
import todo from '../../todo.png'



const Project = ({ heading, username, length, specfic }) => {
  const [projectsArray, setProjectsArray] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const projects = [
        {
          name: "Movie Recommendation Website",
          description: "A website that recommends movies to users based on their preferences",
          image: movie,
          technologies: ["React", "Bootstrap", "SCSS", "JavaScript"],
          github: "https://github.com/ShahNiz/MovieApp",
          demo: "https://shahniz.github.io/MovieApp/"
        },
        {
          name: "Task Management App",
          description: "A task management app that allows users to manage their tasks",
          image: todo,
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          github: "https://github.com/ShahNiz/Task-Manager",
          demo: "https://yourecommerce.com"
        },
        // Add more projects here
      ];

      setProjectsArray(projects);
    };

    loadProjects();
  }, []);

  const displayedProjects = showMore ? projectsArray : projectsArray.slice(0, 6);

  return (
    <Jumbotron fluid id="projects" className="projects-section">
      <Container>
        <div className="section-title">
          <h2>{heading}</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <div className="project-card" key={`project-${index}`}>
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Project+Image";
                  }}
                />
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Source Code"
                      className="project-link"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Live Demo"
                      className="project-link"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={`tech-${techIndex}`} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-buttons">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-demo-btn"
                  >
                    View On Github 
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projectsArray.length > 6 && (
          <div className="load-more">
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </Container>
    </Jumbotron>
  );
};

export default Project;
