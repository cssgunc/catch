import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Banner from "../components/Banner";
import { getMediaInfo } from "../components/mediaInfo.js";

import "./MediaCoverage.css";

const ArticleCard = ({ image, title, caption, link }) => {
  return (
    <Col md={6} className="mb-4 mt-3">
      <Card className="mx-2" style={{ minHeight: "100%", borderRadius: "0" }}>
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body className="text-left p-3">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{caption}</Card.Text>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "white",
              textDecoration: "none",
              lineHeight: "1.5",
              backgroundColor: "skyblue",
              padding: "5px 8px",
              fontWeight: "bold",
            }}
          >
            Read more
          </a>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ArticleGrid = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const mediaData = await getMediaInfo();
      setArticles(mediaData);
    };
    fetchMedia();
  }, []);

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
        imagePath="banner/media_coverage_banner_color.jpeg"
        title="Media Coverage"
      />
      <p style={{ paddingTop: 20, marginBottom: -40 }}>
        We are always looking to spread the word and the CATCH mission. For news
        inquiries, please contact us at{" "}
        <a
          href="mailto:catchUNC@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          catchUNC@gmail.com
        </a>
        .
      </p>
      <ArticleGrid />
    </div>
  );
};

export default MediaCoverage;
