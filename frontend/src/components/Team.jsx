import React from 'react';
import { ExternalLink, Github, Linkedin } from 'lucide-react';
import '../styles/Team.css';

import kunalImage from '../../public/kunal.png';
import sangyaImage from '../../public/sangya.png';
import dhruvImage from '../../public/dhruv.jpg';

function Team() {
    const teamMembers = [
        {
            "name": "Kunal Sharma",
            "portfolio": "https://kunal-portfolio-lemon.vercel.app/",
            "linkedin": "https://www.linkedin.com/in/kunal-sharma-8b9787334/",
            "github": "https://github.com/kunnusherry",
            "role": "Full Stack Developer",
            "image": kunalImage
        },
        {
            "name": "Sangya Ojha",
            "portfolio": "https://portfolio-sangya.vercel.app/",
            "linkedin": "https://www.linkedin.com/in/sangya-ojha-7a58a22a3/",
            "github": "https://github.com/sangya-25",
            "role": "Frontend Developer",
            "image": sangyaImage
        },
        {
            "name": "Dhruv Sharma",
            "portfolio": "https://dhruvs-portfolio-khaki.vercel.app/",
            "linkedin": "https://www.linkedin.com/in/dhruv-sharma-331379154/",
            "github": "https://github.com/dhruv0050",
            "role": "Full Stack Developer",
            "image": dhruvImage
        },
    ];

    return (
        <div className="team-container">
            {/* Main Content */}
            <div className="main-content">
                {/* Title Section */}
                <div className="title-section">
                    <h2 className="main-title">Meet Our Team</h2>
                    <p className="main-subtitle">
                        The dedicated developers behind Sniffy's safety monitoring system
                    </p>
                </div>

                {/* Team Cards Grid */}
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            {/* Profile Image */}
                            <div className="profile-image-container">
                                <div className="profile-image-wrapper">
                                    <img 
                                        src={member.image} 
                                        alt={`${member.name} profile`}
                                        className="profile-image"
                                        onError={(e) => {
                                            // Fallback to initials if image fails to load
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="profile-fallback">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="member-info">
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                            </div>

                            {/* Links */}
                            <div className="links-section">
                                <a 
                                    href={member.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-link"
                                >
                                    <ExternalLink size={20} />
                                    <span>Portfolio</span>
                                </a>
                                
                                <div className="social-links">
                                    <a 
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <Linkedin size={20} />
                                        <span>LinkedIn</span>
                                    </a>
                                    
                                    <a 
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <Github size={20} />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                            </div>

                            {/* Decorative flame icons */}
                            <div className="decorative-dots">
                                <div className="dot dot-red"></div>
                                <div className="dot dot-red-light"></div>
                                <div className="dot dot-red"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Project Info */}
                <div className="project-info">
                    <div className="project-card">
                        <h3 className="project-title">About Sniffy</h3>
                        <p className="project-description">
                            A comprehensive safety monitoring system for LPG installations, featuring real-time 
                            gas leak detection, automated emergency protocols, and instant alert notifications. 
                            Built with modern web technologies to ensure the highest safety standards for 
                            residential and commercial LPG systems.
                        </p>
                        <div className="project-tags">
                            <div className="tags-container">
                                <span className="tag">React</span>
                                <span className="tag">IoT</span>
                                <span className="tag">Safety</span>
                                <span className="tag">Monitoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;