const ytAPIKey = String(import.meta.env.VITE_YTAPI_KEY)
const valueConverter = (value) => {
    if(value>=1000000) {
        return (Math.trunc((value/1000000)*10))/10 +'M'
    } else if(value>=1000) {
        return Math.floor(value/1000)+'K'
    } else {
        return  value;
    }
}
// Math.floor(value/1000000)
const splitDuration = (duration) => {
    let hoursPart = "", minutesPart = "", secondsPart = "";

    // Extract hours
    if (duration.includes("H")) {
        hoursPart = duration.split("H")[0].split("PT")[1] + ":"; // Get hours after "PT"
        if(hoursPart<10) {
            hoursPart = "0" + hoursPart;
        }
    }

    // Extract minutes
    if (duration.includes("M")) {
        const afterHours = duration.includes("H") ? duration.split("H")[1] : duration.split("PT")[1];
        minutesPart = afterHours.split("M")[0] + ":"; // Get minutes before "M"
        if(minutesPart<10) {
            minutesPart = "0" + minutesPart;
        }
    }

    // Extract seconds
    if (duration.includes("S")) {
        const afterMinutes = duration.includes("M") ? duration.split("M")[1] : duration.split("PT")[1];
        secondsPart = afterMinutes.split("S")[0];
        if(secondsPart<10) {
            secondsPart = "0" + secondsPart;
        } // Get seconds before "S"
    }
    // console.log(hoursPart, ":", minutesPart, ":", secondsPart)
    return (`${hoursPart}${minutesPart}${secondsPart}`);
}


//Search Functionality
// api.js

const fetchVideosByTitle = async (query, pageToken = '') => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${ytAPIKey}&maxResults=10&pageToken=${pageToken}`
        );
        const data = await response.json();
        return {
            items: data.items || [],
            nextPageToken: data.nextPageToken || null,
        };
    } catch (error) {
        console.error("Error fetching videos:", error);
        return { items: [], nextPageToken: null };
    }
};



export {ytAPIKey, valueConverter, splitDuration, fetchVideosByTitle}


