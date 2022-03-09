
import Event from "../models/event.model";
import { IEvent, IUser } from "../helpers/interfaces";



export const createEvent = async (user: IUser, data: IEvent): Promise<IEvent> => {
  try {
    console.log(data);
    const event = new Event(data);
    event.host = user._id;
    await event.save();

    return event;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async () => {
  try {
    const events = await Event.find().populate("host").sort({ createdAt: "desc" });
    return events;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (slug: string) => {
  try {
    const event = await Event.findOne({ slug: slug }).populate("host");
    return event;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (slug:string, data: any) => {
    // console.log(data)
  try {
    let doc = await Event.findOneAndUpdate({slug: slug}, data, { new: true });

    // console.log(doc)
    return doc
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (slug: string) => {
  try {
      const deletedEvent = await Event.deleteOne({ slug: slug })
      return deletedEvent
  } catch (error) {
    throw error;
  }
};
