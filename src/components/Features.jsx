import React from "react";

const Features = () => {
  const features = [
    {
      iconClass: "bx bx-search bg-danger text-white p-2 rounded",
      title: "Advanced Search",
      description: "Efficiently search for GitHub users ",
    },
    {
      iconClass: "bx bx-info-circle bg-success text-white p-2 rounded",
      title: "User Details",
      description: "View detailed information about GitHub users",
    },
    {
      iconClass: "bx bx-code-alt bg-primary text-white p-2 rounded",
      title: "Repository Details",
      description:
        "Explore repositories with details such as languages used, stars, and forks.",
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
