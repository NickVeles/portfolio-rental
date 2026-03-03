import { Property, Location } from "./generated/prisma";

// Re-export Prisma generated types and enums
export * from "./generated/prisma";

type LocationWithCoordinates = Location & {
  coordinates: {
    longitude: number;
    latitude: number;
  };
};

export type PropertyWithLocation = Property & {
  location: LocationWithCoordinates;
};
