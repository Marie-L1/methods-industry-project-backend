import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const publicUrl = `http://localhost:${port}`;

const replaceImageUrl = (url) => {
    return url.replace("http://localhost:8080", publicUrl);
};

export { replaceImageUrl };