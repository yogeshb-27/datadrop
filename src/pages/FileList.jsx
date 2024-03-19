import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getFileIcon, formatFileSize } from "../Utils/FileUtils";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const FileList = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/file/`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      setLoading(false);
      setFiles(response.data.files);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Unauthorized");
        logout();
        navigate("/login");
      }
      console.error(error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/file/delete/${fileId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      console.log(response);
      fetchFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const truncateFileName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    }
    return name.substring(0, maxLength - 3) + "...";
  };

  if (loading) {
    return <p className="pt-5 mt-5 text-center">Loading...</p>;
  }

  return (
    <div className="container px-lg-5 ">
      {files?.length > 0 ? (
        <div className="files m-3 p-3 bg-white rounded px-lg-5 mx-lg-5">
          <table className="table table-striped  mx-lg-5">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="align-middle">
                  <td className="text-center " style={{ maxWidth: "1rem" }}>
                    {file.password && (
                      <i
                        className="bx bxs-lock-alt text-danger"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Locked With Password"
                      ></i>
                    )}
                  </td>
                  <td
                    className="file-icon"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`${file.name}`}
                  >
                    {getFileIcon(file.type)} {truncateFileName(file.name, 20)}
                  </td>
                  <td>{file.type}</td>
                  <td>{formatFileSize(file.size)}</td>
                  <td>
                    <i
                      className="bx bx-trash-alt text-danger cursor-pointer me-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete File"
                      onClick={() => handleDeleteFile(file._id)}
                    ></i>
                    <small>
                      <Link to={`/files/${file._id}`} className="text-primary">
                        View
                      </Link>
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center pt-5 mt-5">
          Start uploading files to fill this space.
        </p>
      )}
    </div>
  );
};

export default FileList;
