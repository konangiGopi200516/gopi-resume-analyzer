import type { PersonalInfo, Experience, Education, Project, Skills, Theme } from './resumeStore';

export interface TemplateContent {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  certifications: string;
  achievements: string;
}

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export const TEMPLATE_CONTENTS: Record<string, TemplateContent> = {
  'Software Engineer 1': {
    personalInfo: {
      name: 'Alex Johnson', title: 'Frontend Developer', email: 'alex.j@example.com', phone: '(555) 111-2222', location: 'New York, NY', linkedin: 'linkedin.com/in/alexj', github: 'github.com/alexj', photo: ''
    },
    summary: 'Creative Frontend Developer with 4 years of experience building responsive, accessible, and performant web applications using React and Vue.js.',
    experience: [{ id: generateId(), company: 'Creative Web Agency', role: 'Frontend Developer', startDate: '2020', endDate: 'Present', description: 'Developed highly interactive user interfaces using React.\nImproved website performance by 30% through code splitting.' }],
    education: [{ id: generateId(), school: 'University of Technology', degree: 'B.S. Software Engineering', startDate: '2016', endDate: '2020', cgpa: '3.7' }],
    projects: [{ id: generateId(), name: 'E-commerce Redesign', description: 'Led the frontend architecture for a major e-commerce platform.', technologies: 'React, Redux, Tailwind CSS' }],
    skills: { languages: 'JavaScript, HTML, CSS, TypeScript', frameworks: 'React, Vue, Next.js', tools: 'Webpack, Vite, Git' },
    certifications: 'Meta Frontend Developer Certificate', achievements: 'Employee of the Month - July 2022'
  },
  'Software Engineer 2': {
    personalInfo: {
      name: 'Sarah Connor', title: 'Backend Software Engineer', email: 'sarah.c@example.com', phone: '(555) 222-3333', location: 'Seattle, WA', linkedin: 'linkedin.com/in/sarahc', github: 'github.com/sarahc', photo: ''
    },
    summary: 'Detail-oriented Backend Engineer specializing in scalable microservices, API design, and database optimization. Passionate about building robust systems.',
    experience: [{ id: generateId(), company: 'Cloud Systems Inc.', role: 'Backend Engineer', startDate: '2019', endDate: 'Present', description: 'Designed and implemented RESTful APIs using Node.js and Express.\nOptimized database queries, reducing load times by 40%.' }],
    education: [{ id: generateId(), school: 'State University', degree: 'M.S. Computer Science', startDate: '2017', endDate: '2019', cgpa: '3.9' }],
    projects: [{ id: generateId(), name: 'Payment Gateway Integration', description: 'Built a secure microservice for handling Stripe payments.', technologies: 'Node.js, PostgreSQL, Docker' }],
    skills: { languages: 'Python, Java, JavaScript, SQL', frameworks: 'Express, Django, Spring Boot', tools: 'Docker, Kubernetes, AWS' },
    certifications: 'AWS Certified Developer', achievements: 'Reduced API response time by 200ms.'
  },
  'Software Engineer 3': {
    personalInfo: {
      name: 'David Chen', title: 'Full Stack Engineer', email: 'david.chen@example.com', phone: '(555) 333-4444', location: 'Austin, TX', linkedin: 'linkedin.com/in/davidchen', github: 'github.com/davidchen', photo: ''
    },
    summary: 'Versatile Full Stack Engineer with expertise in the MERN stack. Strong track record of delivering end-to-end solutions from concept to deployment.',
    experience: [{ id: generateId(), company: 'Startup Hub', role: 'Full Stack Engineer', startDate: '2021', endDate: 'Present', description: 'Built and maintained multiple SaaS products.\nImplemented real-time features using WebSockets.' }],
    education: [{ id: generateId(), school: 'Tech College', degree: 'B.S. Computer Science', startDate: '2017', endDate: '2021', cgpa: '3.6' }],
    projects: [{ id: generateId(), name: 'Collaborative Editor', description: 'Created a real-time collaborative text editor.', technologies: 'React, Node.js, Socket.io, MongoDB' }],
    skills: { languages: 'JavaScript, TypeScript', frameworks: 'React, Node.js, Express', tools: 'MongoDB, Git, Jest' },
    certifications: 'MongoDB Certified Developer', achievements: 'Launched 3 major products in 1 year.'
  },
  'Software Engineer 4': {
    personalInfo: {
      name: 'Emily Davis', title: 'DevOps Engineer', email: 'emily.d@example.com', phone: '(555) 444-5555', location: 'Denver, CO', linkedin: 'linkedin.com/in/emilyd', github: 'github.com/emilyd', photo: ''
    },
    summary: 'Experienced DevOps Engineer focused on automating infrastructure, CI/CD pipelines, and ensuring system reliability and scalability.',
    experience: [{ id: generateId(), company: 'Enterprise Solutions', role: 'DevOps Engineer', startDate: '2018', endDate: 'Present', description: 'Managed AWS infrastructure using Terraform.\nReduced deployment time by 60% through CI/CD automation.' }],
    education: [{ id: generateId(), school: 'Engineering Institute', degree: 'B.S. Information Technology', startDate: '2014', endDate: '2018', cgpa: '3.5' }],
    projects: [{ id: generateId(), name: 'Infrastructure as Code', description: 'Migrated legacy servers to containerized AWS infrastructure.', technologies: 'Terraform, Docker, Jenkins' }],
    skills: { languages: 'Bash, Python, Go', frameworks: 'N/A', tools: 'AWS, Terraform, Kubernetes, Jenkins' },
    certifications: 'AWS Certified Solutions Architect', achievements: 'Achieved 99.99% uptime for core services.'
  },
  'Software Engineer 5': {
    personalInfo: {
      name: 'Michael Wilson', title: 'Data Engineer', email: 'michael.w@example.com', phone: '(555) 555-6666', location: 'Boston, MA', linkedin: 'linkedin.com/in/michaelw', github: 'github.com/michaelw', photo: ''
    },
    summary: 'Data Engineer with a passion for building robust data pipelines, data warehousing, and enabling data-driven decision making.',
    experience: [{ id: generateId(), company: 'Data Analytics Co.', role: 'Data Engineer', startDate: '2020', endDate: 'Present', description: 'Built ETL pipelines processing 10TB+ of data daily.\nOptimized Redshift queries for business intelligence dashboards.' }],
    education: [{ id: generateId(), school: 'University of Sciences', degree: 'B.S. Data Science', startDate: '2016', endDate: '2020', cgpa: '3.8' }],
    projects: [{ id: generateId(), name: 'Real-time Analytics Pipeline', description: 'Developed a streaming data pipeline for real-time user analytics.', technologies: 'Apache Kafka, Spark, Python' }],
    skills: { languages: 'Python, SQL, Scala', frameworks: 'Apache Spark', tools: 'Airflow, Kafka, AWS Redshift' },
    certifications: 'Google Cloud Professional Data Engineer', achievements: 'Reduced data processing costs by 25%.'
  },
  'Software Engineer 6': {
    personalInfo: {
      name: 'Jessica Taylor', title: 'Mobile Developer', email: 'jessica.t@example.com', phone: '(555) 666-7777', location: 'Los Angeles, CA', linkedin: 'linkedin.com/in/jessicat', github: 'github.com/jessicat', photo: ''
    },
    summary: 'Innovative Mobile Developer specializing in React Native and iOS development. Dedicated to creating seamless and engaging mobile experiences.',
    experience: [{ id: generateId(), company: 'App Innovations', role: 'Mobile Developer', startDate: '2019', endDate: 'Present', description: 'Developed cross-platform mobile apps using React Native.\nPublished 5 apps to the App Store and Google Play.' }],
    education: [{ id: generateId(), school: 'Tech University', degree: 'B.S. Computer Science', startDate: '2015', endDate: '2019', cgpa: '3.6' }],
    projects: [{ id: generateId(), name: 'Fitness Tracker App', description: 'Built a comprehensive fitness tracking application.', technologies: 'React Native, Redux, Firebase' }],
    skills: { languages: 'JavaScript, Swift, Kotlin', frameworks: 'React Native, iOS SDK', tools: 'Xcode, Android Studio, Git' },
    certifications: 'Apple Certified iOS Developer', achievements: 'App featured in "New Apps We Love" category.'
  },
  'Software Engineer 7': {
    personalInfo: {
      name: 'Robert Martinez', title: 'Machine Learning Engineer', email: 'robert.m@example.com', phone: '(555) 777-8888', location: 'San Jose, CA', linkedin: 'linkedin.com/in/robertm', github: 'github.com/robertm', photo: ''
    },
    summary: 'Machine Learning Engineer with expertise in predictive modeling, natural language processing, and deploying ML models to production.',
    experience: [{ id: generateId(), company: 'AI Solutions', role: 'ML Engineer', startDate: '2021', endDate: 'Present', description: 'Developed NLP models for sentiment analysis.\nDeployed scalable machine learning APIs using FastAPI and Docker.' }],
    education: [{ id: generateId(), school: 'Global University', degree: 'M.S. Artificial Intelligence', startDate: '2019', endDate: '2021', cgpa: '4.0' }],
    projects: [{ id: generateId(), name: 'Recommendation Engine', description: 'Built a personalized product recommendation system.', technologies: 'Python, TensorFlow, Scikit-Learn' }],
    skills: { languages: 'Python, R, C++', frameworks: 'TensorFlow, PyTorch, Scikit-Learn', tools: 'Jupyter, Docker, AWS SageMaker' },
    certifications: 'DeepLearning.AI Specialization', achievements: 'Improved model accuracy by 15%.'
  },
  'Software Engineer 8': {
    personalInfo: {
      name: 'William Anderson', title: 'Software Architect', email: 'william.a@example.com', phone: '(555) 888-9999', location: 'Chicago, IL', linkedin: 'linkedin.com/in/williama', github: 'github.com/williama', photo: ''
    },
    summary: 'Visionary Software Architect with 10+ years of experience designing enterprise-level distributed systems and leading engineering teams.',
    experience: [{ id: generateId(), company: 'Tech Giants Ltd.', role: 'Software Architect', startDate: '2015', endDate: 'Present', description: 'Designed architecture for high-traffic distributed systems.\nEstablished engineering standards and best practices.' }],
    education: [{ id: generateId(), school: 'National University', degree: 'M.S. Computer Engineering', startDate: '2008', endDate: '2010', cgpa: '3.8' }],
    projects: [{ id: generateId(), name: 'Global Payment Network', description: 'Architected a highly available global payment processing system.', technologies: 'Java, Spring Boot, Kafka, Cassandra' }],
    skills: { languages: 'Java, C#, Go', frameworks: 'Spring Boot, .NET Core', tools: 'Kubernetes, Kafka, AWS, Azure' },
    certifications: 'Microsoft Certified: Azure Solutions Architect', achievements: 'Successfully led a team of 40+ engineers.'
  },
  'Software Engineer 9': {
    personalInfo: {
      name: 'Sophia Thomas', title: 'Cloud Engineer', email: 'sophia.t@example.com', phone: '(555) 999-0000', location: 'Atlanta, GA', linkedin: 'linkedin.com/in/sophiat', github: 'github.com/sophiat', photo: ''
    },
    summary: 'Dedicated Cloud Engineer focused on designing, deploying, and managing secure and scalable cloud infrastructure on AWS and Google Cloud.',
    experience: [{ id: generateId(), company: 'Cloud Native Corp', role: 'Cloud Engineer', startDate: '2020', endDate: 'Present', description: 'Migrated on-premise applications to AWS.\nImplemented security best practices for cloud environments.' }],
    education: [{ id: generateId(), school: 'State College', degree: 'B.S. Network Engineering', startDate: '2016', endDate: '2020', cgpa: '3.7' }],
    projects: [{ id: generateId(), name: 'Serverless Application Migration', description: 'Redesigned a legacy app into a serverless architecture.', technologies: 'AWS Lambda, API Gateway, DynamoDB' }],
    skills: { languages: 'Python, JavaScript', frameworks: 'Serverless Framework', tools: 'AWS, GCP, Terraform' },
    certifications: 'AWS Certified SysOps Administrator', achievements: 'Reduced infrastructure costs by 30%.'
  },
  'Software Engineer 10': {
    personalInfo: {
      name: 'Daniel Jackson', title: 'Security Engineer', email: 'daniel.j@example.com', phone: '(555) 000-1111', location: 'Washington, D.C.', linkedin: 'linkedin.com/in/danielj', github: 'github.com/danielj', photo: ''
    },
    summary: 'Proactive Security Engineer with a strong background in penetration testing, vulnerability assessment, and secure software development.',
    experience: [{ id: generateId(), company: 'CyberSec Defend', role: 'Security Engineer', startDate: '2018', endDate: 'Present', description: 'Conducted regular security audits and penetration tests.\nImplemented secure coding guidelines for development teams.' }],
    education: [{ id: generateId(), school: 'Tech Institute', degree: 'B.S. Cybersecurity', startDate: '2014', endDate: '2018', cgpa: '3.9' }],
    projects: [{ id: generateId(), name: 'Automated Vulnerability Scanner', description: 'Developed an internal tool for automated vulnerability scanning.', technologies: 'Python, Bash, OWASP ZAP' }],
    skills: { languages: 'Python, C, Bash', frameworks: 'N/A', tools: 'Burp Suite, Wireshark, Metasploit' },
    certifications: 'Certified Ethical Hacker (CEH)', achievements: 'Identified and patched 50+ critical vulnerabilities.'
  },
  'Software Engineer 11': {
    personalInfo: {
      name: 'Olivia White', title: 'Embedded Systems Engineer', email: 'olivia.w@example.com', phone: '(555) 123-1234', location: 'San Diego, CA', linkedin: 'linkedin.com/in/oliviaw', github: 'github.com/oliviaw', photo: ''
    },
    summary: 'Detail-oriented Embedded Systems Engineer with experience in developing firmware for IoT devices and microcontrollers.',
    experience: [{ id: generateId(), company: 'IoT Devices Inc.', role: 'Embedded Engineer', startDate: '2019', endDate: 'Present', description: 'Developed low-power firmware for smart home devices.\nOptimized hardware-software interfaces for performance.' }],
    education: [{ id: generateId(), school: 'Engineering University', degree: 'B.S. Electrical Engineering', startDate: '2015', endDate: '2019', cgpa: '3.8' }],
    projects: [{ id: generateId(), name: 'Smart Thermostat Firmware', description: 'Wrote the core firmware for a next-gen smart thermostat.', technologies: 'C, C++, FreeRTOS' }],
    skills: { languages: 'C, C++, Assembly', frameworks: 'FreeRTOS', tools: 'Oscilloscopes, Logic Analyzers, Git' },
    certifications: 'Certified Embedded Systems Programmer', achievements: 'Reduced power consumption by 15%.'
  },
  'Software Engineer 12': {
    personalInfo: {
      name: 'James Harris', title: 'QA Automation Engineer', email: 'james.h@example.com', phone: '(555) 234-2345', location: 'Portland, OR', linkedin: 'linkedin.com/in/jamesh', github: 'github.com/jamesh', photo: ''
    },
    summary: 'Quality-focused QA Automation Engineer dedicated to building robust automated testing frameworks and ensuring software reliability.',
    experience: [{ id: generateId(), company: 'Software Quality Pros', role: 'QA Automation Engineer', startDate: '2020', endDate: 'Present', description: 'Built end-to-end testing frameworks using Cypress.\nIntegrated automated tests into CI/CD pipelines.' }],
    education: [{ id: generateId(), school: 'State University', degree: 'B.S. Computer Science', startDate: '2016', endDate: '2020', cgpa: '3.5' }],
    projects: [{ id: generateId(), name: 'Automated Test Suite', description: 'Created a comprehensive test suite for a major web application.', technologies: 'Cypress, JavaScript, Jenkins' }],
    skills: { languages: 'JavaScript, Python, Java', frameworks: 'Selenium, Cypress, JUnit', tools: 'Jenkins, Git, Postman' },
    certifications: 'ISTQB Certified Tester', achievements: 'Increased test coverage from 40% to 85%.'
  },
  'Software Engineer 13': {
    personalInfo: {
      name: 'Liam Martin', title: 'Game Developer', email: 'liam.m@example.com', phone: '(555) 345-3456', location: 'Montreal, QC', linkedin: 'linkedin.com/in/liamm', github: 'github.com/liamm', photo: ''
    },
    summary: 'Passionate Game Developer with experience in Unity and Unreal Engine. Focused on creating immersive gameplay mechanics and optimized graphics.',
    experience: [{ id: generateId(), company: 'Indie Game Studios', role: 'Game Developer', startDate: '2018', endDate: 'Present', description: 'Programmed core gameplay mechanics for a 3D platformer.\nOptimized rendering pipelines for mobile platforms.' }],
    education: [{ id: generateId(), school: 'Arts and Tech College', degree: 'B.S. Game Design and Development', startDate: '2014', endDate: '2018', cgpa: '3.7' }],
    projects: [{ id: generateId(), name: 'Adventure Quest 3D', description: 'Lead developer for an indie 3D adventure game.', technologies: 'Unity, C#' }],
    skills: { languages: 'C#, C++', frameworks: 'Unity, Unreal Engine', tools: 'Blender, Git, Jira' },
    certifications: 'Unity Certified Programmer', achievements: 'Game reached 100k downloads in first month.'
  },
  'Software Engineer 14': {
    personalInfo: {
      name: 'Emma Thompson', title: 'Web3 / Blockchain Developer', email: 'emma.t@example.com', phone: '(555) 456-4567', location: 'Miami, FL', linkedin: 'linkedin.com/in/emmat', github: 'github.com/emmat', photo: ''
    },
    summary: 'Forward-thinking Web3 Developer with expertise in writing secure smart contracts and building decentralized applications (dApps).',
    experience: [{ id: generateId(), company: 'Decentralized Innovations', role: 'Blockchain Developer', startDate: '2021', endDate: 'Present', description: 'Developed and audited smart contracts on Ethereum.\nBuilt frontend interfaces for dApps using React and Web3.js.' }],
    education: [{ id: generateId(), school: 'Global Tech University', degree: 'B.S. Computer Science', startDate: '2017', endDate: '2021', cgpa: '3.9' }],
    projects: [{ id: generateId(), name: 'DeFi Lending Platform', description: 'Created a decentralized lending protocol.', technologies: 'Solidity, React, Hardhat' }],
    skills: { languages: 'Solidity, JavaScript, TypeScript', frameworks: 'React, Hardhat, Truffle', tools: 'Web3.js, Ethers.js, Git' },
    certifications: 'Certified Blockchain Developer', achievements: 'Successfully launched a protocol with $10M TVL.'
  },
  'Software Engineer 15': {
    personalInfo: {
      name: 'Noah Garcia', title: 'Site Reliability Engineer (SRE)', email: 'noah.g@example.com', phone: '(555) 567-5678', location: 'San Francisco, CA', linkedin: 'linkedin.com/in/noahg', github: 'github.com/noahg', photo: ''
    },
    summary: 'Dedicated Site Reliability Engineer focused on maximizing system uptime, automating incident response, and building scalable infrastructure.',
    experience: [{ id: generateId(), company: 'Cloud Services Provider', role: 'SRE', startDate: '2019', endDate: 'Present', description: 'Implemented observability tools to monitor system health.\nResponded to and resolved critical production incidents.' }],
    education: [{ id: generateId(), school: 'State University', degree: 'B.S. Information Systems', startDate: '2015', endDate: '2019', cgpa: '3.6' }],
    projects: [{ id: generateId(), name: 'Automated Incident Response', description: 'Built a system to automatically mitigate common infrastructure issues.', technologies: 'Python, Prometheus, Kubernetes' }],
    skills: { languages: 'Python, Go, Bash', frameworks: 'N/A', tools: 'Kubernetes, Prometheus, Grafana, AWS' },
    certifications: 'Certified Kubernetes Administrator (CKA)', achievements: 'Reduced MTTR (Mean Time to Recovery) by 40%.'
  }
};
