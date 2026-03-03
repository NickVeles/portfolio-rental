"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import { Property } from "@portfolio-rental/shared";
import { Spinner } from "@/components/ui/spinner";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainerRef = useRef(null);
  const filters = useAppSelector((state) => state.global.filters);
  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !properties) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/nickveles/cmm9o9tpz00eh01qw9gq6cang",
      center: filters.coordinates || [52.23, 21.01],
      zoom: 9,
    });

    createPropertyMarkers(properties, map);

    const resizeMap = () => {
      if (map) setTimeout(() => map.resize(), 700);
    };
    resizeMap();

    return () => map.remove();
  }, [isLoading, isError, properties, filters.coordinates]);

  if (isLoading) return <Spinner />;
  if (isError || !properties) return <div>Failed to fetch properties</div>;

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

const createPopupContent = (property: Property): HTMLElement => {
  const container = document.createElement("div");
  container.className = "marker-popup";

  const imageDiv = document.createElement("div");
  imageDiv.className = "marker-popup-image";

  const infoDiv = document.createElement("div");

  const link = document.createElement("a");
  link.href = `/search/${encodeURIComponent(property.id)}`;
  link.target = "_blank";
  link.className = "marker-popup-title";
  link.textContent = property.name;

  const price = document.createElement("p");
  price.className = "marker-popup-price";
  price.textContent = `$${property.pricePerMonth}`;

  const unit = document.createElement("span");
  unit.className = "marker-popup-price-unit";
  unit.textContent = " / month";
  price.appendChild(unit);

  infoDiv.appendChild(link);
  infoDiv.appendChild(price);
  container.appendChild(imageDiv);
  container.appendChild(infoDiv);

  return container;
};

const createPropertyMarkers = (properties: Property[], map: mapboxgl.Map) => {
  properties.forEach((property) => {
    if (!property.location || !property.location.coordinates) return;

    const marker = new mapboxgl.Marker()
      .setLngLat([
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ])
      .setPopup(
        new mapboxgl.Popup().setDOMContent(createPopupContent(property)),
      )
      .addTo(map);

    const markerElement = marker.getElement();
    const path = markerElement.querySelector("path[fill='#3FB1CE']");
    if (path) path.setAttribute("fill", "#000000");
  });
};

export default Map;
