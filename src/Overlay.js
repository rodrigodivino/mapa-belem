import React from "react";
import { useLeaflet } from "react-leaflet";
import { LatLng } from "leaflet";
export default function (center, offset) {
  const map = useLeaflet().map;
  const ll = new LatLng(-1.445833, -48.463887);

  console.log(ll, map.getPixelOrigin());
  console.log(map.latLngToLayerPoint(ll));
  return <circle cx={ll.x} cy={ll.y} r={25}></circle>;
}
