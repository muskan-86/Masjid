import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import BackButton from './BackButton';

const KhateebSchedule = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const storage = getStorage();
    const firestore = getFirestore();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
        } else {
            alert("Please upload a valid CSV file.");
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const storageRef = ref(storage, `khateeb_schedule/${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            // Add a new document in Firestore with the CSV file URL
            const docRef = await addDoc(collection(firestore, 'khateeb_schedule'), {
                fileURL: url,
                uploadedAt: new Date(),
                fileName: file.name
            });
            setUploadedFile({ id: docRef.id, fileURL: url, fileName: file.name });
            setFile(null); // Clear the file after upload
            setUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };

    const handleDelete = async (id, fileURL) => {
        const fileRef = ref(storage, fileURL); // Reference to the file in storage
        try {
            // Delete the file from Firebase Storage
            await deleteObject(fileRef);
            // Delete the document from Firestore
            await deleteDoc(doc(firestore, 'khateeb_schedule', id));
            setUploadedFile(null); // Clear uploaded file state
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    useEffect(() => {
        const fetchUploadedFile = async () => {
            const filesCollection = await getDocs(collection(firestore, 'khateeb_schedule'));
            const filesList = filesCollection.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            if (filesList.length > 0) {
                setUploadedFile(filesList[0]); // Assume only one file is allowed
            }
        };

        fetchUploadedFile(); // Fetch uploaded file on component mount
    }, []);

    return (
        <div className='mt-2'>
            <BackButton />
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-lg font-bold mb-4">Upload Khateeb Schedule (CSV)</h1>
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm relative mx-4">
                    {/* Always show the file input, but disable it if a file is uploaded */}
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="mb-4"
                        disabled={uploadedFile !== null}
                    />
                    <button
                        onClick={handleUpload}
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        disabled={uploading || !file || uploadedFile !== null}
                    >
                        {uploading ? 'Uploading...' : 'Upload CSV'}
                    </button>
                </div>

                {/* Show uploaded file details and delete button */}
                {uploadedFile && (
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">Uploaded CSV File</h2>
                        <div className="flex items-center mt-2"> {/* Change flex-col to flex */}
                            <p className="mr-4">{uploadedFile.fileName}</p> {/* Add margin to the right */}
                            <button
                                onClick={() => handleDelete(uploadedFile.id, uploadedFile.fileURL)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default KhateebSchedule;
