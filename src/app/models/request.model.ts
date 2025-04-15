export interface Request {
  id: string;
  userId: string;
  requestType: string;
  status: string; // e.g., 'pending', 'approved', 'rejected'
  createdAt: Date;
  updated_at?: Date;
  user?: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
  };
  professional_info?: {
    department: string;
    position: string;
  };
}
