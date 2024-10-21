import emailjs from '@emailjs/browser';

const serviceID = 'service_wwzqzvj'; // Replace with your EmailJS service ID
const templateID = 'template_yi9sahq'; // Replace with your EmailJS template ID
const publicKey = '64xcDCktgizfsoLbY'; // Replace with your EmailJS public key

const sendEventNotification = (contactEmail, eventData, status, reason = "") => {
    console.log("Preparing to send email...");
    console.log("To:", contactEmail);
    console.log("Event Data:", eventData);
    console.log("Status:", status);

    let message;
    let recipientEmail = contactEmail; // Default recipient

    // Construct message and recipient based on event status
    if (status === "approved") {
        message = `We are happy to inform you that your event request has been approved!`;
    } else if (status === "pending") {
        message = `A new event has been registered.`;
        recipientEmail = 'bilalmasjid499@gmail.com'; // Change recipient to self for pending events
    } else {
        message = `We hope this message finds you in good health and faith. Unfortunately,
        we are unable to accommodate your event request due to ${reason}. Should you wish to reschedule,
        please refer to the mosque calendar for available dates. We appreciate your understanding 
        and efforts in serving the community. May Allah reward you.`;
    }

    // Template parameters for email
    const templateParams = {
        to_email: recipientEmail, // Send to the updated recipient
        from_email: 'bilalmasjid499@gmail.com', // Admin email
        reply_to: contactEmail, // User's email for replies (if needed)
        contactName: eventData.contactName || "", // Fallback if not defined
        event_title: eventData.title || "", // Fallback if not defined
        event_date: eventData.date || "", // Fallback if not defined
        event_start_time: eventData.startTime || "", // Fallback if not defined
        event_end_time: eventData.endTime || "", // Fallback if not defined
        event_description: eventData.description || "", // Fallback if not defined
        event_status: status || "", // Fallback if not defined
        denial_reason: reason || "", // Denial reason (optional)
        message: message, // Email message content
    };

    console.log('Template Parameters:', templateParams); // Inspect template params

    // Send email using emailjs
    return emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
        })
        .catch(error => {
            console.error('FAILED...', error);
        });
};

export { sendEventNotification };
