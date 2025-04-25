import React from 'react';
import { specialties, days } from '../data/doctors';

interface FiltersProps {
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  selectedSpecialty, 
  setSelectedSpecialty, 
  selectedDay, 
  setSelectedDay 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
          Specialty
        </label>
        <select
          id="specialty"
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>
      
      <div className="w-full md:w-1/2">
        <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">
          Available Day
        </label>
        <select
          id="day"
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">Any Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;