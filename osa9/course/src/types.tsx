export interface HeaderProps {
  coursename: string;
}

export interface TotalProps {
  sumCourses: number;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseDescription extends CoursePartBase{
  description: string;
}
  
export interface CourseNormalPart extends CourseDescription {
  type: "normal";
}
  
export interface CourseProjectPart extends CoursePartBase  {
  type: "groupProject";
  groupProjectCount: number;
}
  
export interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  description: string;
  requirements: Array<string>;
}  

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
  