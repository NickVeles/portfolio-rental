import {
  Property as PrismaProperty,
  Location as PrismaLocation,
  Tenant as PrismaTenant,
} from "./generated/prisma";

// Re-export Prisma generated types and enums
export * from "./generated/prisma";

export type Location = PrismaLocation & {
  coordinates:
    | {
        longitude: number;
        latitude: number;
      }
    | undefined;
};

export type Property = PrismaProperty & {
  location: Location | undefined;
};

export type Tenant = PrismaTenant & {
  favorites: Property[] | undefined;
}

//! You should do these redefines first in your
//! next project, so they wouldn't need to be
//! undefined and instead properly handled.
