import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ddjxvtqqp/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

const ImageUploader = () => {
    const handleChange = async (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            onSuccess(response.data, file);
            console.log('Image URL:', response.data.secure_url);
        } catch (error) {
            onError(error);
        }
    };

    return (
        <Upload customRequest={customRequest} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
    );
};

export default ImageUploader;
