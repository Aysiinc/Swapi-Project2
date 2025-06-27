import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Film = () => {
    const { id } = useParams(); 
    const [ details, setDetails ] = useState();
    const [planets, setPlanets] = useState([]);
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
    
                const jsonData = await fetchData(`http://localhost:9001/api/films/${id}`);
                setDetails(jsonData);
    
                const charactersData = await fetchData(`http://localhost:9001/api/films/${id}/characters`);
                setCharacters(charactersData);

                const planetsData = await fetchData(`http://localhost:9001/api/films/${id}/planets`);
                setPlanets(planetsData);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchDetails();
    }, [id]);

    return (
        <main>
        <button className="backButton" id="backButton" onClick={() => navigate('/')}>Home</button>
        <h1 id="name">{details?.title}</h1>
        
        <section id="generalInfo">
            <p>Released: <span id="release">{details?.release_date}</span></p>
            <p>Director: <span id="director">{details?.director}</span> </p>
            <p>Producer: <span id="producer">{details?.producer}</span></p>
            <p>Episode: <span id="episode">{details?.episode_id}</span></p>
        </section>
        <section id="characters">
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
        <section id="planets">
        <h2>Planets appeared in</h2>
        <ul>
            {planets?.map((planet) => (
                <li key={planet.id}>
                    <button onClick={() => navigate(`/planets/${planet.id}`)}>
                        {planet.name}
                    </button>
                </li>
            ))}

        </ul>
        </section>
    </main>
    
       
    );
};


export default Film;