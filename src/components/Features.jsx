import React from "react";

const Features = () => {
  const features = [
    {
      iconClass: "bx bx-lock bg-danger text-white p-2 rounded",
      title: "Password Protection",
      description: "Secure your files with password protection.",
    },
    {
      iconClass: "bx bx-cloud-upload bg-success text-white p-2 rounded",
      title: "File Upload",
      description: "Easily upload files up to 15 MB in size.",
    },
    {
      iconClass: "bx bx-time bg-primary text-white p-2 rounded",
      title: "Automatic Deletion",
      description:
        "Files are automatically deleted from the server after 24 hours.",
    },
    {
      iconClass: "bx bx-file-blank bg-warning text-white p-2 rounded",
      title: "Multiple File Formats ",
      description: "Support for a wide range of file formats.",
    },
  ];

  return (
    <section className="container my-5 pt-5" id="features">
      <h3 className="text-uppercase mb-4 mb-lg-5 fs-3 ">Features</h3>

      <div className="row pb-lg-5 py-3">
        {features.map((feature, index) => (
          <div key={index} className="col-lg-3 col-sm-6 pb-4 pb-lg-0">
            <div className="icon pb-3">
              <i className={feature.iconClass}></i>
            </div>
            <div className="desc">
              <h5>{feature.title}</h5>
              <p className="text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
