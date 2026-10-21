import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExploreItems = () => {
  const [data, newData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getDatabase() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    );

    setTimeout(() => {
      newData(data);
      setLoaded(true);
    }, 3000);
  }

  useEffect(() => {
    getDatabase();
  }, []);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 1000);
  }, []);

  const [visiblePosts, setVisiblePosts] = useState(6);

  const [filter, setFilter]= useState("");

  if (filter ==="price_high_to_low"){
        data.sort((a, b) => b.price - a.price)
      }
  if (filter ==="price_low_to_high"){
        data.sort((a, b) => a.price - b.price)
      }
  if (filter ==="likes_high_to_low"){
        data.sort((a, b) => b.likes - a.likes)
      }

      // I can also instead on bigger APIs make it so instead of data.sort(...) I could call the api's link but with the filter applied to it and set it as newData

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => setFilter(e.target.value)}>
          <option value="" disabled>Sort</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      
      {loaded
        ? data.slice(0, visiblePosts).map((post) => (
            <div
              key={post.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${post.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={post.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {post.expiryDate &&
                  (() => {
                    const difference =
                      new Date(post.expiryDate).getTime() - now;

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
                  <Link to={`/item-details/${post.nftId}`}>
                    <img
                      src={post.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{post.title}.</h4>
                  </Link>
                  <div className="nft__item_price">{post.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <div className="skeleton-text"> </div>
                    <i className="fa fa-check"></i>
                  </Link>
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
                  <Link to="/item-details">
                    <div className="skeleton-box"> </div>
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4 className="skeleton-text"></h4>
                  </Link>
                  <div className="nft__item_price skeleton-text"></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span className="skeleton-text"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {visiblePosts <= 16 && (
            <div className="col-md-12 text-center">
              <Link
                to=""
                id="loadmore"
                className="btn-main lead"
                onClick={(e) => {
                  e.preventDefault();
                  setVisiblePosts((prev) => prev + 4);
                }}
              >
                Load more
              </Link>
            </div>
          )
        }
    </>
  );
};

export default ExploreItems;
