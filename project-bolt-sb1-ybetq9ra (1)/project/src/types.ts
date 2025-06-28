export interface User {
  id: string;
  name: string;
  email: string;
  industry: string;
  avatar?: string;
  createdAt: string;
  subscription: 'free' | 'pro';
  trialEndsAt?: string;
}

export interface Contract {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  status: 'draft' | 'sent' | 'signed' | 'expired';
  createdAt: string;
  signedAt?: string;
  expiresAt?: string;
  templateId: string;
  clauses: ContractClause[];
}

export interface ContractClause {
  id: string;
  title: string;
  content: string;
  isRequired: boolean;
  category: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'w9' | 'nda' | 'contract' | 'gdpr' | 'other';
  clientName: string;
  uploadedAt: string;
  status: 'pending' | 'received' | 'expired';
  expiresAt?: string;
  fileUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'document' | 'contract' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  read: boolean;
  actionRequired: boolean;
  dueDate?: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'overdue';
  dueDate?: string;
  category: 'contract' | 'document' | 'tax' | 'gdpr' | 'general';
  priority: 'low' | 'medium' | 'high';
}

export interface ContractTemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  clauses: ContractClause[];
  isPopular?: boolean;
}