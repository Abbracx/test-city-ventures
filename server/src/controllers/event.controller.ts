import { Response, Request } from "express";
import {
  createEvent,
  getEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../services/event.service";
import { User } from "../models/user.model";
import Event from "../models/event.model";
import { IEvent } from "../helpers/interfaces";

// Handler to create Event
export const createEventHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    console.log(req.body);
    const event = await createEvent(req.user, req.body);
    res.status(201).send({ message: "created successfuly", event });
    return;
  } catch (error: any) {
    console.trace(error);
    res.status(500).json({ status: "error", message: "some bad request" });
    return;
  }
};

//Handler to get all events
export const getEventHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const events = await getEvent();
    return res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ status: "error", message: "some bad request" });
  }
};

//Handler to get event by ID
export const getEventByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const event = await getEventById(req.params.slug);
    res.status(200).json(event);
    return;
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", message: "some bad request" });
  }
};

// Handler to update Event
export const updateEventHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const updatedEvent = await updateEvent(req.params.slug, req.body);
    return res.status(200).send({ message:"updated", updatedEvent });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: "some bad request" });
  }
};

// Handler to delete event
export const deleteEventHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const deletedEvent = await deleteEvent(req.params.id);
    return res.status(200).send({ message:"deleted", deletedEvent });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: "some bad request" });
  }
};
