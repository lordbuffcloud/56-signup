import { storage, type BoardApplication } from './storage';

export type { BoardApplication };

export async function submitApplication(data: Omit<BoardApplication, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
  try {
    storage.saveApplication(data);
    return {
      success: true,
      message: 'Application submitted successfully.',
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit application. Please try again.',
    };
  }
}