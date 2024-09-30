import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';

const PrayerTimes = () => {
    const [todayPrayerTimes, setTodayPrayerTimes] = useState(null);
    const [csvDownloadURL, setCsvDownloadURL] = useState('');
    const [khateebScheduleImage, setKhateebScheduleImage] = useState('');

    const fetchPrayerTimes = async () => {
        try {
            const storage = getStorage();
            const csvRef = ref(storage, 'prayer_times/prayerschedule.csv');

            const url = await getDownloadURL(csvRef);
            setCsvDownloadURL(url);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const text = await response.text();
            Papa.parse(text, {
                header: true,
                complete: (results) => {
                    const now = new Date();
                    const todayDate = now.getDate();

                    const todayTimes = results.data.find(time => {
                        const dateValue = time.Date.trim();
                        return parseInt(dateValue) === todayDate;
                    });

                    setTodayPrayerTimes(todayTimes);
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
        fetchPrayerTimes();
        fetchKhateebSchedule(); // Fetch the Khateeb schedule on component mount
    }, []);

    const openCSVInNewTab = async () => {
        try {
            const response = await fetch(csvDownloadURL);
            const text = await response.text();
            const newTab = window.open('', '_blank');

            if (newTab) {
                const downloadLink = `<a href="${csvDownloadURL}" download="prayerschedule.csv" style=" padding: 10px; margin-bottom:4px; background-color: #4CAF50; color: white; text-decoration: none; text-align: center; border-radius: 5px;">Download</a>`;
                const parsedData = Papa.parse(text, { header: true });
                const csvTable = createHTMLTable(parsedData.data);

                newTab.document.write(`
                    <html>
                        <head>
                            <title>Prayer Schedule</title>
                        </head>
                        <body>
                            <h1>Prayer Schedule</h1>
                            ${csvTable}
                            ${downloadLink}
                        </body>
                    </html>
                `);
                newTab.document.close();
            }
        } catch (error) {
            console.error('Error opening CSV in new tab:', error);
        }
    };

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
            const latestDoc = snapshot.docs[snapshot.docs.length - 1]; // Get the last document added
            if (latestDoc) {
                const imageUrl = latestDoc.data().imageURL; // Ensure 'imageURL' exists in Firestore
                setKhateebScheduleImage(imageUrl);
            } else {
                console.error('No documents found in khateeb_schedule!');
            }
        } catch (error) {
            console.error('Error fetching Khateeb schedule:', error);
        }
    };

    const openKhateebScheduleInNewTab = () => {
        if (khateebScheduleImage) {
            const newTab = window.open('', '_blank');
            if (newTab) {
                newTab.document.write(`
                    <html>
                        <head>
                            <title>Khateeb Schedule</title>
                        </head>
                        <body>
                            <h1>Khateeb Schedule</h1>
                            <img src="${khateebScheduleImage}" alt="Khateeb Schedule" style="max-width: 100%; height: auto;"/>
                        </body>
                    </html>
                `);
                newTab.document.close();
            }
        }
    };

    return (
        <div className="flex flex-col w-[400] h-auto  bg-mediumseagreen-300 mt-6 sm:mt-8 md:mt-10 text-white rounded-xl py-4 px-4 sm:px-6 md:py-28 md:px-16 relative">
            <div className="text-center">
                <div className="flex items-center justify-between mt-8 mb-4">
                    <div></div>
                    <button className="bg-white text-mediumseagreen-300  item-center font-bold py-2 px-4 rounded-full">
                        Prayer Times
                    </button>
                    {csvDownloadURL && (
                        <a
                            onClick={openCSVInNewTab}
                            className=" cursor-pointer"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faCalendar} className="text-white" />
                        </a>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 mt-4 mb-4 text-lg">
                <span></span>
                <span className="font-bold text-center">Adhan</span>
                <span className="font-bold text-center">Iqamah</span>
            </div>

            {todayPrayerTimes ? (
                <div className="flex flex-col gap-2 text-left">
                    {[{ name: 'Fajr', icon: './public/sunrise@2x.png', adhan: 'Fajr Adhan', iqamah: 'Fajr Iqamah' }, { name: 'Dhuhr', icon: './public/sunrise-1@2x.png', adhan: 'Zuhur Adhan', iqamah: 'Zuhur Iqamah' }, { name: 'Asr', icon: './public/sun@2x.png', adhan: 'Asr Adhan', iqamah: 'Asr Iqamah' }, { name: 'Maghrib', icon: './public/sun@2x.png', adhan: 'Maghrib Adhan', iqamah: 'Maghrib Iqamah' }, { name: 'Isha', icon: './public/sunrise@2x.png', adhan: 'Isha Adhan', iqamah: 'Isha Iqamah' }].map((prayer, index) => (
                        <div key={index} className="grid grid-cols-3 items-center mb-2">
                            <div className="flex items-center gap-2">
                                <img src={prayer.icon} alt={`${prayer.name} Icon`} className="h-6 w-6" />
                                <span className="font-bold text-base">{prayer.name}</span>
                            </div>
                            <span className="text-base text-center">{todayPrayerTimes[prayer.adhan]}</span>
                            <span className="text-base text-center">{todayPrayerTimes[prayer.iqamah]}</span>
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
