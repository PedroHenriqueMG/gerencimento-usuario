import { createDocument } from "zod-openapi";
import { tasksBody, tasksGetAll, tasksSchema } from "../@types/UserSchema";

export const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "To-Do List API",
    version: "1.0.0",
  },
  paths: {
    "/tasks": {
      post: {
        tags: ["Tasks"],
        requestBody: {
          content: {
            "application/json": { schema: tasksBody },
          },
        },
        responses: {
          "201": {
            description: "201 Created",
            content: {
              "application/json": {
                schema: tasksSchema,
              },
            },
          },
        },
      },
      get: {
        tags: ["Tasks"],
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: tasksGetAll,
              },
            },
          },
        },
      },
    },
    "/tasks/{id}": {
      put: {
        tags: ["Tasks"],
        requestBody: {
          content: {
            "application/json": { schema: tasksBody },
          },
        },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: tasksSchema,
              },
            },
          },
        },
      },
      delete: {
        tags: ["Tasks"],
        responses: {
          "204": {
            description: "204 No Content",
          },
        },
      },
    },
  },
});
