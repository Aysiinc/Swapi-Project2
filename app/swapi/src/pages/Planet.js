import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Planet = () =>{
    const { id } = useParams(); 
    const [ details, setDetails ] = useState();
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);
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
    
                const jsonData = await fetchData(`http://localhost:9001/api/planets/${id}`);
                setDetails(jsonData);
    
                const charactersData = await fetchData(`http://localhost:9001/api/planets/${id}/characters`);
                setCharacters(charactersData);

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
                    <p>Climate: <span id="climate">{details?.climate}</span></p>
                    <p>Diameter: <span id="diameter">{details?.diameter}</span> km</p>
                    <p>Gravity: <span id="gravity">{details?.gravity}</span> g(s)</p>
                    <p>Orbital Period: <span id="orbitalPeriod">{details?.orbital_period}</span></p>
                    <p>Population: <span id="population">{details?.population}</span></p>
                    <p>Rotation Period: <span id="rotationPeriod">{details?.rotation_period}</span></p>
                    <p>Surface Water: <span id="surfaceWater">{details?.surface_water}</span></p>
                    <p>Terrain: <span id="terrain">{details?.terrain}</span></p>
                </section>
                <section id="planets">
                <h2>Characters</h2>
                    <ul>
                        {characters?.map((character) => (
                            <li key={character.id}>
                                <button onClick={() => navigate(`/characters/${character.id}`)}>
                                    {character.name}
                                </button>
                            </li>
                        ))}

                    </ul>
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

export default Planet;