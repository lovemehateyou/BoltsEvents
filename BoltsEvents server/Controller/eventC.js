const Event = require('../Model/eventM');
const cloudinary = require('../Config/cloude');
const fs = require('fs');


exports.createEvent = async (req, res) => {
  const {
      title,
      date,
      time,
      location,
      description,
      category,
      ticketType,
      price,
      capacity,
      poster,
      rsvpDeadline,
      parkingAvailable,
    } = req.body;
   const { file } = req;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const uploadPath = file.path;
  const uploadResult = await cloudinary.uploader.upload(uploadPath, {
    folder: 'events',
    resource_type: 'auto',
  });
  fs.unlinkSync(uploadPath); // Delete the file after uploading to Cloudinary
  const bannerImage = {
    public_id: uploadResult.public_id,
    url: uploadResult.secure_url,
  }; 

  try {
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      description,
      category,
      ticketType,
      price,
      capacity,
      poster,
      remainingcapacity: capacity,
      rsvpDeadline: new Date(rsvpDeadline),
      parkingAvailable,
      bannerImageURL: bannerImage.url,
      bannerImagePublicId: bannerImage.public_id, 
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    //Fetch all events from the database
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
