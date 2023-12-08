import org1Image from '../images/Donations/donation1.jpg';
import org2Image from '../images/Donations/donation2.jpg';
import org3Image from '../images/Donations/donation3.jpg';
import org4Image from '../images/Donations/donation4.jpg';
import org5Image from '../images/Donations/donation5.jpg';
import org6Image from '../images/Donations/donation6.jpg';
import { collection, getDocs, query, orderBy } from '@firebase/firestore';
import { db } from '../firebase-config';

const donationsRef = collection(db, 'donations');

// export const getDonationInfo = async () => {
//   const donationArray = [];

//   try {
//     const querySnapshot = await getDocs(query(donationsRef, orderBy("totalDonated")));
//     querySnapshot.forEach((doc) => {
//       let data = doc.data();
//       donationArray.push(data);
//     });
//   } catch (error) {
//     console.error("Error fetching media data:", error);
//   }
//   return donationArray;
// }

async function getDonationInfo() {
  const donationArray = [];

  try {
    const querySnapshot = await getDocs(query(donationsRef, orderBy("totalDonated")));
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      // Transform the data to match the desired format
      const transformedData = {
        imagePath: data.imageID, // Adjust this function to get the correct image path
        organization: data.orgName,
        total: data.totalDonated,
        donations: data.numDonations,
        description: data.description || '', // Use an empty string if description is undefined
      };

      donationArray.push(transformedData);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return donationArray;
};

export const donationsInfoTemp = getDonationInfo();

export const donationsInfo = [
  { imagePath: org1Image, organization: 'Carolina Institute for Developmental Disabilities', total: 20, donations: 2, description: "The Carolina Institute for Developmental Disabilities is a comprehensive program for services, research, and training relevant to individuals with developmental disabilities and their families. The Carolina Institute provides a continuum of clinical services from complex, interdisciplinary evaluations on-site to more limited and selected clinical services and training in all 100 counties in North Carolina. The Institute brings together state-of-the-art research and clinical practice to ensure the best possible care for citizens of North Carolina." },
  { imagePath: org2Image, organization: 'UNC Center for Rehabilitative Care', total: 14, donations: 2, description: 'The mission of the UNC Inpatient Rehabilitation Center is to improve, restore and maintain functional abilities and maximize quality of life in patients with disabilities; educate health care professionals in rehabilitation care and services; and advance rehabilitation research. Rehabilitative care provides persons served with the skills and support necessary to function in an environment with as much independence and choice and as little supervision and restriction as possible. The totality of this care spans the rehabilitation continuum to optimize the functionality and quality of life and prevent and or treat conditions of physically disabled persons.' },
  { imagePath: org3Image, organization: "Levine Children's Hospital", total: 16, donations: 2, description: '' },
  { imagePath: org4Image, organization: 'Novant Health', total: 10, donations: 1, description: '' },
  { imagePath: org5Image, organization: 'Barton Pond Elementary School', total: 10, donations: 1, description: '' },
  { imagePath: org6Image, organization: 'Aversboro Elementary School', total: 10, donations: 1, description: '' }
]

donationsInfoTemp.then(mediaItems => {
  console.log(mediaItems);
});