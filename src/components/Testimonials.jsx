import React from "react";

const testimonialsData = [
  {
    name: "Emily S.",
    feedback:
      "DataDrop simplifies my file sharing process. Password protection adds extra security, making it my go-to platform for efficient and secure collaboration.",
  },
  {
    name: "John M.",
    feedback:
      "As a freelancer, I value the convenience of sharing files via email directly from DataDrop. It saves me so much time and keeps my workflow seamless.",
  },
  {
    name: "Sarah D.",
    feedback:
      "The password protection feature gives me peace of mind when sharing sensitive files. A must-have for anyone concerned about data security and privacy.",
  },
  {
    name: "Mike R.",
    feedback:
      "DataDrop's responsive design allows me to access files on the go. The intuitive dashboard and drag-and-drop upload make it user-friendly and reliable for my work.",
  },
  {
    name: "Amanda L.",
    feedback:
      "I love the versatility of file types supported. Whether it's documents, images, or videos, DataDrop handles it all effortlessly, making my file management seamless.",
  },
  {
    name: "Alex G.",
    feedback:
      "The link sharing and password protection features in DataDrop make it a secure and efficient solution for sharing files with clients, ensuring confidentiality and ease of use.",
  },
  {
    name: "Eva Z.",
    feedback:
      "DataDrop's mobile accessibility and responsiveness make it easy to access and share files on the go. A must-have for mobile professionals seeking convenience and flexibility.",
  },
];

const Testimonials = () => {
  return (
    <section className="mb-5">
      <h3 className="fs-3 text-center mb-5">Testimonials</h3>
      <div
        id="testimonialsCarousel"
        className="carousel slide container"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner position-relative">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 mx-auto">
                    <div className="card mb-3 w-lg-50">
                      <div className="card-body p-3 p-lg-5 ">
                        <p className="card-text">{testimonial.feedback}</p>
                        <small className="card-title text-primary">
                          - {testimonial.name} -
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev bg-dark"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="prev"
          style={{ top: "50%", transform: "translateY(-50%)", width: "2rem" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next bg-dark"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="next"
          style={{ top: "50%", transform: "translateY(-50%)", width: "2rem" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
