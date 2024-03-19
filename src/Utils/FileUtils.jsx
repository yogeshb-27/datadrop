export const getFileIcon = (fileType) => {
  switch (fileType) {
    case "pdf":
      return <i className="bx bxs-file-pdf text-danger"></i>;
    case "md":
      return <i className="bx bxs-file-md text-secondary"></i>;
    case "doc":
    case "docx":
      return <i className="bx bxs-file-doc text-primary"></i>;
    case "html":
      return <i className="bx bxl-html5 text-danger"></i>;
    case "css":
      return <i className="bx bxl-css3 text-primary"></i>;
    case "js":
    case "ts":
      return <i className="bx bxl-javascript text-warning"></i>;
    case "php":
      return <i className="bx bxl-php text-primary-emphasis"></i>;
    case "java":
      return <i className="bx bxl-java text-danger"></i>;
    case "jsx":
    case "tsx":
      return <i className="bx bxl-react text-info"></i>;
    case "py":
      return <i className="bx bxl-python text-warning"></i>;
    case "cpp":
    case "c":
      return <i className="bx bxl-c-plus-plus text-primary-emphasis"></i>;
    case "go":
      return <i className="bx bxl-go-lang text-info"></i>;
    case "git":
    case "gitignore":
      return <i className="bx bxl-git text-danger"></i>;
    case "db":
      return <i className="bx bx-data text-success"></i>;
    case "image":
    case "svg":
    case "png":
    case "gif":
    case "jpeg":
    case "jpg":
    case "heic":
      return <i className="bx bxs-file-image text-muted"></i>;
    case "text":
      return <i className="bx bxs-file-txt text-secondary"></i>;
    case "mp4":
      return <i className="bx bx-movie-play text-dark"></i>;
    case "mp3":
      return <i className="bx bxl-tiktok text-dark"></i>;
    case "zip":
    case "jar":
      return <i className="bx bxs-file-archive text-warning"></i>;
    case "xlxs":
    case "xlx":
      return <i className="bx bxs-spreadsheet text-success"></i>;
    case "bat":
    case "exe":
      return <i class="bx bxl-windows text-info"></i>;
    case "app":
      return <i class="bx bxl-apple text-dark"></i>;
    default:
      return <i className="bx bx-file-blank "></i>;
  }
};

export const formatFileSize = (sizeInBytes) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " B";
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  }
};
