
import { Create, EventAvailable } from '@material-ui/icons'
import React from 'react'
import "../styling/style.css"
import img_1 from "../images/img_1.jpg";
import img_2 from "../images/img_2.jpeg";
import img_3 from "../images/img_3.jpg";
import img_4 from "../images/img_4.jpg";
import { GiArchiveResearch, GiBookmarklet } from 'react-icons/gi';
import { RiTimerFlashFill } from 'react-icons/ri';
import { BsPersonPlus } from 'react-icons/bs';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { GrDocumentConfig } from 'react-icons/gr';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* <!-- Site Navigaiton --> */}
            <nav id="" className="navbar navbar-expand-lg shadow-sm navbar-light bg-light position-sticky">
                <div className="container-fluid nav-container ">
                    <div className="nav-logo d-flex align-items-center gap-2">

                        <Create />

                        <h5 className=" pl-3 navbar-brand" href="#">PMTutors</h5>

                    </div>
                    <button className="navbar-toggler custom-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-between w-50">
                            <li className="nav-item">
                                <a className="nav-link" href="#t">
                                    Student
                                </a>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#home">
                                Tutor
                            </a></li>

                            <li className="nav-item"><Link className="nav-link" to="/">
                                Home
                            </Link></li>
                            <li className="nav-item"> <a className="nav-link" href="#about">
                                About
                            </a></li>
                            <li className="nav-item"><a className="nav-link" href="#contact">
                                Contacts
                            </a></li>

                            {/* <!-- <li className="nav-item mx-4 "> --> */}
                            <div className="d-flex justify-content-between gap-3">
                                <Button
                                    variant="outlined"
                                    style={{ marginRight: "5px", fontWeight: "bold" }}
                                    color="primary"
                                >
                                    <Link
                                        style={{ textDecoration: "none", color: "auto" }}
                                        to="/login"
                                    >
                                        Login
                                   </Link>
                                </Button>
                                <Button
                                    style={{ fontWeight: "bold" }}
                                    variant="contained"
                                    color="secondary"
                                >
                                    <Link
                                        style={{ textDecoration: "none", color: "white" }}
                                        to="/signup"
                                    >
                                        SignUp
                                    </Link>
                                </Button>
                            </div>
                            {/* <!-- </li> --> */}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* <!-- site Body --> */}
            {/* <!-- Carousel --> */}
            <div id="carouselExampleDark" className="carousel carousel-dark position-relative slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button style={{ backgroundColor: "#fff" }} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                        className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button style={{ backgroundColor: "#fff" }} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button style={{ backgroundColor: "#fff" }} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>

                    <button style={{ backgroundColor: "#fff" }} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3"
                        aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={img_3} className="d-block w-100 " alt="carousel 1" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={img_2} className="d-block w-100 " alt="carousel 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={img_1} className="d-block w-100 " alt="carousel 3" />
                    </div>
                    <div className="carousel-item">
                        <img src={img_4} className="d-block w-100" alt="carousel 4" />
                    </div>
                </div>
                <div className="carousel-floater position-absolute d-flex flex-column gap-3 top-0 start-0 h-100 w-100">
                    <h2 className="h2">ONLINE TUTORING</h2>

                    <h5 className="h5">Online 24/7 tutoring from skilled tutors </h5>

                    <div>
                        <Link to="/login">
                            <button className="btn btn-primary btn-md-lg mx-3">
                                I am a Tutor
                         </button>
                        </Link>
                        <Link to="/">
                            <button className="btn btn-danger btn-lg-md">
                                I am a Student
                            </button>
                        </Link>
                    </div>

                    <div className="w-75" style={{ height: "20%", overflow: "hidden" }}>
                        <p className="slab text-white">
                            Do you feel juggling work, studying, exams, and a personal life can sometimes feel a little bit overwhelming? You’re not alone, a lot of students do. College life these days is demanding and requires a lot of time, which you sometimes might not have. That’s where pmtutors can help you. We are a dedicated essay writing service that can help you put together a top-quality essay.
                        </p>
                    </div>
                </div>
            </div>
            {/* <!-- /carousel --> */}

            {/* <!-- Our offers --> */}
            <div className="our-offers container-md-9 d-flex flex-column my-4 ">

                <h4 className="h4 align-self-center">OUR OFFERS</h4>

                <div className="row ">
                    <div className="our-offers-inner col mt-2">
                        <div className="row d-flex flex-xs-column justify-content-around align-items-center pt-3" style={{ height: "100%" }}>
                            <div className="col-md-3 d-flex text-center flex-column align-items-center">
                                <GiArchiveResearch className="icon" />

                                <h6 className="my-4">Plenty Research</h6>

                                <p>We broadly explore on your task</p>
                            </div>
                            <div className="col-md-3 d-flex text-center flex-column align-items-center">
                                <RiTimerFlashFill className="icon" />

                                <h6>Handing on Time!</h6>

                                <p>Task is Completed and Handed on time</p>
                            </div>
                            <div className="col-md-3 d-flex text-center flex-column align-items-center">
                                <EventAvailable className="icon" />

                                <h6>24/7 workout</h6>

                                <p>Readily available at your service</p>
                            </div>

                            <div className="our-offer-exp  col-md-8 col-lg-5 d-flex flex-column text-center">
                                <span className="align-self-center">
                                    We offer fair rates and quality freelance work
                                </span>
                                <span className="align-self-center w-75">
                                    Earn Up to $10 per page
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!-- /Our offers --> */}


            {/* Application process */}
            <div className="container application-process py-4">
                <div className="row d-flex justify-content-center ">
                    <div className="w-100 text-center slab">
                        <h1 className="h1 mb-3">Application Process</h1>
                        {/* <br /> */}
                        <h4 className="h4 mb-4" style={{ fontWeight: "300" }}>Want To Earn?</h4>
                    </div>
                    {/* <div className="col-lg-8 col-md-10 align-self-center d-flex align-items-between">
                        <div className="container-fluid my-5">
                            <div className="row py-2"> */}
                    <div className="col-md-2 mt-3 col-5 d-flex flex-column align-items-center ">
                        <div>
                            <BsPersonPlus style={{ fontSize: "60px" }} />
                        </div>
                        {/* step section */}
                        <span>1.Register to Join</span>
                    </div>
                    <div className="col-md-2 col-5 mt-3 d-flex  flex-column align-items-center">
                        <div >
                            <HiOutlineClipboardCopy style={{ fontSize: "60px" }} />
                        </div>
                        {/* step section */}
                        <span>2.Take Test</span>
                    </div>
                    <div className="col-md-2 col-5 mt-3 d-flex  flex-column align-items-center">
                        <div >
                            <GrDocumentConfig style={{ fontSize: "60px" }} />
                        </div>
                        {/* step section */}
                        <span>3.Set up Profile</span>
                    </div>
                    <div className="col-md-2 mt-3 col-5 d-flex  flex-column align-items-center">
                        <div >
                            <GiBookmarklet style={{ fontSize: "60px" }} />
                        </div>
                        {/* step section */}
                        <span>4.Take Task</span>
                    </div>
                    {/* </div>
                        </div>
                    </div> */}
                    <div className="w-100 d-flex justify-content-center mt-5">
                        <Button
                            variant="contained"
                            //   color="secondary"
                            onClick={() => (window.location.pathname = "/signup")}
                            style={{
                                backgroundColor: "#d95959",
                                alignSelf: "center",
                                padding: ".5em 3em",
                                fontSize: "16px",
                                color: "white",
                            }}
                        >
                            Join Now
                        </Button>
                    </div>

                </div>
            </div>

            {/* levels */}
            <div className="container-fluid ">
                <div className="row w-100 d-flex justify-content-center gap-2 levels">

                    <div className="col-md-3 stage slab">
                        <Avatar
                            className="large"
                            alt="Remy Sharp"
                            src="https://files.realpython.com/media/python-beginner-tips.50f5f0c4e739.jpg"
                        />
                        <div>
                            <h5>Beginner</h5>
                            <p>Pick 2 tasks only at a go</p>
                        </div>
                    </div>
                    <div className="col-md-3 stage slab">
                        <Avatar
                            className="large"
                            alt="Remy Sharp"
                            src="https://alfacat.eu/wp-content/uploads/2020/05/launching.svg"
                        />
                        <div>
                            <h5>Intermediate</h5>
                            <p >Pick 4 tasks at a go</p>
                        </div>
                    </div>
                    <div className="col-md-3 stage slab    ">
                        <Avatar
                            className="large"
                            alt="Remy Sharp"
                            src="https://www.athcodigital.com/static/rocket30-4cc012089249d4f57ac51ec1f90a8d1a.svg"
                        />
                        <div>
                            <h5 >Advanced</h5>
                            <p className="text-lighter">Pick 6 tasks or more at a go based on your perfection</p>
                        </div>
                    </div>
                    <div className="col-md-3 stage slab">
                        <Avatar
                            className="large"
                            alt="Remy Sharp"
                            src="https://alfacat.eu/wp-content/uploads/2020/05/launching.svg"
                        />
                        <div>
                            <h5>Expert</h5>
                            <p >Pick 10 tasks at a go</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About section */}
            <div className="about container-fluid d-flex flex-column p-3 mt-3" id="about">
                <h4 className=" about-heading">ABOUT US</h4>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 d-flex justify-content-md-end justify-content-center h-100">
                        <img
                            src="https://www.kindpng.com/picc/m/49-497739_computer-clipart-team-development-team-png-transparent-png.png"
                            alt="about"
                        />
                    </div>
                    <div className="about-description col-md-3 col-xs-9 slab px-2">
                        We are a reliable partner you can trust. We employ hundreds of
                        writers and editors and guarantee high salaries and stable
                        bi-weekly payouts to our freelancers. Our cornerstone principle is
                        simple: fair price for fair work. Our rates are above average for
                        the industry and we make sure that your work is fairly
                        compensated.
                    </div>
                </div>

                <div className="about-reviews row d-flex justify-content-center text-white-50 slab">

                    <div className="col-md-6 d-md-flex mt-5 align-items-center ">
                        <div style={{ width: "20%" }} className="jus-self-center">
                            <Avatar
                                className="large"
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                            />
                            <span className="fw-bold text-white d-flex">Steve Job</span>
                        </div>

                        <p style={{ fontStyle: "italic" }}>
                            <span className="fs-2 px-2">"</span>
                            I've been with PMTutors for some time now and can say that this is the
                            best experience that I ever had with these freelance Jobs.
                            <span className="fs-2">"</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* footer */}
            <section className="footer container-fluid p-4">
                <div className="row">
                    <div id="contact" className="col-md-5 d-flex flex-column align-items-center gap-3 text-white p-0">
                        <h5
                            style={{
                                fontFamily: "Roboto Slab",
                                fontSize: "23px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            <span style={{ color: "#f50057" }}>PM</span>&nbsp;TutorsHUB
                        </h5>

                        <span className="slab text-center w-100" style={{ opacity: "0.8", fontSize: "13px" }}>FEEL FREE TO CONTACT US AT:</span>
                        <span>+254 721 889366</span>
                        <span>+254 729 138466</span>
                        <strong style={{ color: "#fdfdfd" }}>pmtutorshub@gmail.com</strong>
                    </div>
                    <div className="col-md-5 slab d-flex flex-column align-items-center p-0">
                        <ul className="footer-nav d-flex flex-column gap-2 text-uppercase p-0">
                            <Link to="/">Home</Link>
                            <a href="#about">About</a>
                            <a href="#contact">Contact-Us</a>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </ul>
                    </div>
                </div>
                <div className="w-75 d-md-flex d-sm-inline-block align-items-center justify-content-between " style={{ margin: "auto" }}>
                    <span
                        style={{
                            fontSize: "15px",
                            opacity: "0.6",
                            placeSelf: "flex-end",
                            marginTop: "1em",
                            color: 'white'
                        }}
                    >
                        <span style={{ fontSize: "16px" }}>&copy; </span>
                        {new Date().getFullYear()} PMTutors.com All rights Reserved
                    </span>

                    <span className="px-3" id="design" style={{ color: "#ffffff44" }}>
                        Designed by Pekstar Coders
                </span>
                </div>
            </section>

        </div>

    )
}

export default Home


