// Import media images
import mediaImage1 from '../images/MediaCoverage/MediaCoverage_1.jpg';
import mediaImage2 from '../images/MediaCoverage/MediaCoverage_2.jpg';
import mediaImage3 from '../images/MediaCoverage/MediaCoverage_3.jpg';
import mediaImage4 from '../images/MediaCoverage/MediaCoverage_4.jpg';
import mediaImage5 from '../images/MediaCoverage/MediaCoverage_5.jpg';
import mediaImage6 from '../images/MediaCoverage/MediaCoverage_6.jpg';

import { collection, getDocs, query, orderBy } from '@firebase/firestore';
import { db } from '../firebase-config';

const mediaRef = collection(db, 'media');

const imageMap = {
  'MediaCoverage_1.jpg': mediaImage1,
  'MediaCoverage_2.jpg': mediaImage2,
  'MediaCoverage_3.jpg': mediaImage3,
  'MediaCoverage_4.jpg': mediaImage4,
  'MediaCoverage_5.jpg': mediaImage5,
  'MediaCoverage_6.jpg': mediaImage6,
};

export const getMediaInfo = async () => {
  const mediaArray = [];

  try {
    const querySnapshot = await getDocs(query(mediaRef, orderBy("id")));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.image = imageMap[data.imageID];
      mediaArray.push(data);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return mediaArray;
}

export const dynamicMedia = getMediaInfo();

dynamicMedia.then(mediaItems => {
  console.log(mediaItems);
});
