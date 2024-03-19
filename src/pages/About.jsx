import React from "react";

const About = () => {
  return (
    <div className="px-3 px-md-5 py-5 mt-5 container mx-auto">
      <h2 className="display-1 fs-3 md:fs-2 text-center mb-5">
        <span className="text-primary">DataDrop </span> : Secure File Sharing
        Mini-Project
      </h2>
      <h3 className="fs-5 md:fs-4 display-6">Description:</h3>
      <p>
        DataDrop is a mini-project aimed at simplifying and securing file
        sharing in a user-friendly manner. With a focus on efficiency and
        security, DataDrop allows users to seamlessly share files of up to 15MB
        via links or email. Users can also add an extra layer of protection by
        setting passwords for added security. The platform's responsive design
        ensures accessibility from various devices, and a 24-hour file sharing
        validity period adds an element of control.
      </p>
      <h3 className="fs-5 md:fs-4 display-6">Technology Stack:</h3>

      <ul>
        <li>
          Frontend: React.js for a dynamic and interactive user interface.
        </li>
        <li> Backend: Node.js and Express for server-side logic. </li>
        <li> Database: MongoDB for efficient and scalable data storage. </li>
        <li>
          Additional Libraries: Axios for making HTTP requests, React Hot Toast
          for notifications, Nodemailer for sending mails and React Hot Drop for
          file drag-and-drop functionality.
        </li>
      </ul>
    </div>
  );
};

export default About;
