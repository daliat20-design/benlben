
export interface SessionLecturer {
  name: string;
  description: string;
}

export interface Session {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  value: string;
  lecturers: SessionLecturer[];
  description: string;
}

export interface Speaker {
  name: string;
  title: string;
  topics: string[];
  bio: string;
  image: string;
  imagePosition?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}
