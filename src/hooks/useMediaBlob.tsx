import { useState } from 'react';

const useMediaBlob = () => {
  const [mediaURL, setMediaURL] = useState<string>(``);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        if (event.target && typeof event.target.result === `string`) {
          setMediaURL(event.target.result);
        }
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleClose = async (ref: React.RefObject<HTMLInputElement>) => {
    URL.revokeObjectURL(mediaURL);
    setMediaURL(``);
    if (ref.current) {
      ref.current.value = ``;
    }
  };

  return { mediaURL, handleFileChange, handleClose };
};

export default useMediaBlob;
