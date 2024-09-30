import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import BackButton from './BackButton';
const KhateebSchedule = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);
    
    const storage = getStorage();
    const firestore = getFirestore();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const storageRef = ref(storage, `khateeb_schedule/${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            // Add a new document in Firestore with the image URL
            await addDoc(collection(firestore, 'khateeb_schedule'), {
                imageURL: url,
                uploadedAt: new Date()
            });
            setUploading(false);
            fetchImages(); // Refresh images after upload
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };

    const fetchImages = async () => {
        const imagesCollection = await getDocs(collection(firestore, 'khateeb_schedule'));
        const imagesList = imagesCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setImages(imagesList);
    };

    const handleDelete = async (id, imageURL) => {
        const imageRef = ref(storage, imageURL); // Reference to the image in storage
        try {
            // Delete image from Firebase Storage
            await deleteObject(imageRef);
            // Delete document from Firestore
            await deleteDoc(doc(firestore, 'khateeb_schedule', id));
            fetchImages(); // Refresh images after delete
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    useEffect(() => {
        fetchImages(); // Fetch images on component mount
    }, []);

    return (
        <div className='mt-2'> 
            <BackButton/>
        <div className="flex flex-col items-center mt-4">
            <h1 className="text-lg font-bold mb-4">Upload Khateeb Schedule</h1>
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm relative mx-4">
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button 
                onClick={handleUpload} 
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-bold">Uploaded Images</h2>
                <div className="flex flex-col gap-4 mt-4">
                    {images.map((image) => (
                        <div key={image.id} className="flex flex-col items-center">
                            <img src={image.imageURL} alt="Khateeb Schedule" className="mt-2 max-w-xs" />
                            <button 
                                onClick={() => handleDelete(image.id, image.imageURL)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default KhateebSchedule;
