import React ,{useState}from 'react';
import { assets } from '../../assets/assets';

export const BodyTypeFilter = ({ bodyTypes, selectedbodyTypes, setSelectedbodyTypes }) => {
  const [isbodyTypeModalOpen, setIsbodyTypeModalOpen] = useState(false);
  const bodyTypeLogos = JSON.parse(localStorage.getItem('bodyTypeLogos')) || {};
  const fallbackLogo = 'https://placehold.co/30x30';

  const handlebodyTypeSelect = (bodyType) => {
    setSelectedbodyTypes(prev => 
      prev.includes(bodyType) 
        ? prev.filter(b => b !== bodyType) 
        : [...prev, bodyType]
    );
  };

  return (
    <div className='border border-gray-300 px-2 py-3 mt-6'>
      <p className='mb-3 text-sm font-medium text-center'>Body Type</p>
      <button
        className='w-full p-2 border border-gray-300 rounded text-left'
        onClick={() => setIsbodyTypeModalOpen(true)}
      >
        {selectedbodyTypes.length > 0 
          ? `${selectedbodyTypes.length} selected` 
          : 'Select Body Type(s)'}
      </button>

      {isbodyTypeModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select Body Types</h2>
              <button
                onClick={() => setIsbodyTypeModalOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <img src={assets.cross_icon} alt='Close' className='w-4 h-4' />
              </button>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'>
              {bodyTypes.map((bodyType) => (
                <div
                  key={bodyType}
                  className={`p-4 border ${
                    selectedbodyTypes.includes(bodyType) 
                      ? 'border-blue-500' 
                      : 'border-gray-300'
                  } rounded-lg cursor-pointer hover:bg-gray-100`}
                  onClick={() => handlebodyTypeSelect(bodyType)}
                >
                  <img
                    src={bodyTypeLogos[bodyType] || fallbackLogo}
                    alt={bodyType}
                    className='w-16 h-16 mx-auto mb-2'
                  />
                  <p className='text-center text-sm'>{bodyType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};