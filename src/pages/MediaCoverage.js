import React from 'react'
import { Card, Row, Col } from "react-bootstrap";
import bannerImage from '../images/MediaCoverage/media_coverage_banner_color.jpeg';
import Banner from '../components/Banner';

import './MediaCoverage.css';



const ArticleCard = ({ image, title, caption, link }) => {
  return (
    <Col md={6} className="mb-4 mt-3" >
      <Card className="mx-2" style={{minHeight:"100%"}}>
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{caption}</Card.Text>
          <a href={link} target="_blank" rel="noreferrer">
            Read more
          </a>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ArticleGrid = () => {

 
  const articles = [
    {
      id: 1,
      image: require("../images/MediaCoverage/MediaCoverage_1.jpg"),
      alt: "UNC students presenting the toys they made to the children.",
      title: "'It's a rewarding experience': Children with disabilities get toys modified for them by UNC students",
      caption: "The students work all year holding bake sales and community benefit nights to make the money to buy the toys.",
      link: "https://abc11.com/children-disabilities-toys-modified-unc-engineer-students/12602887/",
    },
    {
      id: 2,
      image: require("../images/MediaCoverage/MediaCoverage_2.jpg"),
      alt: "Student in the process of making and testing a toy.",
      title: "Making more accessible toys | UNC-Chapel Hill",
      caption: "The Tar Heels behind the CATCH student organization modify toys for children with disabilities and donate them to local medical facilities for children who need them.",
      link: "https://www.unc.edu/discover/making-more-accessible-toys/",
    },
    {
      id: 3,
      image: require("../images/MediaCoverage/MediaCoverage_3.jpg"),
      alt: "Staff at Novant Health Developmental and Behavioral Pediatrics in Charlotte test out modified toys",
      title: "Senior communities are taking care off-campus (free version)",
      caption: "Plus: Apartments planned for Camp North End?; College students adapt toys for kids with special needs; Good Fellows brings in record $2M for charity; Opening day for Pickleball Charlotte",
      link: "https://charlotteledger.substack.com/p/senior-communities-are-taking-care-a37#%C2%A7unc-student-organization-catches-children-who-fall-through-the-cracks-of-the-commercial-toy-industry",
    },
    {
      id: 4,
      image: require("../images/MediaCoverage/MediaCoverage_4.jpg"),
      alt: "Students in the process of building toys.",
      title: "Student Org Spotlight: CATCH",
      caption: "Looking to learn something new? Join Carolina Adapts Toys for Children (CATCH) weekly to help adapt toys for children with special needs! PR Chair Katie Chai shares more about the team: ",
      link: "https://studentaffairs.unc.edu/student-org-spotlight-carolina-adapts-toys-for-children/",
    },
    {
      id: 5,
      image: require("../images/MediaCoverage/MediaCoverage_5.jpg"),
      alt: "UNC student in process of modifying a toy",
      title: "Students work to 'CATCH’ kids with disabilities who fall through cracks of toy design",
      caption: "Sophomore Katie Chai never imagined her interest in technology would lead her to the basement in Phillips Hall modifying popular children’s toys. However, that is exactly where she found herself after she joined Carolina Adapts Toys for Children, affectionately known as CATCH.",
      link: "https://www.dailytarheel.com/article/2022/10/university-catch-feature",
    },
    {
      id: 6,
      image: require("../images/MediaCoverage/MediaCoverage_6.jpg"),
      alt: "Student rewiring bubble machine.",
      title: "UNC-Chapel Hill students build adapted toys for kids with disabilities",
      caption: "First year UNC-Chapel Hill student Enakshi Chawla rewires a bubble machine at Carolina Adapts Toys For Children, a student club that modifies toys for children with disabilities.",
      link: "https://www.wunc.org/education/2021-12-20/unc-chapel-hill-students-build-adapted-toys-kids-disabilities-christmas",
    },
  ];

  return (
    <Row className="mx-5 mt-5">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          image={article.image}
          title={article.title}
          caption={article.caption}
          link={article.link}
        />
      ))}
    </Row>
  );
};

const MediaCoverage = () => {
  return (
    <div>
      <Banner
        imagePath={bannerImage} 
        title='Media Coverage'
      />
      <p style={{paddingTop: 20, marginBottom: -40}}>We are always looking to spread the word and the CATCH mission. 
        For news inquiries, please contact our PR Chair at kchai@unc.edu!</p>
      <ArticleGrid />
    </div>
  )
}

export default MediaCoverage;