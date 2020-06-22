import React from "react";
import { Map, TileLayer, Polygon } from "react-leaflet";
import bairros from "./belem.json";
import "./App.css";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import L from "leaflet";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const featureArray = bairros.flatMap((b) => b.features);
  console.log(featureArray[0].geometry.coordinates[0]);
  return (
    <div className="App">
      <h1> Leaflet + D3 Integration in React </h1>

      <Map center={[-1.445833, -48.463887]} zoom={13}>
        {featureArray.map((feature) => (
          <Polygon
            key={feature.properties.place_id}
            positions={feature.geometry.coordinates[0].map((arr) =>
              arr.reverse()
            )}
          />
        ))}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      <p> Geocoding provided by the Nominatim API</p>
    </div>
  );
}

export default App;

/**
 * 
 * <Marker
          key={point.properties.place_id}
          position={[
            point.geometry.coordinates[1],
            point.geometry.coordinates[0],
          ]}
        />
 * 
const bairros: string[] = [
  "Sacramenta",
  "Reduto",
  "Pedreira",
  "Telégrafo",
  "Marco",
  "Umarizal",
  "Fátima",
  "Reduto",
  "Campina",
  "Nazare",
  "Batista%20Campos",
  "Jurunas",
  "Condor",
  "Guamá",
  "Curió-Utinga",
];
 * To fetch the data:
 * const [bairrosJson, setBairrosJson] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      const jsons = [];
      for (let bairro of bairros) {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search/${bairro},Belem,Para,Brasil?&format=geojson&polygon_geojson=1`,
          {
            cache: "force-cache",
          }
        );
        const json = await res.json();
        jsons.push(json);
      }
      setBairrosJson(jsons);
    };
    fetchData();
  }, []);
 * 
 */
