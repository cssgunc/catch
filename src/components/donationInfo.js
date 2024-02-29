import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase-config";

const donationsRef = collection(db, "donations");

export const getDonationInfo = async () => {
  const donationArray = [];

  try {
    const querySnapshot = await getDocs(
      query(donationsRef, orderBy("totalDonated"))
    );
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      const transformedData = {
        imagePath: data.imageID,
        organization: data.orgName,
        total: data.totalDonated,
        donations: data.numDonations,
        description: data.description || "",
      };

      donationArray.push(transformedData);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return donationArray;
};

export const donationsInfoTemp = getDonationInfo();
