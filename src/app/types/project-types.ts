// Project and Tech type definitions for Projects component

export interface SanityTech {
  techName: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  };
}

export interface SanityProject {
  id: string;
  projectName: string;
  projectDescription: string;
  techStack: SanityTech[];
  githubLink: string;
}

export interface Tech {
  name: string;
  imageUrl: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  techStack: Tech[];
  githubLink: string;
}
