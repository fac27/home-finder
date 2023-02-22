// return info about the nearest public transport access points within a specified radius.
// Works only for London as the data is from Tfl
import { getLongAndLat } from './getLongAndLat.js';

export const getNearestBuses = async (postcode) => {
  const { latitude, longitude } = await getLongAndLat(postcode);

  try {
    const response = await fetch(
      `https://api.tfl.gov.uk/Stoppoint?lat=${latitude}&lon=${longitude}&stoptypes=NaptanBusCoachStation,NaptanPublicBusCoachTram&radius=300&useStopPointHierarchy=True&returnLines=True`
    );

    if (response) {
      const responseJson = await response.json();
      return responseJson.stopPoints;
    } else {
      throw new Error("Couldn't get transport information");
    }
  } catch (error) {
    console.error("There was a problem fetching transport data:\n" + error);
  }
};

// method to return nearby railway and underground stations
// rsponse time has a bit of a delay
// export const getNearestTrains = async (postcode) => {
//   const { latitude, longitude } = await getLongAndLat(postcode);

//   try {
//     const response = await fetch(
//       `https://api.tfl.gov.uk/Stoppoint?lat=${latitude}&lon=${longitude}&stoptypes=NaptanMetroStation,NaptanRailStation,&radius=3000&useStopPointHierarchy=False&returnLines=False`
//     );

//     if (response) {
//       const responseJson = await response.json();
//       return responseJson.stopPoints;
//     } else {
//       throw new Error("Couldn'nt get transport information");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
