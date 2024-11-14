export interface BoardApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  squadron: string;
  position: 'president' | 'member';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const STORAGE_KEY = 'board_applications';

export const storage = {
  getApplications(): BoardApplication[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveApplication(application: Omit<BoardApplication, 'id' | 'status' | 'createdAt'>): BoardApplication {
    const applications = this.getApplications();
    const newApplication: BoardApplication = {
      ...application,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    applications.push(newApplication);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return newApplication;
  },

  updateApplication(id: string, updates: Partial<BoardApplication>): BoardApplication | null {
    const applications = this.getApplications();
    const index = applications.findIndex(app => app.id === id);
    
    if (index === -1) return null;
    
    applications[index] = { ...applications[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return applications[index];
  },

  deleteApplication(id: string): boolean {
    const applications = this.getApplications();
    const filteredApplications = applications.filter(app => app.id !== id);
    
    if (filteredApplications.length === applications.length) {
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredApplications));
    return true;
  }
};