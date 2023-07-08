import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainNavbar from "../../../Navigation/MainNavbar";
import Blueprint from "./Blueprint";
import logo from "../../../../Assets/Images/logo.png";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import "./read.css";
import preloader from "../../../../Assets/Images/main.gif";

const Explore = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  // handle fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get("/story/stories");
        setStories(response.data.stories);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    };
    fetchStories();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="explore_sect">
      <MainNavbar />
      <header className="login_header">
        <nav>
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </nav>
      </header>
      <div>
        <>
          <p className="explore_intro">Explore</p>
          <div className="all_stories">
            {loading && (
              <div className="main_preloader">
                <img
                  src={preloader}
                  alt="preloader"
                  className="main_preloader_img"
                />
              </div>
            )}
            {error && <p className="error">{error.message}</p>}
            {stories.map((story) => {
              return <Blueprint key={story._id} story={story} />;
            })}
          </div>
        </>
      </div>
    </section>
  );
};

export default Explore;
