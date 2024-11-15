import React, { useEffect, useState } from "react";
import { getFiles } from "../../functions/FileApi/getFiles";
import "./GetFiles.css";

const GetFiles = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const result = await getFiles();
      if (result.error) {
        setError(result.error.message);
      } else {
        setFiles(result);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="get-files">
      <h2>Mes Fichiers</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetFiles;