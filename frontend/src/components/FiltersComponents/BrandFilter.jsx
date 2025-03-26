import React ,{useState}from 'react';
import { assets } from '../../assets/assets';

export const BrandFilter = ({ brands, selectedBrands, setSelectedBrands }) => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const brandLogos = JSON.parse(localStorage.getItem('brandLogos')) || {};
  const fallbackLogo = 'https://placehold.co/30x30';

  const handleBrandSelect = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  return (
    <div className='border border-gray-300 px-2 py-3 mt-6'>
      <p className='mb-3 text-sm font-medium text-center'>BRAND</p>
      <button
        className='w-full p-2 border border-gray-300 rounded text-left'
        onClick={() => setIsBrandModalOpen(true)}
      >
        {selectedBrands.length > 0 
          ? `${selectedBrands.length} selected` 
          : 'Select Brand(s)'}
      </button>

      {isBrandModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select Brands</h2>
              <button
                onClick={() => setIsBrandModalOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <img src={assets.cross_icon} alt='Close' className='w-4 h-4' />
              </button>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'>
              {brands.map((brand) => (
                <div
                  key={brand}
                  className={`p-4 border ${
                    selectedBrands.includes(brand) 
                      ? 'border-blue-500' 
                      : 'border-gray-300'
                  } rounded-lg cursor-pointer hover:bg-gray-100`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  <img
                    src={brandLogos[brand] || fallbackLogo}
                    alt={brand}
                    className='w-16 h-16 mx-auto mb-2'
                  />
                  <p className='text-center text-sm'>{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};