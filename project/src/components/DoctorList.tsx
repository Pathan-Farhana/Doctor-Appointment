import React, { useState, useMemo } from 'react';
import { doctors, specialties } from '../data/doctors';
import { MapPin, Building, Search } from 'lucide-react';

const DoctorList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3)
        .map(doctor => doctor.name);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = searchTerm === '' || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialties.length === 0 || 
        selectedSpecialties.includes(doctor.specialty);
      
      const matchesConsultation = !consultationType || 
        (consultationType === 'Video Consultation' && doctor.consultationType === 'Video') ||
        (consultationType === 'In-clinic Consultation' && doctor.consultationType === 'In-clinic');

      return matchesSearch && matchesSpecialty && matchesConsultation;
    }).sort((a, b) => {
      if (sortBy === 'price') {
        return (a.fee || 0) - (b.fee || 0);
      }
      if (sortBy === 'experience') {
        return b.experience - a.experience;
      }
      return 0;
    });
  }, [searchTerm, selectedSpecialties, consultationType, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            data-testid="autocomplete-input"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                data-testid="suggestion-item"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4" data-testid="filter-header-sort">Sort by</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price"
                    data-testid="sort-fees"
                    checked={sortBy === 'price'}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Price: Low-High</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="experience"
                    data-testid="sort-experience"
                    checked={sortBy === 'experience'}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Experience - Most Experience first</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900" data-testid="filter-header-speciality">Specialities</h3>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {specialties.map((specialty) => (
                  <label key={specialty} className="flex items-center">
                    <input
                      type="checkbox"
                      data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSpecialties([...selectedSpecialties, specialty]);
                        } else {
                          setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
                        }
                      }}
                      className="text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2" data-testid="filter-header-moc">Mode of consultation</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="consultation"
                    value="Video Consultation"
                    data-testid="filter-video-consult"
                    checked={consultationType === 'Video Consultation'}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Video Consultation</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="consultation"
                    value="In-clinic Consultation"
                    data-testid="filter-in-clinic"
                    checked={consultationType === 'In-clinic Consultation'}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">In-clinic Consultation</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Listings */}
        <div className="flex-1">
          <div className="space-y-4">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} data-testid="doctor-card" className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 data-testid="doctor-name" className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                        <p data-testid="doctor-specialty" className="text-gray-600">{doctor.specialty}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {doctor.education}
                        </p>
                        <p data-testid="doctor-experience" className="text-gray-600 text-sm mt-1">
                          {doctor.experience} yrs exp.
                        </p>
                      </div>
                      <div className="text-right">
                        <p data-testid="doctor-fee" className="text-xl font-semibold">₹{doctor.fee}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="text-sm">Apex Multispeciality and Maternity Hospital</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{doctor.location}</span>
                      </div>
                    </div>

                    <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;