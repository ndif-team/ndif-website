export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  url?: string;
}

export const team: TeamMember[] = [
  {
    name: "David Bau",
    role: "Director and PI",
    image: "/images/david.jpeg",
    url: "https://baulab.info/",
    bio: "Assistant professor at Northeastern University in the Khoury School of Computer Sciences. His research investigates the structure and interpretation of large-scale machine learned models such as large language models and diffusion models. Prior to his academic work, he worked in industry for over 20 years at several companies including Google and Microsoft.",
  },
  {
    name: "Byron Wallace",
    role: "Co-PI",
    image: "/images/byron.jpeg",
    url: "https://www.byronwallace.com/",
    bio: "Associate professor at Northeastern University in the Khoury School of Computer Sciences. He ensures that the NDIF service design achieves goals for enabling impactful machine-learning research. His research is in natural language processing and machine learning, with an emphasis on applications for health.",
  },
  {
    name: "Arjun Guha",
    role: "Co-PI",
    image: "/images/arjun.jpeg",
    url: "https://www.khoury.northeastern.edu/home/arjunguha/main/home/",
    bio: "Associate professor at Northeastern University in the Khoury School of Computer Sciences. He is responsible for establishing and liaising with the External Advisory Board for NDIF. His research is in programming languages, systems, and software engineering, and his lab has been active in code LLM research including contributing to StarCoder.",
  },
  {
    name: "Jonathan Bell",
    role: "Co-PI",
    image: "/images/jon.jpeg",
    url: "https://www.jonbell.net/",
    bio: "Assistant professor at Northeastern University in the Khoury School of Computer Sciences. He oversees open-source community engagement and processes for NDIF. His research is in software engineering and software systems, including research in open-source continuous integration, fuzz testing, and secure software supply chains.",
  },
  {
    name: "Carla Brodley",
    role: "Co-PI",
    image: "/images/carla.jpeg",
    url: "https://provost.northeastern.edu/leadership/carla-brodley/",
    bio: "Dean of Inclusive Computing at Northeastern University and founding executive director for the Center for Inclusive Computing. She oversees NDIF training, outreach, and knowledge transfer to the broader research, education, and business communities, and serves as liaison to PIT-UN. She served as the dean of Khoury College of Computer Sciences from 2014–2021.",
  },
  {
    name: "Jaden Fiotto-Kaufman",
    role: "Principal Software Engineer",
    image: "/images/jaden.jpeg",
    bio: "Leads the engineering development effort for NDIF. Prior to his role at NDIF, he served as a Senior Scientist at Raytheon BBN Technologies.",
  },
  {
    name: "Emma Bortz",
    role: "Technical Outreach Manager",
    image: "/images/emma.jpg",
    url: "https://www.linkedin.com/in/emma-bortz/",
    bio: "Leads NDIF's education efforts and works to further adoption of NDIF's platform. She completed a PhD at Boston University in Biomedical Engineering, where she investigated transcranial ultrasound stimulation's use as a brain therapy.",
  },
  {
    name: "Michael Ripa",
    role: "Research Software Engineer",
    image: "/images/michael.jpg",
    bio: "Contributes to NDIF's backend engineering efforts. He completed a BS at Carleton University in Mathematics and Computer Science.",
  },
  {
    name: "Gabriele Sarti",
    role: "Postdoctoral Research Associate",
    image: "/images/Gabriele-Sarti.jpg",
    url: "https://gsarti.com/",
    bio: "Postdoctoral Research Associate at Northeastern University's Khoury College of Computer Sciences and a member of the BauLab. His research focuses on Natural Language Processing (NLP), deep learning interpretability, and human-AI interaction, with a goal of making the inner workings of large language models more transparent and trustworthy.",
  },
  {
    name: "Adam Belfki",
    role: "Research Software Engineer",
    image: "/images/adam.jpg",
    bio: "Contributes to the NNsight API and supports researchers using the NDIF platform. He completed his BS in Computer Science at Northeastern University.",
  },
];
