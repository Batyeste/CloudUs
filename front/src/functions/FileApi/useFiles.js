import { useState, useEffect } from "react";
import { getFiles } from "./getFiles";

const linkAPI = "http://localhost:8000/uploads";

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const result = await getFiles();
        if (result.error) {
          setError(result.error.message);
        } else {
          const filesWithUrls = result.map((file) => {
            return {
              ...file,
              imageUrl: `${linkAPI}/${file.name}`,
            };
          });
          setFiles(filesWithUrls);
        }
      } catch (error) {
        setError("Une erreur est survenue lors du chargement des fichiers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []); 

  return { files, error, isLoading };
};
