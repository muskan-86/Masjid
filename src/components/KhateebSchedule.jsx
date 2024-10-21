// KhateebSchedule.js

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const KhateebSchedule = () => {
    const [khateebData, setKhateebData] = useState([]);

    useEffect(() => {
        const fetchKhateebSchedule = async () => {
            try {
                const db = getFirestore();
                const khateebCollection = collection(db, 'khateeb_schedule');
                const snapshot = await getDocs(khateebCollection);
        
                console.log('Documents found:', snapshot.docs.length);
                
                if (snapshot.docs.length > 0) {
                    const data = [];
                    for (const doc of snapshot.docs) {
                        const fileURL = doc.data().fileURL;
                        console.log('File URL:', fileURL);
                        const response = await fetch(fileURL);
                        if (!response.ok) {
                            console.error(`Failed to fetch file: ${fileURL}`);
                            continue; // Skip this iteration if the fetch fails
                        }
                        const text = await response.text();
                        const parsedData = Papa.parse(text, { header: true });
                        console.log('Parsed Data:', parsedData.data); // Log parsed data
                        data.push(...parsedData.data);
                    }
                    setKhateebData(data);
                } else {
                    console.warn('No documents found in khateeb_schedule!');
                }
            } catch (error) {
                console.error('Error fetching Khateeb schedule:', error);
            }
        };
        

        fetchKhateebSchedule();
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

    return (
        <div>
            <h1 className="text-4xl"><strong>Khateeb Schedule</strong></h1>
            <div dangerouslySetInnerHTML={{ __html: createHTMLTable(khateebData) }} />
        </div>
    );
};

export default KhateebSchedule;
