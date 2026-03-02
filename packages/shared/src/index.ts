// Re-export Prisma generated types and enums
export * from "./generated/prisma";

export type PropertyWithLocation = import("./generated/prisma").Property & {
  location: {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };
};
