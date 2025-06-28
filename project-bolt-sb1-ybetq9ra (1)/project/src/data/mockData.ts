import { User, Contract, Document, Notification, ComplianceItem, ContractTemplate } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@freelancedesign.com',
  industry: 'Design',
  avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  createdAt: '2024-01-15',
  subscription: 'free',
  trialEndsAt: '2024-02-15'
};

export const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    clientName: 'TechStart Inc.',
    industry: 'Design',
    status: 'sent',
    createdAt: '2024-01-10',
    expiresAt: '2024-02-10',
    templateId: 'design-web',
    clauses: []
  },
  {
    id: '2',
    title: 'Brand Identity Package',
    clientName: 'GreenLeaf Co.',
    industry: 'Design',
    status: 'signed',
    createdAt: '2024-01-05',
    signedAt: '2024-01-08',
    templateId: 'design-brand',
    clauses: []
  },
  {
    id: '3',
    title: 'Marketing Campaign Assets',
    clientName: 'FitLife Studios',
    industry: 'Design',
    status: 'draft',
    createdAt: '2024-01-12',
    templateId: 'design-marketing',
    clauses: []
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'TechStart Inc. W9',
    type: 'w9',
    clientName: 'TechStart Inc.',
    uploadedAt: '2024-01-08',
    status: 'pending',
    expiresAt: '2024-02-08'
  },
  {
    id: '2',
    name: 'GreenLeaf Co. NDA',
    type: 'nda',
    clientName: 'GreenLeaf Co.',
    uploadedAt: '2024-01-06',
    status: 'received'
  },
  {
    id: '3',
    name: 'FitLife Studios GDPR Consent',
    type: 'gdpr',
    clientName: 'FitLife Studios',
    uploadedAt: '2024-01-10',
    status: 'expired',
    expiresAt: '2024-01-10'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Contract Expires Soon',
    message: 'TechStart Inc. contract expires in 3 days',
    type: 'deadline',
    priority: 'urgent',
    createdAt: '2024-01-13',
    read: false,
    actionRequired: true,
    dueDate: '2024-02-10'
  },
  {
    id: '2',
    title: 'W9 Form Missing',
    message: 'TechStart Inc. W9 form is still pending',
    type: 'document',
    priority: 'high',
    createdAt: '2024-01-12',
    read: false,
    actionRequired: true
  },
  {
    id: '3',
    title: 'Tax Deadline Reminder',
    message: 'Q4 tax filings due in 15 days',
    type: 'deadline',
    priority: 'medium',
    createdAt: '2024-01-11',
    read: true,
    actionRequired: false,
    dueDate: '2024-01-31'
  }
];

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: '1',
    title: 'Unsigned Contracts',
    description: '3 contracts awaiting signatures',
    status: 'pending',
    category: 'contract',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Missing W9 Forms',
    description: '1 client W9 form pending',
    status: 'pending',
    category: 'document',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'GDPR Compliance',
    description: '2 clients need updated privacy consents',
    status: 'overdue',
    dueDate: '2024-01-10',
    category: 'gdpr',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Tax Documentation',
    description: 'All quarterly filings complete',
    status: 'completed',
    category: 'tax',
    priority: 'low'
  }
];

export const mockContractTemplates: ContractTemplate[] = [
  {
    id: 'design-web',
    name: 'Website Design Contract',
    industry: 'Design',
    description: 'Comprehensive contract for web design projects',
    isPopular: true,
    clauses: [
      {
        id: '1',
        title: 'Project Scope',
        content: 'Designer will provide [detailed description of deliverables] including wireframes, mockups, and final designs.',
        isRequired: true,
        category: 'scope'
      },
      {
        id: '2',
        title: 'Payment Terms',
        content: 'Client agrees to pay 50% upfront and 50% upon project completion. Late payments incur 1.5% monthly fee.',
        isRequired: true,
        category: 'payment'
      },
      {
        id: '3',
        title: 'Intellectual Property',
        content: 'Upon full payment, all rights to the final design transfer to the client. Designer retains right to showcase work.',
        isRequired: true,
        category: 'ip'
      },
      {
        id: '4',
        title: 'Revisions',
        content: 'Contract includes up to 3 rounds of revisions. Additional revisions billed at $[rate] per hour.',
        isRequired: false,
        category: 'revisions'
      }
    ]
  },
  {
    id: 'design-brand',
    name: 'Brand Identity Contract',
    industry: 'Design',
    description: 'Template for comprehensive brand identity projects',
    isPopular: true,
    clauses: [
      {
        id: '1',
        title: 'Brand Package Scope',
        content: 'Package includes logo design, brand guidelines, color palette, typography, and business card design.',
        isRequired: true,
        category: 'scope'
      },
      {
        id: '2',
        title: 'Usage Rights',
        content: 'Client receives unlimited usage rights for commercial purposes. Designer retains portfolio rights.',
        isRequired: true,
        category: 'usage'
      }
    ]
  },
  {
    id: 'writing-content',
    name: 'Content Writing Agreement',
    industry: 'Writing',
    description: 'Standard contract for content creation services',
    clauses: [
      {
        id: '1',
        title: 'Content Deliverables',
        content: 'Writer will deliver [number] articles of [word count] words each, optimized for SEO.',
        isRequired: true,
        category: 'scope'
      }
    ]
  },
  {
    id: 'coaching-session',
    name: 'Coaching Services Agreement',
    industry: 'Coaching',
    description: 'Template for coaching and consulting services',
    clauses: [
      {
        id: '1',
        title: 'Coaching Sessions',
        content: 'Package includes [number] sessions of [duration] minutes each, conducted via video call.',
        isRequired: true,
        category: 'scope'
      }
    ]
  }
];

export const industries = [
  { id: 'design', name: 'Design & Creative', icon: 'Palette' },
  { id: 'writing', name: 'Writing & Content', icon: 'PenTool' },
  { id: 'coaching', name: 'Coaching & Consulting', icon: 'Users' },
  { id: 'tech', name: 'Technology & Development', icon: 'Code' },
  { id: 'marketing', name: 'Marketing & Sales', icon: 'TrendingUp' },
  { id: 'other', name: 'Other', icon: 'Briefcase' }
];