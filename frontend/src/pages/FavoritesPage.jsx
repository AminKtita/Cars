import React, { useState, useEffect } from 'react';
import { getFavoriteCars, getCarById } from '../services/api';
import { Title } from '../components/Title';
import { Pagination } from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { CarListView } from '../components/CarListView';


export const FavoritesPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
  
        // Remove ID parameter from API call
        const favorites = await getFavoriteCars();  
        const carIds = favorites.map(fav => fav.car);
        const carsData = await Promise.all(carIds.map(id => getCarById(id)));
        setCars(carsData);
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavorites();
  }, [navigate]);
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) return <div className="p-4">Loading favorites...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4">
        <Title text1="YOUR" text2="FAVORITES" />
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No favorite cars found</p>
          <button
            onClick={() => navigate('/cars')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Cars
          </button>
        </div>
      ) : (
        <>
          <CarListView
            filterProducts={cars.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )} 
          />
          
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />        
        </>
      )}
    </div>
  );
};