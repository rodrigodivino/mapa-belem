import React from "react";
import { useLeaflet } from "react-leaflet";
import { LatLng } from "leaflet";
export default function (zoom) {
  const map = useLeaflet().map;
  const ll = new LatLng(-1.445833, -48.463887);
  const point = map.latLngToLayerPoint(ll);

  console.log(point);
  return <circle cx={point.x} cy={point.y} r={25}></circle>;
}
