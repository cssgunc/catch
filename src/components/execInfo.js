import treasurerImage from '../images/About/execf23/mel-headshot.png';
import presidentImage from '../images/About/execf23/bryce-headshot.jpg';
import coChiefQualityOfficerImage2 from '../images/About/execf23/nal-headshot.png';
import secretaryImage from '../images/About/execf23/IMG_4302.jpg';
import marketingLeadImage from '../images/About/execf23/IMG_4904.jpg';
import outreachChairImage from '../images/About/execf23/IMG_3924.jpg';
import coChiefQualityOfficerImage1 from '../images/About/thumbnail_IMG_0796.jpg';
import chiefTechnicalOfficerImage from '../images/About/IMG_5285.jpg';
import vicePresidentImage from '../images/About/execf23/katieHeadshot.jpg';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config';

const execRef = collection(db, 'exec'); 


async function getDynamicRecentExecInfo() {
    const execs = [];
  
      try {
        const querySnapshot = await getDocs(execRef);
        querySnapshot.forEach((doc) => {
          if (!doc.data().current) {
            execs.push(doc.data());
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return execs
    }
  
    // async function getDynamicOldExecInfo() {
    //   const execs = [];
    
    //     try {
    //       const querySnapshot = await getDocs(execRef);
    //       querySnapshot.forEach((doc) => {
    //         if (!doc.data().current) {
    //           execs.push(doc.data());
    //         }
    //       });
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //     return execs
    //   }
  
  export const dynamicRecentExecInfo = getDynamicRecentExecInfo()
  // export const dynamicOldExecInfo = getDynamicOldExecInfo()

export const execInfo = [
  {image: presidentImage, name: "Bryce Menichella", position: "President"},
  {image: vicePresidentImage, name: "Katie Chai", position: "Vice President"},
  {image: treasurerImage, name: "Melanie Gall", position: "Treasurer"},
  {image: secretaryImage, name: "Hieu Doan", position: "Secretary"},
  {image: chiefTechnicalOfficerImage, name: "Jacob Ewoldt", position: "Chief Technical Officer"},
  {image: coChiefQualityOfficerImage1, name: "Jun Ikeda", position: "Co-Chief Quality Officer"},
  {image: coChiefQualityOfficerImage2, name: "Nalaya Giraud", position: "Co-Chief Quality Officer"},
  {image: marketingLeadImage, name: "Maddy Vinal", position: "Marketing Lead"},
  {image: outreachChairImage, name: "Bryce Womble", position: "Outreach Chair"}
]

console.log(dynamicRecentExecInfo)
// console.log(dynamicOldExecInfo)