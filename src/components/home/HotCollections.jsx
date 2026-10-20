import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/colors/hotCSlider.css";

const HotCollections = () => {
  const [data, newData] = useState([]);
  const [loaded,setLoaded] = useState(false)

  async function getDatabase() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
      
      setTimeout(()=>{
        newData(data);
        setLoaded(true);
      },3000)
  }

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={2}
            className="blackSlider"
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {loaded ? data.map((collection) => (
              <div key={collection.nftId}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.title}
                      />
                    </Link>
                  </div>

                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              </div>
            )) : Array.from({ length: 3 }).map((_ , index) => (
              <div key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <div className="skeleton-box"></div>
                  </div>
                  <div className="nft_coll_info">   
                    <h4 className="skeleton-text"></h4>
                    <span className="skeleton-text"></span>
                  </div>
                </div>
              </div>
              
            ))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
