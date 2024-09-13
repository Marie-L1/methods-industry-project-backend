import streaming from "../data/streaming.json" assert { type: 'json' };
import themepack from "../data/themepack.json" assert { type: 'json' };


// get all unique genres from the json file
const getGenre = () => {
    const genres = new Set();
    themepack.packages.forEach(pack => {
        pack.channels.forEach(channel => 
            genres.add(channel.genre)
        );
    });
    return Array.from(genres);
};

// get them packages based on the selected genre
const getPackByGenre = (genre) => {
    return themepack.packages.filter(pack => 
        pack.channels.some(channel => 
            channel.genre === genre)
    );
};

// get streaming service based on the theme package's topic 
const getServiceByTopic = (topic) => {
    return streaming.streamingServices.filter(service => 
        service.topics.includes(topic)
    );
};

// export functions for all other files
export {
    getGenre,
    getPackByGenre,
    getServiceByTopic
};



// OLD CODE - CAN DELETE IF THE NEW CODE ABOVE IS WHAT WE ARE DOING
// const themePackToService = {
//     "Primetime": "Netflix",
//     "Living": "Apple TV+",
//     "Sportsnet & Beyond": "WWE Network HD",
//     "TSN & Beyond": "Crave",
//     "Blockbusters": "Netflix",
//     "World & Beyond": "Disney+ Premium",
//     "Lifestyle & Beyond": "Amazon Prime",
//     "Explore": "Apple TV+",
//     "Time Shift": "Abu Dhabi TV",
//     "Laughs and Cheers": "Netflix",
//     "Amazon Prime": "Amazon Prime"
// };

// // default streaming service if no majority choice
// const default_streaming_service = "Netflix";

// /**
//  * get recommendations based on the theme pack
//  * @param {string} theme_pack - the selected theme pack
//  * @param {number} age - the age of the user
//  * @param {string} genre - the preferred genre
//  * @returns {Object} - recommendations for streaming services and theme packs
//  */
// const getRecommendation = (theme_pack, age, genre) => {
//     // if no theme packs are provided, return the default
//     if (!theme_pack || !age || !genre){
//         return{
//             streaming_service: [default_streaming_service],
//             theme_pack: []
//         };
//     }

//     const serviceName = themePackToService[theme_pack] || default_streaming_service;

//     // filter based on age and genre
//     let filteredServices = [];
//     if (age < 18) {
//         filteredServices = ["Disney+ Premium", "Apple TV+", "Netflix"];
//     } else if (age >= 18) {
//         if (genre === "Drama") {
//             filteredServices = ["Netflix", "Amazon Prime", "Crave"];
//         } else if (genre === "Lifestyle" || genre === "Food" || genre === "DIY") {
//             filteredServices = ["Netflix", "Amazon Prime"];
//         } else if (genre === "Sports") {
//             filteredServices = ["WWE Network HD"];
//         } else if (genre === "Movies") {
//             filteredServices = ["Netflix", "Amazon Prime", "Crave"];
//         } else if (genre === "Science" || genre === "History" || genre === "Discovery" || genre === "Nature") {
//             filteredServices = ["Disney+ Premium", "Apple TV+"];
//         } else if (genre === "Entertainment" || genre === "Reality") {
//             filteredServices = ["Netflix", "Amazon Prime", "Crave"];
//         } else if (genre === "Regional") {
//             filteredServices = ["Abu Dhabi TV"];
//         } else if (genre === "Comedy") {
//             filteredServices = ["Netflix"];
//         } else {
//             filteredServices = [serviceName];
//         }
//     } else {
//         filteredServices = [serviceName];
//     }

//     // final recommendation based on filtered services
//     const finalService = filteredServices.length > 0 ? filteredServices[0] : serviceName;

//     return {
//         streaming_services: [],
//         theme_packs: [],
//         streaming_services: [finalService],
//         theme_packs:[]
//     };
// };
