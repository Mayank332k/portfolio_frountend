import React, { useState, useRef, useEffect } from 'react';
import { 
  Instagram, 
  Send, 
  Globe,
  Twitter,
  MessageSquare,
  X,
  ArrowLeft,
  Menu,
  Square,
  Download,
  Github,
  Linkedin,
  Code2,
  Coffee,
  Layout,
  Palette,
  Terminal,
  Server,
  Zap,
  Database,
  Link,
  GitBranch,
  Cloud,
  Sparkles,
  Cpu,
  Brain,
  Monitor,
  Mail,
  Sun,
  Moon
} from 'lucide-react';
import './index.css';
import guyImg from './guy.png';
import ProjectCard from './components/ProjectCard';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hey! I'm Mayank's AI clone. Feel free to ask me anything about his work, skills, or availability." }
  ]);
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [showAutoArrow, setShowAutoArrow] = useState(false);
  
  // Rotating Placeholder Logic
  useEffect(() => {
    const messages = [
      "Ask about his projects",
      "Ask about tech stack",
      "Ask about backend experience",
      "Ask how he built this portfolio"
    ];
    
    let messageIndex = Math.floor(Math.random() * messages.length);
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentMessage = messages[messageIndex];
      
      if (isDeleting) {
        setPlaceholder(currentMessage.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setPlaceholder(currentMessage.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentMessage.length) {
        // Show arrow for 2 seconds when message is complete
        setShowAutoArrow(true);
        setTimeout(() => setShowAutoArrow(false), 2000);
        
        isDeleting = true;
        typingSpeed = 3000; // Increased pause to account for 2s arrow + extra beat
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * messages.length);
        } while (nextIndex === messageIndex);
        messageIndex = nextIndex;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const timeoutId = setTimeout(type, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, []);
  
  const projects = [
    {
      title: "SaidIt - Reddit Clone",
      description: "A minimal Reddit-style discussion platform with secure session management and a real-time public feed.",
      features: ["Session-based Authentication", "Public Feed & Likes", "MVC Architecture", "Protected Routes"],
      techStack: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "EJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }
      ],
      liveUrl: "https://saidit.onrender.com/login",
      githubUrl: "https://github.com/Mayank332k/SaidIt"
    },
    {
      title: "TaskFlow (React Basics)",
      description: "A task management app focused on clean state management and predictable UI behavior.",
      features: ["Context API & useReducer", "Immutable State Updates", "CRUD Operations", "Custom UI Design"],
      techStack: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" }
      ],
      liveUrl: "https://mayank332k.github.io/TaskFlow/",
      githubUrl: "https://github.com/Mayank332k/TaskFlow"
    },
    {
      title: "Admin Dashboard",
      description: "A professional administrative interface with dynamic navigation and user management logic.",
      features: ["State-based Authentication", "User Management Interface", "Lifted State Logic", "Sidebar Navigation"],
      techStack: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" }
      ],
      liveUrl: "https://mayank332k.github.io/Admine-Dashboard/",
      githubUrl: "https://github.com/Mayank332k/Admine-Dashboard"
    },
    {
      title: "Full-Stack Task Manager",
      description: "A production-ready system with secure REST APIs and advanced task management features.",
      features: ["JWT Authentication", "Searching & Filtering", "Paginated Task View", "Vercel & Render Deployment"],
      techStack: [
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" }
      ],
      liveUrl: "https://task-manager-frontend.vercel.app/",
      githubUrl: "https://github.com/Mayank332k/Task_Manager_frountend"
    }
  ];
  const [isStreaming, setIsStreaming] = useState(false);
  const readerRef = useRef(null);
  const chatMessagesRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Theme
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const stopStreaming = () => {
    if (readerRef.current) {
      readerRef.current.cancel();
      readerRef.current = null;
    }
    setIsStreaming(false);
  };

  const suggestions = [
    "Tell me about Mayank",
    "What projects has he built?",
    "What is his tech stack?",
    "How can I hire him?"
  ];

  const handleSendMessage = async (e, overrideText = null) => {
    if (e) e.preventDefault();
    if (isStreaming) return; // Block sending while AI is responding
    
    // Use the overrideText (from pill or placeholder click) or the normal input text
    const textToSend = overrideText || inputText;
    
    if (!textToSend.trim()) return;

    // Reset auto-arrow immediately on send
    setShowAutoArrow(false);

    // Add user message to UI
    const newMessages = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setInputText('');
    setIsStreaming(true);

    // Add a placeholder AI message that will receive the stream
    setMessages((prev) => [...prev, { role: 'ai', text: "" }]);

    try {
      const response = await fetch('https://portfolio-backend-z3ey.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: textToSend })
      });

      if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');

      const reader = response.body.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder('utf-8');
      let isStreamComplete = false;
      let buffer = '';

      while (!isStreamComplete) {
        const { value, done } = await reader.read();
        
        if (done) {
          isStreamComplete = true;
          break;
        }

        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Important: Keep the last partial line in the buffer
          buffer = lines.pop(); 
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              
              if (dataStr === '[DONE]') {
                isStreamComplete = true;
                break;
              }
              
              if (dataStr) {
                try {
                  const data = JSON.parse(dataStr);
                  setMessages((prev) => {
                    const nextMessages = [...prev];
                    const lastIndex = nextMessages.length - 1;
                    const lastMsg = { ...nextMessages[lastIndex] };
                    
                    if (lastMsg.role === 'ai') {
                      lastMsg.text += (data.content || "");
                      nextMessages[lastIndex] = lastMsg;
                    }
                    return nextMessages;
                  });
                } catch (err) {
                  // Wait for more data if parsing fails (fallback safety)
                  console.error("Error parsing SSE JSON:", err);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => {
        const nextMessages = [...prev];
        const lastIndex = nextMessages.length - 1;
        const lastMsg = { ...nextMessages[lastIndex] };
        
        if (lastMsg.role === 'ai' && !lastMsg.text) {
          lastMsg.text = "Oops, I'm having trouble connecting to my brain right now.";
          nextMessages[lastIndex] = lastMsg;
        }
        return nextMessages;
      });
    } finally {
      readerRef.current = null;
      setIsStreaming(false);
    }
  };

  return (
    <div className="app-container">
      
      {/* Top Navbar from Sketch */}
      <nav className={`navbar-container ${isChatOpen ? 'chat-active' : ''}`}>
        <div className="nav-content">
          <div className="nav-section nav-main-pill">
            <div className="nav-links desktop-only">
              <a href="#about">about</a>
              <a href="#projects">project</a>
              <a href="#education">education</a>
              <a href="#tools">tools</a>
              <a href="#contact">contact</a>
            </div>
            
            {/* Theme Toggle Button */}
            <button className="btn-theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile menu Toggle */}
            <button 
              className="btn-mobile-menu mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {!isChatOpen && (
            <div className="nav-section nav-chat-pill">
              {/* Premium Animated Textarea Trigger */}
              <form 
                className="nav-chat-form-wrapper"
                onSubmit={(e) => {
                  e.preventDefault();
                  const textToSend = inputText.trim() || (showAutoArrow ? placeholder : '');
                  if (!textToSend) return;
                  
                  setIsChatOpen(true);
                  handleSendMessage(e, textToSend);
                }}
              >
                <div className="textarea-glow-container">
                  <input
                    type="text"
                    className="nav-chat-textarea"
                    placeholder={placeholder}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (inputText.trim()) {
                          setIsChatOpen(true);
                          handleSendMessage(e);
                        }
                      }
                    }}
                  />
                  {(inputText.trim() || showAutoArrow) && (
                    <button type="submit" className="nav-chat-submit-btn">
                      <Send size={18} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Frosted Dropdown for Mobile */}
          {isMobileMenuOpen && (
            <div className="mobile-dropdown-menu">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>about</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>project</a>
              <a href="#education" onClick={() => setIsMobileMenuOpen(false)}>education</a>
              <a href="#tools" onClick={() => setIsMobileMenuOpen(false)}>tools</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Global Scroll Lane: The Connecting Pipe */}
      <div className="global-timeline-lane">
        <div className="global-line"></div>

        {/* Main Grid: 2 Columns */}
      <main id="about" className="content-grid">
        
        {/* Left Column: Text & Actions */}
        <section className="left-column">
          <h1 className="hero-title">
            Hi, I'm Mayank Singh. <span style={{ color: 'var(--primary)' }}>Full-Stack Developer</span>
          </h1>
          <p className="hero-subtitle">
            A full-stack developer in progress, building responsive and scalable web applications using modern technologies like React and currently learning backend with Node.js. Focused on writing clean code and solving real-world problems.
          </p>

          <div className="hero-actions">
            <a 
              href="/resume.pdf" 
              download="Mayank_Singh_Resume.pdf"
              className="btn-outline"
            >
              <Download size={16} />
              Download Resume
            </a>
            <div className="social-links">
              <a href="https://github.com/Mayank332k" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mayank-singh-813b68373/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/_mayvnk.ug?igsh=ZTIwa3VjdDJkZTY4" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:singhmayank4146@gmail.com" className="social-icon" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Right Column: Illustration OR Chat Widget */}
        <section className="right-column">
          
          {/* Default State: The 3D Avatar/Illustration */}
          <div className={`view-container illustration-view ${isChatOpen ? 'hidden' : 'visible'}`}>
             <img 
               src={guyImg} 
               alt="Character Illustration" 
               className="floating-guy-image"
             />
          </div>

          {/* Active State: The AI Chat Box */}
          <div className={`view-container chat-view ${isChatOpen ? 'visible' : 'hidden'}`}>
            <div className="chat-widget">
              <div className="chat-header">
                <button 
                  className="btn-back" 
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close Chat"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
                <div className="header-agent-info">
                  <div className="avatar">
                     <img 
                       src="https://api.dicebear.com/7.x/avataaars/svg?seed=MayankAI&backgroundColor=F05A28" 
                       alt="AI Avatar" 
                       style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                     />
                  </div>
                  <div className="header-info">
                    <h3>Mayank AI</h3>
                  </div>
                </div>
              </div>
              
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    {msg.role === 'ai' && msg.text === "" ? (
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                ))}
              </div>

              {/* Sugestion Pills - Only show at the start */}
              {messages.length === 1 && (
                <div className="chat-suggestions">
                  {suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx} 
                      className="suggestion-pill"
                      onClick={() => handleSendMessage(null, suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="chat-input-wrapper">
                <div className="textarea-glow-container chat-glow-pill">
                  <form onSubmit={(e) => handleSendMessage(e)} className="chat-input-form">
                    <input 
                      type="text" 
                      placeholder={isStreaming ? "AI is typing..." : "Message Mayank AI..."}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      disabled={isStreaming}
                    />
                    
                    {isStreaming ? (
                      <button 
                        type="button" 
                        className="btn-send-message btn-stop" 
                        aria-label="Stop Message"
                        onClick={stopStreaming}
                      >
                        <Square size={20} fill="currentColor" className="custom-send-icon" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        className="btn-send-message" 
                        aria-label="Send Message"
                      >
                        {/* Minimalist Geometric Paper Airplane mimicking user's icon */}
                        <svg className="custom-send-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12L3 2L6.5 11.5L16 12L6.5 12.5L3 22L22 12Z" />
                        </svg>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>

      {/* Projects Section Placeholder */}
      <section id="projects" className="section-container projects-section">
        <div className="section-marker">
          <div className="diamond-shape"></div>
        </div>
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-container education-section">
        <div className="section-marker">
          <div className="diamond-shape"></div>
        </div>
        <h2 className="section-title">Education</h2>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {/* Degree 1 */}
            <div className="timeline-item">
              <div className="timeline-dot">
                <div className="diamond-shape"></div>
              </div>
              <div className="timeline-content">
                <div className="edu-header">
                  <h3>Bachelor of Science in Computer Science</h3>
                  <span className="edu-date">2024 – 2027</span>
                </div>
                <p className="edu-college">Jnan Vikas Mandal's Mohanlal Raichand Mehta Degree College</p>
                <ul className="edu-details">
                  <li>Currently in Second Year (SYCS)</li>
                  <li>CGPA: 7.9 (till now)</li>
                  <li>Focused on core subjects like Data Structures, Programming, and Database concepts</li>
                  <li>Actively building backend development skills using Node.js and MongoDB</li>
                </ul>
              </div>
            </div>

            {/* If there were more, they would go here following the diamond skeleton structure */}
          </div>
      </section>

      {/* Tools & Tech Section */}
      <section id="tools" className="section-container tools-section">
        <div className="section-marker">
          <div className="diamond-shape"></div>
        </div>
        <h2 className="section-title">Tools & Technologies</h2>
          
          <div className="tools-grid">
            {/* Category: Languages */}
            <div className="tool-category">
              <h3>Languages</h3>
              <div className="skill-chips">
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JS" />
                  JavaScript
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" />
                  Java
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" />
                  HTML
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" />
                  CSS
                </div>
              </div>
            </div>

            {/* Category: Frontend */}
            <div className="tool-category">
              <h3>Frontend & Frameworks</h3>
              <div className="skill-chips">
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
                  React.js
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite" />
                  Vite
                </div>
              </div>
            </div>

            {/* Category: AI Tools */}
            <div className="tool-category">
              <h3>AI Tools</h3>
              <div className="skill-chips">
                <div className="skill-chip">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" />
                  ChatGPT
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.simpleicons.org/anthropic" alt="Claude" />
                  Claude
                </div>
                <div className="skill-chip">
                  <div className="ai-icon-circle" style={{ backgroundColor: '#000' }}>
                    <Cpu size={14} color="#fff" />
                  </div>
                  Kimi K2
                </div>
                <div className="skill-chip">
                  <div className="ai-icon-circle" style={{ backgroundColor: '#5A67D8' }}>
                    <Sparkles size={14} color="#fff" />
                  </div>
                  Stitch MCP
                </div>
                <div className="skill-chip">
                  <div className="ai-icon-circle antigravity-icon">
                    <Zap size={14} color="#fff" />
                  </div>
                  Antigravity
                </div>
              </div>
            </div>

            {/* Category: Tools & Technologies */}
            <div className="tool-category">
              <h3>Backend & Platform</h3>
              <div className="skill-chips">
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MERN" />
                  MERN Stack
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node" />
                  Node.js
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" alt="Express" className="invert-icon" />
                  Express.js
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  MongoDB
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg" alt="Mongoose" />
                  Mongoose
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VSCode" />
                  VS Code
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
                  Git
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="invert-icon" />
                  GitHub
                </div>
                <div className="skill-chip">
                  <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="Postman" />
                  Postman
                </div>
                <div className="skill-chip">
                  <img src="https://cdn.simpleicons.org/render" alt="Render" />
                  Render
                </div>
              </div>
            </div>
          </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="section-container contact-section">
        <div className="section-marker">
          <div className="diamond-shape"></div>
        </div>
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-card">
          <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <a href="mailto:singhmayank4146@gmail.com" className="email-link">
            <Mail size={24} />
            <span>singhmayank4146@gmail.com</span>
          </a>
        </div>
      </section>
      </div> {/* End global-timeline-lane */}


    </div>
  );
}

export default App;
