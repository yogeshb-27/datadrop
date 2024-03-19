import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { getFileIcon, formatFileSize } from "../Utils/FileUtils";

const File = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [fileDetails, setFileDetails] = useState(null);
  const [url, setUrl] = useState("");
  const [mail, setMail] = useState("");
  const [isSendingMail, setIsSendingMail] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchFileDetails();
  }, []);

  const fetchFileDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/file/${fileId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      setFileDetails(response.data.file);
      setUrl(response.data.url);
    } catch (error) {
      console.error("Error fetching file details:", error);
    }
  };

  const copyLink = async () => {
    if (url.trim() !== "") {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Error copying link");
      }
    }
  };

  const sendMail = async () => {
    try {
      setIsSendingMail(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/file/send-mail/${fileId}`,
        { mail },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setMail("");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching file details:", error);
    } finally {
      setIsSendingMail(false);
    }
  };
  if (!fileDetails) {
    return <p className="pt-5 mt-5 text-center">Loading...</p>;
  }

  return (
    <div className="container p-2 p-lg-5 d-flex align-items-center justify-content-center flex-column position-relative">
      <button
        className="btn btn-link text-dark text-decoration-none position-absolute top-0 end-0 mt-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <main className="row w-100 mt-5">
        <div className="col-12 col-lg-6 text-center">
          <div className="icon" style={{ fontSize: "6rem" }}>
            {getFileIcon(fileDetails.type)}
          </div>
          <p>Name : {fileDetails.name}</p>
          <small className="text-muted mb-3">
            Size: {formatFileSize(fileDetails.size)}
          </small>
        </div>
        <div className="col-12 col-lg-6 d-flex align-items-center flex-column px-lg-5 ">
          <div className="position-relative w-100">
            <input
              type="text"
              placeholder="Link"
              value={url}
              className="w-100 form-control pe-4"
              readOnly
            />
            <i
              className="bx bx-copy copy-icon"
              onClick={copyLink}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Copy to clipboard"
            ></i>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="email">Send File to Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="form-control"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              name="email"
              required
            />
            <button
              className="btn btn-primary"
              onClick={sendMail}
              disabled={!mail.trim() || isSendingMail}
            >
              {isSendingMail ? "Sending Mail " : "Send Email"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default File;
