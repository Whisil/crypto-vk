import { useCallback, useState } from 'react';

type MediaURLs = {
  [inputName: string]: string;
};

const useMediaBlob = () => {
  const [mediaURLs, setMediaURLs] = useState<MediaURLs | null>(null);

  // const handleFileChange = (
  //   inputName: string,
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const target = e.target as HTMLInputElement;
  //   if (target.files && target.files[0]) {
  //     const reader = new FileReader();

  //     reader.onload = function (event) {
  //       if (event.target && typeof event.target.result === `string`) {
  //         setMediaURL((prevMediaURLs) => ({
  //           ...prevMediaURLs,
  //           [inputName]: event.target.result,
  //         }));
  //       }
  //     };

  //     reader.readAsDataURL(target.files[0]);
  //   }
  // };

  const handleFileChange = (
    inputName: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMediaURLs((prevMediaURLs) => ({
        ...prevMediaURLs,
        [inputName]: fileURL,
      }));
    }
  };

  // const handleClose = async (ref: React.RefObject<HTMLInputElement>) => {
  //   URL.revokeObjectURL(mediaURLs);
  //   setMediaURLs(null);
  //   if (ref.current) {
  //     ref.current.value = ``;
  //   }
  // };

  return { mediaURLs, handleFileChange };
};

export default useMediaBlob;
