import { Schema, model } from "mongoose";
import { IEvent } from "../helpers/interfaces";

// create a schema
const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    address: { type: String },
    isVirtual : { type: Boolean },
    category: { type: String },
    host: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// middleware
// make sure that the slug is created from the title
EventSchema.pre('save', function(next) {
  this.slug = slugify(this.title);
  next();
});

EventSchema.pre("update", function (next) {
  console.log(this.getUpdate())
  next();
});

// function to slugify a title
function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

//creates an Event model
const Event = model<IEvent>("Event", EventSchema);
export default Event;
