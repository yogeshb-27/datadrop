import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getFileIcon, formatFileSize } from "../Utils/FileUtils";
const Download = () => {
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [fileDetails, setFileDetails] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchFileDetails();
  }, []);

  const fetchFileDetails = async () => {
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_API_URL}/file/${fileId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      setFileDetails(response.data.file);
    } catch (error) {
      navigate("/not-found");
      console.error("Error fetching file details:", error);
    }
  };

  const handleDownloadFileClick = async (fileId, fileName) => {
    if (fileDetails.password && !password) {
      toast.error("Password is required for this file");
      return;
    }

    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_URL}/file/download/${fileId}`,
        { password },
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      link.click();
      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Password Incorrect");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!fileDetails) {
    return <p className="pt-5 mt-5 text-center">Loading...</p>;
  }

  return (
    <div className="container p-2 p-lg-5 d-flex align-items-center justify-content-center flex-column position-relative">
      <main className="row w-100 mt-5" style={{ maxWidth: "450px" }}>
        <div className="col-12  text-center">
          <div className="icon" style={{ fontSize: "6rem" }}>
            {getFileIcon(fileDetails.type)}
          </div>
          <p className="mb-1">Name : {fileDetails.name}</p>
          <p className="text-muted mb-3 fs-6">
            <small> Type: {fileDetails.type} </small> <br />
            <small> Size: {formatFileSize(fileDetails.size)} </small>
          </p>

          {fileDetails.password && (
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <i
                className={`bx ${
                  showPassword ? "bx-hide" : "bx-show"
                } toggle-password`}
                onClick={handleShowPassword}
              ></i>
            </div>
          )}
          <button
            className="btn btn-primary px-4"
            onClick={() => handleDownloadFileClick(fileId, fileDetails.name)}
          >
            <i className="bx bx-download me-2"></i>Download
          </button>
        </div>
      </main>
    </div>
  );
};

export default Download;
