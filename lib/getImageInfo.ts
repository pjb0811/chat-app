declare global {
  interface Window {
    FileReader: any;
  }
}

/**
 * 이미지 파일 정보 가져오기
 * @param file 파일 객체
 * @desc FileReader 객체를 활용하여 파일명, 타입, base64 정보 비동기 요청
 */
const getImageInfo = (file: File) => {
  const reader = new window.FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onerror = (error: {}) => {
      reader.abort();
      reject(error);
    };

    reader.onload = () => {
      resolve({
        name: file.name,
        base64: reader.result.toString().split(',')[1]
      });
    };
  });
};

export default getImageInfo;
