import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, features = [], techStack = [], liveUrl, githubUrl, featured }) => {
  return (
    <div className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="project-card-header" style={{ marginBottom: '1.5rem' }}>
        <h3 className="project-title-text" style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>{title}</h3>
      </div>
      
      <div className="project-card-body">
        <div className="project-tech-header-icons" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {techStack.map((tech, index) => (
            <div key={index} className="tech-chip-minimal" title={tech.name} style={{ background: '#eee', padding: '4px', borderRadius: '4px', border: '2px solid #000' }}>
              <img src={tech.icon} alt={tech.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        
        <p className="project-description" style={{ fontWeight: '500', marginBottom: '1.5rem' }}>{description}</p>
        
        {features.length > 0 && (
          <div className="project-features" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Key Details</h4>
            <ul style={{ listStyle: 'none' }}>
              {features.map((feature, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="project-card-footer" style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--secondary)' }}>
            <ExternalLink size={16} />
            live demo
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--card-bg)' }}>
            <Github size={16} />
            github
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
