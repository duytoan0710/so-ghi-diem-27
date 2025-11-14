export interface InfoSection {
  title: string;
  points: string[];
}

export interface ContentCardData {
  performer: string;
  info: InfoSection;
  note: InfoSection;
}

export interface SubSectionData {
  title: string;
  description?: string;
  card?: ContentCardData;
}

export interface StepData {
  menuTitle: {
    main: string;
    sub: string;
  };
  contentTitle: string;
  subsections: SubSectionData[];
}