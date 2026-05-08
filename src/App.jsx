import React, { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import { 
  Instagram, 
  Send, 
  Globe,
  MessageSquare,
  X,
  ArrowLeft,
  Menu,
  Square,
  Download,
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Cpu,
  Circle,
  Triangle,
  Brain
} from 'lucide-react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProjectCard from './components/ProjectCard';
import { GitHubCalendar } from 'react-github-calendar';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hey! I'm Mayank's AI clone. Feel free to ask me anything about his work, skills, or availability." }
  ]);
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  
  // Smooth Scroll Initialization (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Back to standard for better responsiveness
      lerp: 0.1,    // Higher lerp for more "snappy" feel
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Haptic Feedback for Stacked Cards (Mobile/Chrome)
  useEffect(() => {
    if (!('vibrate' in navigator)) return;

    // Interaction "Unlocker" - Browsers require one tap to allow vibrations
    const unlockHaptics = () => {
      navigator.vibrate(1); // Tiny invisible vibration to unlock the API
      window.removeEventListener('touchstart', unlockHaptics);
      window.removeEventListener('mousedown', unlockHaptics);
    };
    window.addEventListener('touchstart', unlockHaptics);
    window.addEventListener('mousedown', unlockHaptics);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -75% 0px', // Adjusted threshold for better timing
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navigator.vibrate(10);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // We use a small timeout to ensure the cards are fully rendered in the DOM
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => observer.observe(card));
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener('touchstart', unlockHaptics);
      window.removeEventListener('mousedown', unlockHaptics);
    };
  }, []);

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
        isDeleting = true;
        typingSpeed = 2000;
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
      title: "PrepMe — AI Technical Interviewer",
      description: "A premium MERN platform that uses Gemini AI to conduct context-aware technical interviews and provide real-time performance analytics.",
      features: ["AI Resume Parsing", "Real-time Interview Simulations", "In-depth Performance Analytics", "Session Persistence"],
      techStack: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Google Gemini", icon: "https://cdn.simpleicons.org/googlegemini" }
      ],
      liveUrl: "https://prep-me-mu.vercel.app/",
      githubUrl: "https://github.com/Mayank332k/PrepMe",
      featured: true
    },
    {
      title: "Pulse Chat — Real-time Experience",
      description: "A high-performance, real-time messaging application. Powered by Socket.io and custom Zustand persistence.",
      features: ["Sub-millisecond delivery", "Offline-first persistence", "Framer Motion transitions", "AI Integration"],
      techStack: [
        { name: "React 19", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" }
      ],
      liveUrl: "https://chat-app-frontend-dqrk.vercel.app/",
      githubUrl: "https://github.com/Mayank332k/chat-app-frontend.git",
      featured: true
    },
    {
      title: "SaidIt - Reddit Clone",
      description: "A minimal Reddit-style discussion platform with secure session management and a real-time public feed.",
      features: ["Session-based Auth", "Public Feed & Likes", "MVC Architecture"],
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
      features: ["Context API", "Immutable Updates", "CRUD Operations"],
      techStack: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }
      ],
      liveUrl: "https://mayank332k.github.io/TaskFlow/",
      githubUrl: "https://github.com/Mayank332k/TaskFlow"
    }
  ];

  const [isStreaming, setIsStreaming] = useState(false);
  const readerRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

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

  const handleSendMessage = async (e, overrideText = null) => {
    if (e) e.preventDefault();
    if (isStreaming) return;
    
    const textToSend = overrideText || inputText;
    if (!textToSend.trim()) return;

    // Haptic feedback on interaction
    if ('vibrate' in navigator) navigator.vibrate(10);

    const newMessages = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setInputText('');
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: 'ai', text: "" }]);

    try {
      const response = await fetch('https://portfolio-backend-z3ey.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!response.ok) throw new Error("Connection failed");

      const reader = response.body.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder('utf-8');
      let isStreamComplete = false;
      let buffer = '';

      while (!isStreamComplete) {
        const { value, done } = await reader.read();
        if (done) { isStreamComplete = true; break; }
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop(); 
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              if (dataStr === '[DONE]') { isStreamComplete = true; break; }
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
                } catch (err) { console.error(err); }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'system', text: "Error connecting to brain." };
        return next;
      });
    } finally {
      readerRef.current = null;
      setIsStreaming(false);
    }
  };

  return (
    <div className="app-container">
      {/* Background Floating Shapes */}
      <div className="bg-shape shape-1"><Circle size={100} fill="currentColor" /></div>
      <div className="bg-shape shape-2"><Triangle size={120} fill="currentColor" /></div>
      <div className="bg-shape shape-3"><Zap size={80} fill="currentColor" /></div>

      <nav className="navbar-container">
        <div className="nav-content">
          <div className="logo" style={{ fontSize: '1.2rem', fontWeight: 900 }}>MAYANK.DEV</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#tools">Tools</a>
            <a href="#contact">Contact</a>
            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', verticalAlign: 'middle', color: '#fff' }}>
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </div>
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: '#fff' }}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button className="close-menu" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="mobile-nav-links">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            <a href="#tools" onClick={() => setIsMobileMenuOpen(false)}>Tools</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <button onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }} className="btn-outline" style={{ background: 'var(--primary)', marginTop: '1rem' }}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      )}

      <main id="about" className="content-grid">
        <section className="left-column">
          <h1 className="hero-title">
            I DESIGN & <br/> <span style={{ color: 'var(--primary)' }}>BUILD FOR GROWTH.</span>
          </h1>
          <p className="hero-subtitle">
            Full-stack developer building high-impact web applications. Currently scaling my skills with React, Node.js, and AI integrations.
          </p>

          <div className="hero-actions">
            <a href="/resume2_0.pdf" download className="btn-outline">
              <Download size={20} />
              Resume
            </a>
            <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/Mayank332k" target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/mayank-singh-813b68373/" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={24} /></a>
              <a href="https://www.instagram.com/_mayvnk.ug?igsh=ZTIwa3VjdDJkZTY4" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={24} /></a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=singhmayank4146@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Mail size={24} /></a>
            </div>
          </div>
        </section>

        <section className="right-column">
          <div className="chat-card-container">
            {!isChatOpen ? (
              /* AI Intro Card State */
              <div className="project-card" style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--card-bg)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'var(--accent)', 
                  border: 'var(--border-thick)', 
                  borderRadius: '50%', 
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <Sparkles size={40} />
                </div>
                <h3 style={{ marginBottom: '1.5rem' }}>Mayank AI</h3>
                <p style={{ marginBottom: '2rem', fontWeight: 700, fontSize: '0.9rem', color: '#666' }}>
                  Ask me about Mayank's experience, skills, or even just to crack a dev joke. I'm always here.
                </p>
                <button 
                  className="btn-outline" 
                  style={{ width: '100%', background: 'var(--secondary)' }}
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageSquare size={20} />
                  Start Chatting
                </button>
              </div>
            ) : (
              /* Active Chat Bot State */
              <div className="chat-view">
                <div className="chat-header">
                  <button className="btn-back" onClick={() => setIsChatOpen(false)}>
                    <ArrowLeft size={20} />
                    Back
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%' }}></div>
                    <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem' }}>Live Assistant</span>
                  </div>
                </div>
                
                <div className="chat-messages" ref={chatMessagesRef}>
                  
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                      {msg.role === 'ai' && msg.text === "" && isStreaming && index === messages.length - 1 ? (
                        <div className="typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      )}
                    </div>
                  ))}

                  {/* Only show quick actions if there are no user messages yet (only the welcome message) */}
                  {messages.length === 1 && !isStreaming && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem', padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                      {[
                        "What projects have you worked on?",
                        "What is your tech stack?",
                        "Are you available for hire?",
                        "Tell me a dev joke!"
                      ].map((q, i) => (
                        <button 
                          key={i} 
                          onClick={() => {
                            setInputText(q);
                            const fakeEvent = { preventDefault: () => {} };
                            handleSendMessage(fakeEvent, q);
                          }}
                          className="btn-outline"
                          style={{ 
                            padding: '0.6rem 1rem', 
                            fontSize: '0.8rem', 
                            background: 'var(--bg-color)', 
                            boxShadow: '3px 3px 0px #000',
                            textTransform: 'none',
                            fontWeight: 700
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="chat-input-wrapper">
                  <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input 
                      type="text" 
                      placeholder={placeholder} 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" className="btn-send-message">
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Infinite Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="marquee-text">
              CRAFTING DIGITAL EXPERIENCES <Sparkles size={24} fill="#000" />
              BUILDING SCALABLE SOLUTIONS <Zap size={24} fill="#000" />
              AI-POWERED INNOVATION <Brain size={24} />
              PIXEL PERFECT DESIGN <Zap size={24} fill="#000" />
            </div>
          ))}
        </div>
      </div>

      <section id="projects" className="section-container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <section id="consistency" className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="section-title">Consistency</h2>
        <div className="project-card" style={{ 
          padding: '2.5rem', 
          width: 'fit-content', 
          maxWidth: '100%',
          margin: '0 auto',
          background: 'var(--card-bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <GitHubCalendar 
              username="Mayank332k" 
              blockSize={16}
              blockMargin={6}
              fontSize={14}
              hideTotalCount
              transformData={(data) => data.slice(-90)}
              theme={{
                light: ['#ebedf0', 'var(--primary)', 'var(--primary)', 'var(--primary)', 'var(--primary)'],
                dark: ['#333', 'var(--primary)', 'var(--primary)', 'var(--primary)', 'var(--primary)'],
              }}
              style={{
                color: 'var(--text-dark)',
              }}
            />
          </div>
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Recent Activity (90 Days)
          </div>
        </div>
      </section>

      <section id="tools" className="section-container">
        <h2 className="section-title">Tech Stack</h2>
        <div className="project-card" style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {["React", "Node.js", "MongoDB", "JavaScript", "Express", "Vite", "Git", "Tailwind"].map((tool) => (
              <div key={tool} className="btn-outline" style={{ background: 'var(--bg-color)', cursor: 'default' }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Get In Touch</h2>
        <div className="project-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem' }}>
            Looking for new opportunities or just want to say hi?
          </p>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=singhmayank4146@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-outline" 
            style={{ background: 'var(--primary)', color: '#000', marginBottom: '2rem' }}
          >
            <Mail size={24} />
            Email Me
          </a>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
            <a href="https://github.com/Mayank332k" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)' }}><Github size={28} /></a>
            <a href="https://www.linkedin.com/in/mayank-singh-813b68373/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)' }}><Linkedin size={28} /></a>
            <a href="https://www.instagram.com/_mayvnk.ug?igsh=ZTIwa3VjdDJkZTY4" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)' }}><Instagram size={28} /></a>
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem 0', textAlign: 'center', fontWeight: 900, textTransform: 'uppercase' }}>
        © 2026 Mayank Singh // Built for Growth
      </footer>
    </div>
  );
}

export default App;
