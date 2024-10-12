import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'; 
import BackButton from './BackButton';

const PrayerTimeUploader = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadedCsvFiles, setUploadedCsvFiles] = useState([]);
    const [uploadedPdfFiles, setUploadedPdfFiles] = useState([]);
    const [isUploadingCsv, setIsUploadingCsv] = useState(false); 
    const [isUploadingPdf, setIsUploadingPdf] = useState(false); 

    useEffect(() => {
        fetchUploadedCsvFiles(); // Fetch uploaded CSV files on component mount
        fetchUploadedPdfFiles(); // Fetch uploaded PDF files on component mount
    }, []);

    // Fetch uploaded CSV files from Firebase Storage
    const fetchUploadedCsvFiles = async () => {
        const filesRef = ref(storage, 'prayer_times/');
        try {
            const fileList = await listAll(filesRef); 
            const files = await Promise.all(fileList.items.map(async (item) => ({
                name: item.name,
                url: await getDownloadURL(item),
                fullPath: item.fullPath,
            })));
            setUploadedCsvFiles(files); 
        } catch (error) {
            console.error('Error fetching uploaded CSV files: ', error);
        }
    };

    // Fetch uploaded PDF files from Firebase Storage
    const fetchUploadedPdfFiles = async () => {
        const pdfRef = ref(storage, 'prayer_pdfs/');
        try {
            const pdfList = await listAll(pdfRef);
            const files = await Promise.all(pdfList.items.map(async (item) => ({
                name: item.name,
                url: await getDownloadURL(item),
                fullPath: item.fullPath,
            })));
            setUploadedPdfFiles(files); 
        } catch (error) {
            console.error('Error fetching uploaded PDF files: ', error);
        }
    };

    // Handle CSV file selection
    const handleCsvFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (uploadedCsvFiles.length > 0) {
                setMessage('You can only upload one CSV files. Please delete the existing file before uploading another.');
                setCsvFile(null);
            } else {
                setCsvFile(selectedFile);
                setMessage('');
            }
        }
    };

    // Handle PDF file selection
    const handlePdfFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (uploadedPdfFiles.length > 0) {
                setMessage('You can only upload one PDF files. Please delete the existing file before uploading another.');
                setPdfFile(null);
            } else {
                setPdfFile(selectedFile);
                setMessage('');
            }
        }
    };

    // Handle CSV file upload
    const handleCsvSubmit = async (e) => {
        e.preventDefault();
        if (!csvFile) return;

        setIsUploadingCsv(true); // Start the upload process
        setMessage(''); // Clear any previous messages

        const storageRef = ref(storage, `prayer_times/${csvFile.name}`);
        try {
            await uploadBytes(storageRef, csvFile);
            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target.result;
                const prayerTimes = parseCSV(text);
                await uploadPrayerTimes(prayerTimes);
                fetchUploadedCsvFiles(); 
                setMessage('Prayer times uploaded successfully!');
            };
            reader.readAsText(csvFile);
        } catch (error) {
            console.error('Error uploading CSV file: ', error);
            setMessage('Error uploading CSV file.');
        } finally {
            setIsUploadingCsv(false);
            setCsvFile(null);
        }
    };

    // Handle PDF file upload
    const handlePdfSubmit = async (e) => {
        e.preventDefault();
        if (!pdfFile) return;

        setIsUploadingPdf(true); // Start the upload process
        setMessage(''); // Clear any previous messages

        const storageRef = ref(storage, `prayer_pdfs/${pdfFile.name}`);
        try {
            await uploadBytes(storageRef, pdfFile);
            const url = await getDownloadURL(storageRef);
            const docRef = await addDoc(collection(db, 'prayer_pdfs'), { name: pdfFile.name, url });
            console.log('PDF Document written with ID: ', docRef.id); // Log document ID
            fetchUploadedPdfFiles(); 
            setMessage('PDF uploaded successfully!');
        } catch (error) {
            console.error('Error uploading PDF file: ', error);
            setMessage('Error uploading PDF file.');
        } finally {
            setIsUploadingPdf(false);
            setPdfFile(null);
        }
    };

    // Parse CSV data
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

    // Upload prayer times to Firestore
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

    // Handle file deletion
    const handleDelete = async (filePath, type) => {
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
            setMessage('File deleted successfully.');
            if (type === 'csv') {
                fetchUploadedCsvFiles();
            } else {
                fetchUploadedPdfFiles();
            }
        } catch (error) {
            console.error('Error deleting file: ', error);
            setMessage('Error deleting file.');
        }
    };

    return (
        <div className='mt-4'>
            <BackButton />
            <div className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">Upload Prayer Times and PDFs</h1>
                
                {/* CSV Upload Form */}
                <form onSubmit={handleCsvSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md mb-6">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvFileChange}
                        className="w-full mb-4 border rounded"
                        disabled={uploadedCsvFiles.length > 0 || isUploadingCsv} // Disable input if a file is already uploaded or during upload
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        disabled={!csvFile || uploadedCsvFiles.length > 0 || isUploadingCsv} // Disable button if no file selected, already uploaded, or during upload
                    >
                        {isUploadingCsv ? 'Uploading...' : 'Upload CSV'}
                    </button>
                </form>

                {/* PDF Upload Form */}
                <form onSubmit={handlePdfSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md mb-6">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfFileChange}
                        className="w-full mb-4 border rounded"
                        disabled={uploadedPdfFiles.length > 0 || isUploadingPdf} // Disable input during upload
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        disabled={!pdfFile || uploadedPdfFiles.length > 0 || isUploadingPdf} // Disable button if no file selected or during upload
                    >
                        {isUploadingPdf ? 'Uploading...' : 'Upload PDF'}
                    </button>
                </form>

                {message && <p className={`mt-2 ${isUploadingCsv || isUploadingPdf ? 'text-yellow-500' : 'text-green-500'}`}>{message}</p>} {/* Display the message in yellow when uploading */}

                <h2 className="text-xl font-bold mt-6">Uploaded CSV Files</h2>
                <ul className="mt-4">
                    {uploadedCsvFiles.map((file) => (
                        <li key={file.name} className="flex items-center justify-between p-2 gap-8">
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {file.name}
                            </a>
                            <button onClick={() => handleDelete(file.fullPath, 'csv')} className="text-red-500 hover:underline">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                <h2 className="text-xl font-bold mt-6">Uploaded PDF Files</h2>
                <ul className="mt-4">
                    {uploadedPdfFiles.map((file) => (
                        <li key={file.name} className="flex items-center justify-between p-2 gap-8">
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {file.name}
                            </a>
                            <button onClick={() => handleDelete(file.fullPath, 'pdf')} className="text-red-500 hover:underline">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrayerTimeUploader;
