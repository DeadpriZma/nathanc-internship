import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [data, newData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getDatabase() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );

    setTimeout(() => {
      newData(data);
      setLoaded(true);
    }, 3000);
  }

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loaded
                ? data.map((user) => (
                    <li key={user.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${user.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={user.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${user.authorId}`}>
                          {user.authorName}
                        </Link>
                        <span>{user.price} ETH</span>
                      </div>
                    </li>
                  ))
                : Array.from({ length: 12 }).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="skeleton-text" />
                      </div>
                      <div className="author_list_info">
                        <span className="skeleton-text"></span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
