import React from 'react';
import { MapPin, Calendar, Clock, ThumbsUp } from 'lucide-react';
import { Doctor } from '../types';
import StarRating from './StarRating';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-56 object-cover object-center"
        />
        {doctor.acceptingNewPatients && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Accepting New Patients
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
        <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
        
        <div className="flex items-center mb-3">
          <StarRating rating={doctor.rating} />
          <span className="text-gray-600 text-sm ml-2">({doctor.reviewCount} reviews)</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{doctor.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <ThumbsUp className="w-4 h-4 mr-2" />
          <span className="text-sm">{doctor.experience} years experience</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <div className="flex flex-wrap gap-1">
            {doctor.availability.map((day) => (
              <span 
                key={day} 
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-300">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;