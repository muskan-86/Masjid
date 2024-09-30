import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'; 
import BackButton from './BackButton';

const PrayerTimeUploader = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // State to track upload status

    useEffect(() => {
        fetchUploadedFiles(); // Fetch uploaded files on component mount
    }, []);

    const fetchUploadedFiles = async () => {
        const filesRef = ref(storage, 'prayer_times/');
        try {
            const fileList = await listAll(filesRef); 
            const files = await Promise.all(fileList.items.map(async (item) => ({
                name: item.name,
                url: await getDownloadURL(item),
                fullPath: item.fullPath,
            })));
            setUploadedFiles(files); 
        } catch (error) {
            console.error('Error fetching uploaded files: ', error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (uploadedFiles.length > 0) {
                setMessage('You can only upload one file. Please delete the existing file before uploading another.');
                setFile(null); // Clear file selection if a file already exists
            } else {
                setFile(selectedFile);
                setMessage('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true); // Start the upload process
        setMessage(''); // Clear any previous messages

        const storageRef = ref(storage, `prayer_times/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target.result;
                const prayerTimes = parseCSV(text);
                await uploadPrayerTimes(prayerTimes);
                fetchUploadedFiles(); 
                setMessage('Prayer times uploaded successfully!');
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error uploading file: ', error);
            setMessage('Error uploading file.');
        } finally {
            setIsUploading(false); // Stop showing the "Uploading..." message
            setFile(null); // Clear the file selection after upload
        }
    };

    const parseCSV = (data) => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const result = rows.map(row => {
            const columns = row.split(',').map(col => col.trim());
            if (columns.length < 13) {
                console.error('Invalid row:', row);
                return null;
            }
            return {
                date: columns[0],
                sunrise: columns[1],
                fajr: columns[2],
                fajrIqamah: columns[3],
                dhuhr: columns[4],
                dhuhrIqamah: columns[5],
                asr: columns[6],
                asrIqamah: columns[7],
                maghrib: columns[8],
                maghribIqamah: columns[9],
                isha: columns[10],
                ishaIqamah: columns[11],
                islamicDate: columns[12],
            };
        }).filter(item => item !== null);
        return result;
    };

    const uploadPrayerTimes = async (prayerTimes) => {
        const prayerTimesCollection = collection(db, 'prayer_times');
        try {
            for (const time of prayerTimes) {
                await addDoc(prayerTimesCollection, time);
            }
        } catch (error) {
            console.error('Error uploading prayer times: ', error);
            setMessage('Error uploading prayer times.');
        }
    };

    const handleDelete = async (filePath) => {
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
            setMessage('File deleted successfully.');
            fetchUploadedFiles();
        } catch (error) {
            console.error('Error deleting file: ', error);
            setMessage('Error deleting file.');
        }
    };

    return (
        <div className='mt-4'>
            <BackButton/>
        
            <div className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">Upload Prayer Times</h1>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md mb-6">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="w-full mb-4 border rounded"
                        disabled={uploadedFiles.length > 0 || isUploading} // Disable input if a file is already uploaded or during upload
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        disabled={!file || uploadedFiles.length > 0 || isUploading} // Disable button if no file selected, already uploaded, or during upload
                    >
                        {isUploading ? 'Uploading...' : 'Upload'} {/* Show "Uploading..." during upload */}
                    </button>
                </form>
                {message && <p className={`mt-2 ${isUploading ? 'text-yellow-500' : 'text-green-500'}`}>{message}</p>} {/* Display the message in yellow when uploading */}

                <h2 className="text-xl font-bold mt-6">Uploaded Files</h2>
                <ul className="mt-4">
                    {uploadedFiles.map((file) => (
                        <li key={file.name} className="flex items-center justify-between p-2 gap-16 ">
                            <span>{file.name}</span>
                            <div className="flex gap-4">
                                <a href={file.url} className="text-blue-500" download>
                                    Download
                                </a>
                                <button 
                                    onClick={() => handleDelete(file.fullPath)} 
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrayerTimeUploader;
