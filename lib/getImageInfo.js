const getImageInfo = async file => {
  const reader = new window.FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onerror = error => {
      reader.abort();
      reject(error);
    };

    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        base64: reader.result.toString().split(',')[1]
      });
    };
  });
};

export default getImageInfo;
