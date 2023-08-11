import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import logo from "../../../Assets/Images/logo.png";
import { btnOptions } from "../../AppData/data";
import { getUsers } from "../../AppData/getUsers";
import preloader from "../../../Assets/Images/base_preloader.gif";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [users, setUsers] = useState();
  const [loadInterests, setLoadInterests] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  // get the name of the logged in user
  const name = JSON.parse(localStorage.getItem("user"));
  // get the id of logged in user
  const foundId = users?.find((user) => user.username === name)?._id;

  // get users on page load
  // useEffect(() => {
  //   getUsers(setUsers, axiosPrivate, navigate, location);
  //   // eslint-disable-next-line
  // }, []);

  // fetch user interests on page load
  useEffect(() => {
    if (interests.length) {
      // add active class to the buttons
      const btns = document.querySelectorAll(".home_main_div_btns_btn");
      btns.forEach((btn) => {
        if (interests.includes(btn.innerText)) {
          btn.classList.add("active");
        }
      });
    } else {
      setInterests([]);
    }
    //eslint-disable-next-line
  }, [interests.length]);

  const handleClick = (e) => {
    e.target.classList.toggle("active");
    if (interests.includes(e.target.innerText)) {
      const index = interests.indexOf(e.target.innerText);
      interests.splice(index, 1);
    } else {
      interests.push(e.target.innerText);
    }
    // push selected interests to the database
    const updateInterests = async () => {
      try {
        //eslint-disable-next-line
        const response = await axiosPrivate.put(`/`, {
          username: name,
          interests: interests,
        });
      } catch (err) {
        console.log(err);
      }
    };
    updateInterests();
  };

  // fetch interests from user
  useEffect(() => {
    const getInterests = async () => {
      try {
        const response = await axiosPrivate.get(`/users/interests/${name}`);
        // return the interests of the logged in user
        const userInterests = response.data;
        // set the interests in the state
        setInterests(userInterests);
        setLoadInterests(false);
      } catch (err) {
        console.log(err);
      }
    };
    getInterests();
  }, []);

  // toast message
  const showToastMessage = () => {
    toast.error(`Please select at least one interest to continue.`, {
      position: toast.POSITION.TOP_RIGHT,
      className: "error_toast",
    });
  };

  // next page option
  const nextPageOption = () => {
    if (interests.length) {
      navigate("/main");
    } else {
      showToastMessage();
    }
  };

  return (
    <section className="home_sect">
      {/* <MainNavbar /> */}
      <header className="login_header">
        <nav>
          <Link to="/" className="home_logo_link">
            <img src={logo} alt="logo" className="home_logo" />
          </Link>
        </nav>
      </header>
      <div className="home_main_div">
        <>
          <p className="welcome">Welcome! </p> <br />
          <p className="interests home_interests">
            Customize your account. Select the topics that interest you below.
            What do you like reading and/or writing about?
          </p>
        </>

        {/* display interests */}
        <div className="home_main_div_btns">
          {btnOptions.sort().map((btn, index) => {
            return (
              <button
                key={index}
                className="home_main_div_btns_btn"
                onClick={handleClick}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
      {/* next page option */}
      {loadInterests ? (
        <div className="preloader_div">
          <img
            src={preloader}
            alt="preloader"
            className="preloader home_preloader"
          />
        </div>
      ) : (
        <div className="next_btn_div">
          <button>
            <span className="next_btn" onClick={nextPageOption}>
              Next
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
