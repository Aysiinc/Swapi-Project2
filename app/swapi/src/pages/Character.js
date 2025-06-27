import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Character = () =>{
    const { id } = useParams(); 
    const [ details, setDetails ] = useState();
    const [ planet, setPlanet ] = useState();
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const fetchData = async (url) => {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return await response.json();
                };
    
                const jsonData = await fetchData(`http://localhost:9001/api/characters/${id}`);
                setDetails(jsonData);
    
                if (jsonData?.homeworld) {
                    const planetData = await fetchData(`http://localhost:9001/api/planets/${jsonData.homeworld}`);
                    setPlanet(planetData);
                }
    
                const filmsData = await fetchData(`http://localhost:9001/api/characters/${id}/films`);
                setFilms(filmsData);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchDetails();
    }, []);


    return(
            <main>
                <button className="backButton" id="backButton" onClick={() => navigate('/')}>Home</button>
                <h1 id="name">{details?.name}</h1>
                
                <section id="generalInfo">
                <p>Height: {details?.height} cm</p>
                <p>Mass: {details?.mass} kg</p>
                <p>Born: {details?.birth_year}</p>
                </section>
                <section id="planets">
                <h2>Homeworld</h2>
                <p><button onClick={() => navigate(`/planets/${planet?.id}`)}>
                        <div >
                            {planet?.name}
                        </div>
                    </button></p>
                </section>
                <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {films?.map((film) => (
                        <li key={film.id}>
                            <button onClick={() => navigate(`/films/${film.id}`)}>
                                {film.title}
                            </button>
                        </li>
                    ))}

                </ul>
                </section>
            </main>
    );
    
}

export default Character;