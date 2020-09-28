import { message } from 'antd';

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message.error("Image must smaller than 5MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const CaptalizeFirst = (string) => {
  if (string) {
    string = string.toString();
    return string.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

export const RemoveHttpCom = (string) => {
  if (string === undefined || string === "" || string === null || string === " ") {
    return string;
  }
  const ols = string.replace(/^https?:\/\//, '');
  return ols;
}