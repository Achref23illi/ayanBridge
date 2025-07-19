export interface LessonSection {
  id: string;
  title: string;
  content: string;
  videoTimestamp: number;
  subsections?: LessonSection[];
}

export interface TranscriptSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  isActive?: boolean;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ExerciseQuestion {
  id: string;
  type: 'mcq' | 'fill-blank' | 'drag-drop' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface ContextualAction {
  id: string;
  label: string;
  action: 'define' | 'translate' | 'explain' | 'example';
}

export interface LessonData {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
  sections: LessonSection[];
  transcript: TranscriptSegment[];
  exercises: ExerciseQuestion[];
}

export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  fileName?: string;
  error?: string;
}