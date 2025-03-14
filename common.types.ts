import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  _id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    _id: string;
  };
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: ProjectInterface[];
}

export interface SessionInterface extends Session {
  user: User & {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export type ProjectSearch = {
  projects: ProjectInterface[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};
