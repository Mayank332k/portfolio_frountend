import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, features = [], techStack = [], liveUrl, githubUrl }) => {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-title-text">{title}</h3>
      </div>
      
      <div className="project-card-body">
        <div className="project-tech-header-icons">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-chip-minimal" title={tech.name}>
              <img src={tech.icon} alt={tech.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        
        <p className="project-description">{description}</p>
        
        {features.length > 0 && (
          <div className="project-features">
            <h4>Key Details</h4>
            <ul>
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="project-card-footer">
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live-link">
            <ExternalLink size={16} />
            live test url
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-link github-link">
            <Github size={16} />
            git hub url
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
