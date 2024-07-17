import { createDocument } from "zod-openapi";
import { usersBody, usersGetAll, userSchema } from "../@types/UserSchema";

export const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "To-Do List API",
    version: "1.0.0",
  },
  paths: {
    "/users": {
      post: {
        tags: ["Users"],
        requestBody: {
          content: {
            "application/json": { schema: usersBody },
          },
        },
        responses: {
          "201": {
            description: "201 Created",
            content: {
              "application/json": {
                schema: userSchema,
              },
            },
          },
        },
      },
      get: {
        tags: ["Users"],
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: usersGetAll,
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      put: {
        tags: ["Users"],
        requestBody: {
          content: {
            "application/json": { schema: usersBody },
          },
        },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: userSchema,
              },
            },
          },
        },
      },
      delete: {
        tags: ["Users"],
        responses: {
          "204": {
            description: "204 No Content",
          },
        },
      },
    },
  },
});
