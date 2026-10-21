import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/colors/hotCSlider.css";

const NewItems = () => {
  const [data, newData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(Date.now());

  async function getDatabase() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
    );

    setTimeout(()=>{
      newData(data);
      setLoaded(true);
    },3000);
  }

  useEffect(() => {
    getDatabase();
  }, []);

  
  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 1000);
  }, []);


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-up" className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loaded? data.map((item) => (
            <div data-aos="fade-up" className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate &&
                  (() => {
                    const difference =
                      new Date(item.expiryDate).getTime() - now;

                    const hours = Math.floor(difference / (1000 * 60 * 60));

                    const minutes = Math.floor(
                      (difference % (1000 * 60 * 60)) / (1000 * 60),
                    );

                    const seconds = Math.floor(
                      (difference % (1000 * 60)) / 1000,
                    );

                    return (
                      <div className="de_countdown">
                        {hours}h {minutes}m {seconds}s
                      </div>
                    );
                  })()}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )): Array.from({ length: 7 }).map((_,index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                    
                </div>
    

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skeleton-text">
                  <Link to="/item-details">
                    
                  </Link>
                  <div className="nft__item_price"></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          ))

          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
