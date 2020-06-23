import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useLeaflet } from "react-leaflet";
import { LatLng } from "leaflet";

const line = d3
  .line()
  .x((a) => a[0])
  .y((a) => a[1]);
export default function ({ bairros }) {
  const map = useLeaflet().map;
  const svgOriginLL = new LatLng(-1.445833 - 0.1, -48.463887 - 0.1);
  const svgOriginPT = map.latLngToLayerPoint(svgOriginLL);

  const ll = new LatLng(-1.445833, -48.463887);
  const point = map.latLngToLayerPoint(ll);

  const svgEndLL = new LatLng(-1.445833 + 0.1, -48.463887 + 0.1);
  const svgEndPT = map.latLngToLayerPoint(svgEndLL);

  const yScale = d3
    .scaleLinear()
    .domain([svgOriginPT.y, svgEndPT.y])
    .range([svgEndPT.y, svgOriginPT.y]);
  function coordToPoint(ll) {
    const point = map.latLngToLayerPoint(ll);
    return { x: point.x - svgOriginPT.x, y: -point.y + svgOriginPT.y };
  }
  function arrayToPoint(arr) {
    const ll = new LatLng(arr[1], arr[0]);

    const point = map.latLngToLayerPoint(ll);

    return [point.x - svgOriginPT.x, -yScale(point.y) + svgOriginPT.y];
  }

  console.log("origin", svgOriginPT);
  console.log("point", point);
  console.log("end", svgEndPT);
  console.log("relative", coordToPoint(ll));

  return (
    <>
      {bairros.map((b, i) => (
        <path
          opacity={0.3}
          key={i}
          d={line(b.geometry.coordinates[0].map(arrayToPoint))}
          fill="slategray"
          stroke="firebrick"
          stroke-width={4}
        ></path>
      ))}
    </>
  );
}
