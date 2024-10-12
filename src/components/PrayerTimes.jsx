import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase-config'; 
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


const PrayerTimes = () => {
    const [todayPrayerTimes, setTodayPrayerTimes] = useState(null);
    const [csvDownloadURL, setCsvDownloadURL] = useState('');
    const [khateebScheduleFile, setKhateebScheduleFile] = useState('');
    const [pdfs, setPdfs] = useState([]);


    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const pdfCollection = collection(db, 'prayer_pdfs'); // Your Firestore collection name
                const pdfSnapshot = await getDocs(pdfCollection);
                const pdfList = pdfSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPdfs(pdfList);
            } catch (error) {
                console.error("Error fetching PDFs:", error);
            }
        };

        fetchPdfs();
    }, []);

    const handleDownload = async (pdf) => {
        if (!pdf.url) {
            console.error("URL is not valid:", pdf.url);
            return;
        }

        try {
            const response = await fetch(pdf.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob(); // Create a blob from the response
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob); // Create a URL for the blob
            link.download = pdf.name; // Use the name from the PDF object
            document.body.appendChild(link);
            link.click(); // Programmatically click the link to trigger the download
            document.body.removeChild(link); // Remove the link from the DOM
        } catch (error) {
            console.error("Download error:", error);
        }
    };


    const fetchPrayerTimes = async () => {
        try {
            const storage = getStorage();
            const csvRef = ref(storage, 'prayer_times/'); // Reference to the folder

            // Get the latest file from Firebase Storage
            const fileList = await listAll(csvRef);
            if (fileList.items.length === 0) {
                console.error('No CSV files found in the prayer_times folder!');
                return;
            }

            // Get the latest file
            const latestFile = fileList.items[fileList.items.length - 1];
            const fileName = latestFile.name;

            const url = await getDownloadURL(latestFile);
            setCsvDownloadURL({ url, fileName });

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const text = await response.text();
            Papa.parse(text, {
                header: true,
                complete: (results) => {
                    // Log the entire parsed CSV data
                    console.log('Parsed CSV Data:', results.data);

                    const now = new Date();
                    const todayDate = now.getDate(); // Get the current date as a number

                    const todayTimes = results.data.find(time => {
                        const dateValue = time?.Date?.trim(); // Check if 'Date' exists
                        if (dateValue) {
                            const dayValue = parseInt(dateValue, 10); // Convert to integer
                            // Log the comparison for debugging
                            console.log(`Comparing CSV Date: ${dayValue} with Today's Date: ${todayDate}`);
                            return dayValue === todayDate; // Compare day of the month
                        }
                        return false;
                    });

                    if (todayTimes) {
                        // Log found prayer times for today
                        console.log('Found prayer times for today:', todayTimes);
                        setTodayPrayerTimes(todayTimes);
                    } else {
                        console.error(`No prayer times found for today's date: ${todayDate}`);
                    }
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
        } catch (error) {
            console.error('Error fetching prayer times:', error);
        }
    };

    useEffect(() => {
        fetchPrayerTimes(); // Fetch the latest CSV file
        fetchKhateebSchedule(); // Fetch the Khateeb schedule on component mount
    }, []);


    const createHTMLTable = (data) => {
        let table = '<table style="width:100%; border-collapse: collapse; margin: 20px 0;">';
        table += '<thead><tr>';

        if (data.length > 0) {
            Object.keys(data[0]).forEach(header => {
                table += `<th style="border: 1px solid #ddd; padding: 8px;">${header}</th>`;
            });
            table += '</tr></thead><tbody>';

            data.forEach(row => {
                table += '<tr>';
                Object.values(row).forEach(value => {
                    table += `<td style="border: 1px solid #ddd; padding: 8px;">${value}</td>`;
                });
                table += '</tr>';
            });
            table += '</tbody></table>';
        } else {
            table += '<tr><td>No data available</td></tr></tbody></table>';
        }

        return table;
    };

    const fetchKhateebSchedule = async () => {
        try {
            const db = getFirestore();
            const khateebCollection = collection(db, 'khateeb_schedule');
            const snapshot = await getDocs(khateebCollection);
    
            console.log('Documents found:', snapshot.docs.length); // Check document count
    
            if (snapshot.docs.length > 0) {
                // Loop through documents to find a valid file URL
                let validFileUrl = null;
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    console.log('Document data:', data); // Log the document data
                    if (data.fileURL) {
                        validFileUrl = data.fileURL; // Assign the first valid file URL found
                    }
                });
    
                if (validFileUrl) {
                    console.log('Fetched file URL:', validFileUrl); // Log the fetched URL
                    setKhateebScheduleFile(validFileUrl);
                } else {
                    console.warn('No valid file URL found in documents!');
                    setKhateebScheduleFile(null);
                }
            } else {
                console.warn('No documents found in khateeb_schedule!');
                setKhateebScheduleFile(null);
            }
        } catch (error) {
            console.error('Error fetching Khateeb schedule:', error);
        }
    };
    

    const openKhateebScheduleInNewTab = async () => {
        try {
            // Fetch the CSV file from the provided URL
            const response = await fetch(khateebScheduleFile); // Use the URL from your state
            const text = await response.text();
            const newTab = window.open('', '_blank'); // Open a new tab
    
            if (newTab) {
                const parsedData = Papa.parse(text, { header: true }); // Parse CSV data
                const csvTable = createHTMLTable(parsedData.data); // Create HTML table from parsed data
    
                // Write the HTML content to the new tab without the download link
                newTab.document.write(`
                    <html>
                        <head>
                            <title>Khateeb Schedule</title>
                            <style>
                                body { font-family: Arial, sans-serif; }
                                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                                th, td { border: 1px solid #ddd; padding: 8px; }
                                th { background-color: #f2f2f2; }
                            </style>
                        </head>
                        <body>
                            <h1>Khateeb Schedule</h1>
                            ${csvTable}
                        </body>
                    </html>
                `);
                newTab.document.close(); // Close the document for rendering
            }
        } catch (error) {
            console.error('Error opening Khateeb schedule in new tab:', error);
        }
    };
    
   

    return (
        <div className="flex flex-col w-[400] h-auto  bg-mediumseagreen-300 mt-6 sm:mt-8 md:mt-10 text-white rounded-xl py-4 px-4 sm:px-6 relative">
            <div className="text-center">
                <div className="flex items-center justify-between mt-8 mb-4">
                    <div>
                        {/* for spacing */}
                    </div>
                    <button className="bg-white text-mediumseagreen-300  item-center font-bold py-2 px-4 rounded-full">
                        Prayer Times
                    </button>
                    {pdfs.map(pdf => (
                    <li key={pdf.id} className="mb-2 flex items-center">
                       
                        <a onClick={() => handleDownload(pdf)}>
                            <FontAwesomeIcon icon={faCalendar} className="text-white" />
                        </a>
                    </li>
                ))}
                    {/* {csvDownloadURL && (
                        <a
                            onClick={openCSVInNewTab}
                            className=" cursor-pointer"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faCalendar} className="text-white" />
                        </a>
                    )} */}
                </div>
            </div>

            <div className="grid grid-cols-3 mt-4 mb-4 text-lg">
                <span></span>
                <span className="font-bold text-center">Adhan</span>
                <span className="font-bold text-center">Iqamah</span>
            </div>
            {todayPrayerTimes ? (
                <div className="flex flex-col gap-2 text-left">
                    {[
                        { name: 'Fajr', icon: '/sunrise@2x.png' },
                        { name: 'Duhr', icon: '/sunrise-1@2x.png' },
                        { name: 'Asr', icon: '/sun@2x.png' },
                        { name: 'Maghrib', icon: '/sun@2x.png' },
                        { name: 'Isha', icon: '/sunrise@2x.png' }
                    ].map((prayer, index) => (
                        <div key={index} className="grid grid-cols-3 items-center mb-2">
                            <div className="flex items-center gap-2">
                                <img src={prayer.icon} alt={`${prayer.name} Icon`} className="h-6 w-6" />
                                <span className="font-bold text-base">{prayer.name}</span>
                            </div>
                            <span className="text-base text-center">{todayPrayerTimes[prayer.name]}</span>
                            <span className="text-base text-center">{todayPrayerTimes[`${prayer.name} Iqama`]}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading prayer times...</p>
            )}




            <div className="mt-6 mb-0 text-center">
                <button onClick={openKhateebScheduleInNewTab} className="text-white font-bold border-b-2 border-white">
                    Khateeb Schedule
                </button>
            </div>
        </div>
    );
};

export default PrayerTimes;
