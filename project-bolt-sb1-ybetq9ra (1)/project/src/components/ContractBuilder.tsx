import React, { useState } from 'react';
import { 
  FileText, 
  Edit3, 
  Save, 
  Send, 
  Eye, 
  Plus, 
  Trash2, 
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { ContractTemplate, ContractClause } from '../types';

interface ContractBuilderProps {
  templates: ContractTemplate[];
  onNavigate: (page: string) => void;
}

export default function ContractBuilder({ templates, onNavigate }: ContractBuilderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [contractData, setContractData] = useState({
    clientName: '',
    projectTitle: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
    clauses: [] as ContractClause[]
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setContractData({
      ...contractData,
      clauses: [...template.clauses]
    });
    setIsEditing(true);
  };

  const handleClauseUpdate = (clauseId: string, content: string) => {
    setContractData({
      ...contractData,
      clauses: contractData.clauses.map(clause =>
        clause.id === clauseId ? { ...clause, content } : clause
      )
    });
  };

  const addCustomClause = () => {
    const newClause: ContractClause = {
      id: Date.now().toString(),
      title: 'Custom Clause',
      content: 'Enter your custom clause content here...',
      isRequired: false,
      category: 'custom'
    };
    setContractData({
      ...contractData,
      clauses: [...contractData.clauses, newClause]
    });
  };

  const removeClause = (clauseId: string) => {
    setContractData({
      ...contractData,
      clauses: contractData.clauses.filter(clause => clause.id !== clauseId)
    });
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contract Builder</h1>
            <p className="text-gray-600 mt-1">Create professional contracts with industry-specific templates</p>
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      {template.isPopular && (
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{template.clauses.length} clauses</span>
                      <span className="capitalize">{template.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contracts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Contracts</h2>
          <div className="space-y-3">
            {[
              { name: 'Website Redesign Project', client: 'TechStart Inc.', status: 'sent', date: '2024-01-10' },
              { name: 'Brand Identity Package', client: 'GreenLeaf Co.', status: 'signed', date: '2024-01-05' },
              { name: 'Marketing Campaign Assets', client: 'FitLife Studios', status: 'draft', date: '2024-01-12' }
            ].map((contract, index) => {
              const statusColors = {
                draft: 'bg-gray-100 text-gray-800',
                sent: 'bg-blue-100 text-blue-800',
                signed: 'bg-green-100 text-green-800'
              };
              
              return (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">{contract.name}</h3>
                    <p className="text-sm text-gray-600">{contract.client} • {contract.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[contract.status as keyof typeof statusColors]}`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsEditing(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Contract</h1>
          <p className="text-gray-600 mt-1">Based on: {selectedTemplate?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contract Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={contractData.clientName}
                  onChange={(e) => setContractData({ ...contractData, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={contractData.projectTitle}
                  onChange={(e) => setContractData({ ...contractData, projectTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={contractData.startDate}
                  onChange={(e) => setContractData({ ...contractData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                <input
                  type="text"
                  value={contractData.totalAmount}
                  onChange={(e) => setContractData({ ...contractData, totalAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="$0.00"
                />
              </div>
            </div>
          </div>

          {/* Contract Clauses */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Contract Clauses</h2>
              <button
                onClick={addCustomClause}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Clause</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {contractData.clauses.map((clause, index) => (
                <div key={clause.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{clause.title}</span>
                      {clause.isRequired && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    {!clause.isRequired && (
                      <button
                        onClick={() => removeClause(clause.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <textarea
                    value={clause.content}
                    onChange={(e) => handleClauseUpdate(clause.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
                <span>Send to Client</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Contract Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Template selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Clauses configured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="text-sm text-gray-500">Client details needed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="text-sm text-gray-500">Ready to send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}