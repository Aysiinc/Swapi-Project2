import express from 'express';
import cors from 'cors';
import jsonServer from 'json-server';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
const port = process.env.PORT || 9001;


app.get('/api/characters', (req, res) => {
  const characters = router.db.get('characters').value().map(character => ({ "id": character.id, "name": character.name }));
  res.json(characters);
}
);

app.get('/api/characters/:id', (req, res) => {
  const { id } = req.params;
  const character = router.db.get('characters').find({ id: +id }).value();
  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }
  res.json(character);
}
);

app.get('/api/films', (req, res) => {
  const films = router.db.get('films').value().map(film => ({ "id": film.id, "title": film.title }));
  res.json(films);
});

app.get('/api/films/:id', (req, res) => {   
  const { id } = req.params;
  const film = router.db.get('films').find({ id: +id }).value();
  if (!film) {
    return res.status(404).json({ error: 'Film not found' });
  }
  res.json(film);
});

app.get('/api/planets', (req, res) => {
  const planets = router.db.get('planets').value().map(planet => ({ "id": planet.id, "name": planet.name })); 
  res.json(planets);
});

app.get('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  const planet = router.db.get('planets').find({ id: +id }).value();
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  res.json(planet);
});

app.get('/api/species', (req, res) => {
  const species = router.db.get('species').value().map(specie => ({ "id": specie.id, "name": specie.name }));
  res.json(species);
});

app.get('/api/species/:id', (req, res) => {
  const { id } = req.params;
  const specie = router.db.get('species').find({ id: +id }).value();
  if (!specie) {
    return res.status(404).json({ error: 'Species not found' });
  }
  res.json(specie);
});

app.get('/api/starships', (req, res) => {
  const starships = router.db.get('starships').value().map(ship => ({ "id": ship.id, "name": ship.starship_class }));
  res.json(starships);  
});

app.get('/api/starships/:id', (req, res) => {
  const { id } = req.params;
  const starship = router.db.get('starships').find({ id: +id }).value();
  if (!starship) {
    return res.status(404).json({ error: 'Starship not found' });
  }
  res.json(starship);
} );

app.get('/api/vehicles', (req, res) => {
  const vehicles = router.db.get('vehicles').value().map(vehicle => ({ "id": vehicle.id, "name": vehicle.vehicle_class }));
  res.json(vehicles);
});
app.get('/api/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const vehicle = router.db.get('vehicles').find({ id: +id }).value();
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  res.json(vehicle);
});

app.get('/api/films/:id/characters', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_characters').filter({ film_id: +id }).value();
  const characters_ids = junction_data.map(item => item.character_id);
  const characters = router.db.get('characters').value().filter(character => characters_ids.includes(character.id)).map(character => ({ "id": character.id, "name": character.name }));
  res.json(characters);
});


app.get('/api/characters/:id/films', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_characters').filter({ character_id: +id }).value();
  const films_ids = junction_data.map(item => item.film_id);
  const films = router.db.get('films').value().filter(film => films_ids.includes(film.id)).map(film => ({ "id": film.id, "title": film.title }));
  res.json(films);
});

app.get('/api/films/:id/planets', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_planets').filter({ film_id: +id }).value();
  const planet_ids = junction_data.map(item => item.planet_id);
  const planets = router.db.get('planets').value().filter(planet => planet_ids.includes(planet.id)).map(planet => ({ "id": planet.id, "name": planet.name }));
  res.json(planets);
});


app.get('/api/planets/:id/films', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_planets').filter({ planet_id: +id }).value();
  const films_ids = junction_data.map(item => item.film_id);
  const films = router.db.get('films').value().filter(film => films_ids.includes(film.id)).map(film => ({ "id": film.id, "title": film.title }));
  res.json(films);
});

app.get('/api/films/:id/species', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_species').filter({ film_id: +id }).value();
  const species_ids = junction_data.map(item => item.species_id);
  const species = router.db.get('species').value().filter(specie => species_ids.includes(specie.id)).map(specie => ({ "id": specie.id, "name": specie.name }));
  res.json(species);
});


app.get('/api/films/:id/starships', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_starships').filter({ film_id: +id }).value();
  const starships_ids = junction_data.map(item => item.starship_id);
  const starships = router.db.get('starships').value().filter(ship => starships_ids.includes(ship.id)).map(ship => ({ "id": ship.id, "name": ship.starship_class }));
  res.json(starships);
});


app.get('/api/films/:id/vehicles', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('films_vehicles').filter({ film_id: +id }).value();
  const vehicles_ids = junction_data.map(item => item.vehicle_id);
  const vehicles = router.db.get('vehicles').value().filter(vehicle => vehicles_ids.includes(vehicle.id)).map(vehicle => ({ "id": vehicle.id, "name": vehicle.vehicle_class }));
  res.json(vehicles);
});


app.get('/api/species/:id/characters', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('species_characters').filter({ species_id: +id }).value();
  const character_ids = junction_data.map(item => item.character_id);
  const characters = router.db.get('characters').value().filter(character => character_ids.includes(character.id)).map(character => ({ "id": character.id, "name": character.name }));
  res.json(characters);
});


app.get('/api/starships/:id/characters', (req, res) => {
  const { id } = req.params;
  const junction_data = router.db.get('starships_characters').filter({ starship_id: +id }).value();
  const character_ids = junction_data.map(item => item.character_id);
  const characters = router.db.get('characters').value().filter(character => character_ids.includes(character.id)).map(character => ({ "id": character.id, "name": character.name }));
  res.json(characters);
});


app.get('/api/planets/:id/characters', (req, res) => {
  const { id } = req.params;
  const rawCharacters = router.db.get(`characters`).value()
  //console.log({ id, rawCharacters })
  const characters = rawCharacters?.filter(character => character.homeworld === +id).map(character => ({ "id": character.id, "name": character.name }));
  res.json(characters);
});


const middlewares = jsonServer.defaults();
app.use(middlewares);
const router = jsonServer.router('database.json');
app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`
  API data server is listening on http://localhost:${port}/api
  Web server is listening on http://localhost:${port}
  `);
}
);
