import { Router } from "express";
import { register, login, user, logout } from "./controllers/auth.controller";
import {
  createEventHandler,
  getEventHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "./controllers/event.controller";
import { forgot, reset } from "./controllers/forgot.controller";
import { isAuthenticated, isAdmin, registrationMiddleware, loginMiddleware, eventMiddleware } from "./helpers/middlewares";


export const routes = (router: Router) => {
  // Authentication routes
  router.post("/api/register", registrationMiddleware, register), 
  router.post("/api/login",loginMiddleware, login);
  router.get("/api/user", isAuthenticated, user);
  router.post("/api/logout", logout);
  router.post("/api/forgot", forgot);
  router.post("/api/reset", reset);

  // Events routes
//   Only admin can create, delete and update event
// the eventMiddleware is to validate request body before getting to the database.
    router.post("/api/create-event", eventMiddleware, isAdmin, createEventHandler)
    router.get("/api/event", getEventHandler);

    // get, update and delete event by slug
  
    router.get("/api/get-event/:slug", getEventByIdHandler)
    router.patch("/api/update-event/:slug", isAdmin, updateEventHandler)
    router.delete("/api/delete-event/:slug",isAdmin, deleteEventHandler);
};
