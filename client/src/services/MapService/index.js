import Geocode from "react-geocode";

/**
 * Contains commons methods for interfacing with the google maps
 * API.
 */
var MapService = {
  /**
   * Converts an address into a location with latitude and longitude
   * coordinates.
   * 
   * @param value - The address to lookup
   * 
   * @returns location: { lat: number, lng: number }
   */
  getLocationFromAddress: async function (value) {
    try {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
      Geocode.setLanguage("en");
      const response = await Geocode.fromAddress(value);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (e) {
      console.error(`Unable to lookup address: ${e}`);
    }

    return undefined;
  },
};

export default MapService;
