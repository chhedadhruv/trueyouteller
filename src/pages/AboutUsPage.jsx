import React from 'react';
import Dhruv from '../images/creators/dhruv.webp';
import Sanaj from '../images/creators/sanaj.webp';
import { buildMeta } from '../utils/seo';
import '../styles/AboutUsPage.css';
import TeamMemberCard from '../components/TeamMemberCard';

const teamMembers = [
  {
    name: 'Dhruv Chheda',
    role: 'Web Developer',
    imageUrl: Dhruv,
    githubUrl: 'https://github.com/chhedadhruv',
    linkedinUrl: 'https://www.linkedin.com/in/dhruv-chheda/',
  },
  {
    name: 'Sanaj Jadhav',
    role: 'Web Developer',
    imageUrl: Sanaj,
    githubUrl: 'https://github.com/sanajjadhav15',
    linkedinUrl: 'https://www.linkedin.com/in/sanaj-jadhav/',
  },
];

export const meta = () =>
  buildMeta({
    title: 'About TrueYouTeller - Our Story and Mission',
    description: 'Learn about the story and mission behind TrueYouTeller, the free and fun 16-type personality test. Meet the team helping you discover your true self.',
    path: '/about',
  });

const AboutUsPage = () => {
  return (
    <div className="about-us-container container section">
      <div className="about-us-content">
        <h1 className="page-title">About TrueYouTeller</h1>
        <p>
          Welcome to TrueYouTeller, your magical guide to self-discovery! We believe that understanding your personality is the first step towards a more authentic and fulfilling life. Our fun and insightful personality test is designed to reveal the unique traits that make you, you.
        </p>
        <p>
          Our mission is to blend a little bit of magic with psychology to create an enjoyable experience for everyone. We're not your typical, boring personality quiz. We've crafted each question to be engaging and thought-provoking, leading you on a journey to uncover your true self.
        </p>
        <h3>Our Vision</h3>
        <p>
          We envision a world where everyone understands and embraces their individuality. We hope our little corner of the internet can bring a smile to your face and a little more clarity to your path. So go ahead, gaze into the crystal ball and see what it has to say about you!
        </p>
      </div>

      <div className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members-container">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
              githubUrl={member.githubUrl}
              linkedinUrl={member.linkedinUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage; 