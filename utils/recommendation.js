const themePackToService = {
    "Primetime": "Netflix",
    "Living": "Apple TV+",
    "Sportsnet & Beyond": "WWE Network HD",
    "TSN & Beyond": "Crave",
    "Blockbusters": "Netflix",
    "World & Beyond": "Disney+ Premium",
    "Lifestyle & Beyond": "Amazon Prime",
    "Explore": "Apple TV+",
    "Time Shift": "Abu Dhabi TV",
    "Laughs and Cheers": "Netflix",
    "Amazon Prime": "Amazon Prime"
};

// default streaming service if no majority choice
const default_streaming_service = "Netflix";

/**
 * Get recommendations based on the theme pack
 * @param {Array<string>} theme_packs - the list of theme packs
 * @returns {Object} - recommendations for streaming services and theme packs
 */
const getRecommendation = (theme_packs) => {
    // if no theme packs are provided, return the default
    if (theme_packs.length === 0){
        return{
            streaming_service: [default_streaming_service],
            theme_packs: []
        };
    }
    
    // count each choice of theme pack
    const countPacks = theme_packs.reduce((counts, pack) => {
        counts[pack] = (counts[pack] || 0) + 1; // increment count for each theme pack
        return counts;
    }, {});

    // find the most picked theme pack in the family (most popluar)
    const mostPopular = Object.keys(countPacks).reduce((a, b) => countPacks[a] > countPacks[b] ? a : b);

    // determing the streaming service recommendation
    const serviceRec = themePackToService[mostPopular] || default_streaming_service;
    

    return {
        streaming_services: [serviceRec],
        theme_packs:[mostPopular]
    };
};

export { getRecommendation };