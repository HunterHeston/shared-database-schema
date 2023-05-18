# Shared Database Schema

This repo contains only the database schema for a database which is shared between many applications.

## Technology

- The schema is written in Prisma's schema language. See [Prisma's documentation](https://www.prisma.io/docs/concepts/components/prisma-schema) for more information.
- The database host is PlanetScale. See [PlanetScale's documentation](https://docs.planetscale.com/) for more information.

## Usage

Clone the repository and make changes to the schema. Test them locally, run `prisma db push` to push the changes to PlanetScale, and then run prisma generate to generate the client.
