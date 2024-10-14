import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.pgn')) {
      onFileUpload(file);
    } else {
      alert('Please upload a valid .pgn file');
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="file-upload" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
        <Upload className="mr-2 h-5 w-5" />
        Upload PGN File
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        accept=".pgn"
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;