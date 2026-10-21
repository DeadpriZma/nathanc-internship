import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



const AuthorItems = () => {

  const {id} = useParams();

  const [data, newData] = useState({});



  useEffect(() => {
    async function getDatabase() {
    const {data} = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
    );
    newData(data);
    
  }
    getDatabase();
  }, [id]);

  
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {data.nftCollection?.map((post) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={post.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="https://twitter.com/intent/tweet" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:">
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
                  <Link to={`/item-details/${post.nftId}`}>
                    <h4>{post.title}</h4>
                  </Link>
                  <div className="nft__item_price">{post.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
