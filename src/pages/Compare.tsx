import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loan } from '../types';
import { mockLoans } from '../data/mockLoans';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

const Compare: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortField, setSortField] = useState<keyof Pick<Loan, 'interestRate' | 'processingFee'>>('interestRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredLoans = mockLoans
    .filter(loan => selectedType === 'all' || loan.type === selectedType)
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return (a[sortField] - b[sortField]) * multiplier;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Compare Loans</h1>
            <div className="flex space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                  <option value="student">Student</option>
                  <option value="mortgage">Mortgage</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as keyof Pick<Loan, 'interestRate' | 'processingFee'>)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="interestRate">Interest Rate</option>
                  <option value="processingFee">Processing Fee</option>
                </select>
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  {sortDirection === 'asc' ? (
                    <SortAsc className="h-5 w-5 text-gray-600" />
                  ) : (
                    <SortDesc className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{loan.bankName}</h3>
                    <p className="text-gray-600 capitalize">{loan.type} Loan</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <span className="text-2xl font-bold text-blue-600">{loan.interestRate}%</span>
                    <span className="text-gray-600 ml-1">APR</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600">Loan Amount</p>
                    <p className="font-semibold">${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Term Length</p>
                    <p className="font-semibold">{loan.minTerm} - {loan.maxTerm} months</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Processing Fee</p>
                    <p className="font-semibold">{loan.processingFee}%</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2">Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {loan.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;