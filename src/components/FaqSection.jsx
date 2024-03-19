import React, { useState } from "react";

const FaqSection = () => {
  const faqData = [
    {
      question: "What file types are supported on the platform?",
      answer:
        "DataDrop supports a wide array of file formats, including documents, images, videos, and more. Our platform ensures flexibility in handling diverse file types for your convenience.",
    },
    {
      question: "How do I share files via email?",
      answer:
        "Sharing files via email is easy on DataDrop. Simply select the file you want to share, choose the 'Email' option, and provide the recipient's email address. They'll receive a secure link to access the shared file directly.",
    },
    {
      question: "Are there any restrictions on file sizes?",
      answer:
        "Yes, DataDrop maintains a file size restriction of 15 MB. This ensures smooth uploading and efficient sharing. Be mindful of file sizes to enhance your overall file-sharing experience.",
    },
    {
      question: "What happens if I forget the password for a protected file?",
      answer:
        "In the event of a forgotten password for a protected file, Unfortunately DataDrop , doesn't offer password recovery.  Ensure to keep passwords secure .",
    },
    {
      question:
        "Can I share files with users who don't have an account on the platform?",
      answer:
        "Absolutely! DataDrop allows you to share files with anyone, even if they don't have an account. Simply generate a shareable link, and recipients can access the shared files seamlessly without the need for an account.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-100 container">
      <h3 className="fs-5 md:fs-3 mb-5 text-center">
        Frequently Asked Questions
      </h3>
      <div
        className="accordion accordion-flush text-start px-2 px-lg-5 mb-5"
        id="accordionFlushExample"
      >
        {faqData.map((faq, index) => (
          <div key={index} className="accordion-item mx-lg-5">
            <h3 className="accordion-header " id={`faqHeading${index}`}>
              <button
                className={`accordion-button ${
                  activeIndex === index ? "" : "collapsed"
                } px-lg-5 fs-6`}
                type="button"
                onClick={() => handleAccordionClick(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faqCollapse${index}`}
              >
                {faq.question}
              </button>
            </h3>
            <div
              id={`faqCollapse${index}`}
              className={`accordion-collapse collapse  ${
                activeIndex === index ? "show" : ""
              }`}
              aria-labelledby={`faqHeading${index}`}
            >
              <div className="accordion-body p-4 px-lg-5">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
