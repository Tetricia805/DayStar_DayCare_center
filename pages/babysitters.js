import React, { useEffect, useState } from 'react';
import { getBabysitters } from '../services/babysitterService';
import BabysitterCard from '../components/BabysitterCard';

const Babysitters = () => {
  const [babysitters, setBabysitters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBabysitters();
      setBabysitters(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Babysitters</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {babysitters.map((sitter) => (
          <BabysitterCard key={sitter._id} babysitter={sitter} />
        ))}
      </div>
    </div>
  );
};

export default Babysitters;
