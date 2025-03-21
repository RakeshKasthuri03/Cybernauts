import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEventForm.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddEventForm() {
  const location = useLocation();
  const { event } = location.state || {};
 const [otherEventType, setOtherEventType] = useState("");
  const [eventType, setEventType] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads
    const formElements = e.target.elements;

    // Append basic form fields
    formData.append("title", formElements.title.value);
    formData.append("type", formElements.type.value);
    formData.append("startDate", formElements.startDate.value);
    formData.append("endDate", formElements.endDate.value);
    formData.append("desc", formElements.description.value);
    formData.append("startTime", formElements.startTime.value);
    formData.append("endTime", formElements.endTime.value);
    formData.append("form", formElements.form.value);
    formData.append("organizer", formElements.organizer.value);
    formData.append("faculty", formElements.faculty.value);
    formData.append("chiefGuest", formElements.chiefGuest.value);

    // Append the poster file
    const posterFile = formElements.poster.files[0];
    if (posterFile) {
      formData.append("poster", posterFile);
    }
    const images = formElements.images.files;
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    try {
      // Make the API call
      const response = await axios.put(
        `http://${process.env.REACT_APP_BACKEND_URI}:3001/admin/events/` + event._id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/events");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add the event. Please try again.");
    }
  };

  return (
    <div className="add-event-form">
      <h2>Edit Event: {event.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Event Type:</label>
          <select id="type" name="type">
            <option value="" disabled>
              Select type
            </option>
            <option value="Hackathon">Hackathon</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {eventType === "Other" && (
          <div className="form-group">
            <label htmlFor="otherType">Specify Event Type:</label>
            <input
              type="text"
              id="otherType"
              name="otherType"
              placeholder="Enter event type"
              value={otherEventType}
              onChange={(e) => setOtherEventType(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" />
        </div>

        <div className="form-group">
          <label htmlFor="poster">Poster:</label>
          <input type="file" id="poster" name="poster" accept="image/*" />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
          />
        </div>

        <div className="form-group">
          <label htmlFor="form">Form:</label>
          <input type="text" id="form" name="form" placeholder="Form URL" />
        </div>

        <div className="form-group">
          <label htmlFor="organizer">Organizer:</label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            placeholder="Enter Organizer Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="faculty">Faculty:</label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            placeholder="Enter Faculty Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="chiefGuest">Chief Guest:</label>
          <input
            type="text"
            id="chiefGuest"
            name="chiefGuest"
            placeholder="Enter Chief Guest Name"
          />
        </div>

        {/* <div className="form-group contributors-group">
          <div className="contributors-header">
            <label>Contributors:</label>
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="btn-add-contributor"
            >
              Add Contributor
            </button>
          </div>
          <ul className="contributor-list">
            {contributors.map((contributor) => (
              <li key={contributor.roll}>
                {contributor.contribution}: {contributor.roll}
              </li>
            ))}
          </ul>
        </div> */}

        {/* {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Add Contributor</h3>
              <div className="form-group">
                <label>Contribution:</label>
                <input
                  type="text"
                  placeholder="Enter contribution"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Roll Number:</label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                />
              </div>
              <div className="popup-actions">
                <button onClick={handleAddContributor} type="button">
                  Add
                </button>
                <button onClick={() => setShowPopup(false)} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )} */}

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
