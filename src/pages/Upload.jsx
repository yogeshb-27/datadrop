import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { formatFileSize } from "../Utils/FileUtils";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [addPassword, setAddPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      if (selectedFile.size <= 15 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        toast.error("File size exceeds the limit (15 MB)");
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("password", password);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        };

        await axios.post(
          ` ${import.meta.env.VITE_API_URL}/file/upload`,
          formData,
          config
        );
        setFile(null);
        setUploadProgress(0);
        setPassword("");
        toast.success("File uploaded successfully");
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("Unauthorized");
          logout();
          navigate("/login");
        }
        toast.error(error.response.data.error);
        setFile(null);
        setUploadProgress(0);
        console.error(error);
      }
    }
  };
  return (
    <main
      className="d-flex align-items-center justify-content-center flex-column  container my-5 "
      style={{ maxWidth: "500px" }}
    >
      <h5 className="my-5">Upload File</h5>
      <div
        {...getRootProps()}
        className={`dropzone ${
          isDragActive ? "border-info" : ""
        } mb-5 w-75 md:w-100`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>
            <i className="bx bx-cloud-upload fs-3 d-block"></i>
            Drag 'n' drop a file here,
            <br /> or <br />
            Browse File
          </p>
        )}
      </div>
      {file && (
        <>
          <div className="mb-3 form-check w-100 text-start">
            <input
              type="checkbox"
              className="form-check-input"
              id="addPasswordCheckbox"
              checked={addPassword}
              onChange={() => {
                setAddPassword(!addPassword), setPassword("");
              }}
            />
            <label className="form-check-label" htmlFor="addPasswordCheckbox">
              Add Password
            </label>
            {addPassword && (
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
          </div>
          <div className="mb-3  m-auto text-center">
            <p className="mb-1">{file.name}</p>
            <p className="mb-1 text-muted">Size: {formatFileSize(file.size)}</p>
            <div className="progress" style={{ width: "200px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </button>
    </main>
  );
};

export default Upload;
