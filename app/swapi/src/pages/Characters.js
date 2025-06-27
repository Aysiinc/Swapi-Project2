import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Characters = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchData = async () => {
            try{
              const response = await fetch('http://localhost:9001/api/characters');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              setData(jsonData);
            }
            catch (error) {
              console.error('Fetch error:', error);
            }
          }
        fetchData();
    }
    , []);

    return (
        <div>
            <h2>Star Wars Characters</h2>
            <div >
                {data?.map((character) => (
                    <button key={character.id} onClick={() => {navigate(`/characters/${character.id}`)}}>
                        <div >
                            {character.name}
                        </div>
                    </button>
               ) )}
            </div>

        </div>
    );
};




export default Characters;