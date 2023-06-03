import { useEffect, useState } from 'react';

type MediaURLs = {
  [inputName: string]: string;
};

const useMediaBlob = () => {
  const [mediaURLs, setMediaURLs] = useState<MediaURLs | null>(null);

  const handleFileChange = (
    inputName: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      if (mediaURLs && mediaURLs[inputName]) {
        URL.revokeObjectURL(mediaURLs[inputName]);
      }
      const fileURL = URL.createObjectURL(file);
      setMediaURLs((prevMediaURLs) => ({
        ...prevMediaURLs,
        [inputName]: fileURL,
      }));
    }
  };

  const handleClose = async (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = ``;
    }
    if (mediaURLs && ref.current && mediaURLs[ref.current.name]) {
      URL.revokeObjectURL(mediaURLs[ref.current.name]);
    }
    setMediaURLs(null);
  };

  useEffect(() => {
    return () => {
      mediaURLs &&
        Object.values(mediaURLs).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaURLs]);

  return { mediaURLs, handleFileChange, handleClose };
};

export default useMediaBlob;
