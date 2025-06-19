const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['music', 'tech', 'conference', 'religious', 'art', 'food', 'sports', 'education', 'other'],
    required: true,
  },
  ticketType: {
    type: String,
    enum: ['free', 'paid'],
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  poster:{
    type:String,
    required: true,
  },
  remainingcapacity:{
    type: Number,
    default: 0,
    min: 0,
  },
  rsvpDeadline: {
    type: String,
    required: true,
  },
  parkingAvailable: {
    type: Boolean,
    default: false,
  },
  bannerImageURL: {
    type: String,
    default:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
    /* required: true, */
  },
  bannerImagePublicId: {
    type: String,
  },
});

module.exports = mongoose.model('Event', EventSchema);
