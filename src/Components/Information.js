import { useState } from "react";
// import "../../styles/Student-Information/Information.css"


// Reusable Arrow Icon Component
const ArrowIcon = ({ isOpen }) => (
    isOpen ? (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6L6 1L1 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ) : (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L6 6L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
);
const Information = () => {
    const [openCard, setOpenCard] = useState(null);

    const toggleCard = (card) => {
        setOpenCard(openCard === card ? null : card);
    };

    const renderHeader = (title, cardKey) => (
        <div className="header d-flex justify-content-between align-items-center bg-white">
            <div className="d-flex align-items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M17.2411 8.26926C16.8272 8.26926 16.279 8.26009 15.5964 8.26009C13.9318 8.26009 12.5631 6.88234 12.5631 5.20209V2.25409C12.5631 2.02218 12.3779 1.83334 12.1483 1.83334H7.29966C5.03691 1.83334 3.20801 3.69051 3.20801 5.96659V15.8437C3.20801 18.2316 5.12404 20.1667 7.48845 20.1667H14.7088C16.9633 20.1667 18.7913 18.3214 18.7913 16.0435V8.68176C18.7913 8.44893 18.6071 8.26101 18.3765 8.26192C17.989 8.26467 17.5243 8.26926 17.2411 8.26926Z" fill="#56555C" />
                    <path opacity="0.4" d="M14.7438 2.35336C14.4697 2.06828 13.9912 2.26444 13.9912 2.65953V5.07678C13.9912 6.09061 14.8263 6.92478 15.8401 6.92478C16.479 6.93211 17.3664 6.93394 18.1199 6.93211C18.5058 6.93119 18.702 6.47011 18.4343 6.19144C17.4672 5.18586 15.7356 3.38369 14.7438 2.35336Z" fill="#56555C" />
                    <path d="M13.2164 13.6517C13.5931 13.6517 13.8993 13.9579 13.8993 14.3347C13.8993 14.7114 13.5931 15.0167 13.2164 15.0167H8.22604C7.84929 15.0167 7.54404 14.7114 7.54404 14.3347C7.54404 13.9579 7.84929 13.6517 8.22604 13.6517H13.2164ZM11.3289 9.07373C11.7056 9.07373 12.0118 9.3799 12.0118 9.75665C12.0118 10.1334 11.7056 10.4386 11.3289 10.4386H8.22595C7.8492 10.4386 7.54395 10.1334 7.54395 9.75665C7.54395 9.3799 7.8492 9.07373 8.22595 9.07373H11.3289Z" fill="#56555C" />
                </svg>
                <span className="section-title">{title}</span>
            </div>
            <button className="btn btn-sm toggle-btn" onClick={() => toggleCard(cardKey)}>
                <ArrowIcon isOpen={openCard === cardKey} />
            </button>
        </div>
    );

    return (
        <div className="information p-2  ">
            <h6 className="d-flex align-items-center gap-2 pb-1 border-bottom border-2">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path opacity="0.4" d="M13.7 0.83H16.84C18.12 0.83 19.17 1.88 19.17 3.18V6.31C19.17 7.61 18.12 8.66 16.84 8.66H13.7C12.45 8.66 11.41 7.61 11.41 6.31V3.18C11.41 1.88 12.45 0.83 13.7 0.83Z" fill="#56555C" />
                    <path d="M6.26 11.34C7.55 11.34 8.59 12.39 8.59 13.69V16.82C8.59 18.12 7.55 19.17 6.26 19.17H3.16C1.88 19.17 0.83 18.12 0.83 16.82V13.69C0.83 12.39 1.88 11.34 3.16 11.34H6.26ZM16.84 11.34C18.13 11.34 19.17 12.39 19.17 13.69V16.82C19.17 18.12 18.13 19.17 16.84 19.17H13.74C12.45 19.17 11.41 18.12 11.41 16.82V13.69C11.41 12.39 12.45 11.34 13.74 11.34H16.84ZM6.26 0.83C7.55 0.83 8.59 1.88 8.59 3.18V6.31C8.59 7.61 7.55 8.66 6.26 8.66H3.16C1.88 8.66 0.83 7.61 0.83 6.31V3.18C0.83 1.88 1.88 0.83 3.16 0.83H6.26Z" fill="#56555C" />
                </svg>
                Information
            </h6>

            {/* === Profile Details === */}
            <div className="card border border-secondary-subtle rounded-3 shadow-sm mt-3 p-1">

                {renderHeader("Profile Details", "profile")}
                {!openCard || openCard !== "profile" ? (
                    <div className="button-row ">
                        <button
                            className="btn btn-sm rounded-pill additional custom-green "
                            onClick={() => toggleCard("profile")}
                        >
                            Profile Details
                        </button>
                    </div>
                ) : (
                    <div className="row profile-info-row pe-3 mb-0 ">
                        <div className="col-6 ">
                            <label className="form-label small-label" style={{ color: "#999999" }}>Aadhar number</label>
                            <span className="form-value" style={{ color: "#4F4F4F" }} >6782 6789 9762</span>
                        </div>
                        <div className="col-6 text-end px-0">
                            <label className="form-label small-label " style={{ color: "#999999" }}>Mother Name</label>
                            <span className="form-value " style={{ whiteSpace: "noWrap", color: "#4F4F4F" }}>RadhaRani Bhimineni</span>
                        </div>
                        <div className="col-6">
                            <label className="form-label small-label" style={{ color: "#999999" }}>Date of Birth</label>
                            <span className="form-value" style={{ color: "#4F4F4F" }}>28 Dec 1997</span>
                        </div>
                        <div className="col-6 text-end">
                            <label className="form-label small-label" style={{ color: "#999999" }}>Father Name</label>
                            <span className="form-value" style={{ color: "#4F4F4F" }}>Giridhar Bhiminen</span>
                        </div>
                        <div className="col-12">
                            <label className="form-label" style={{ color: "#999999" }}>Address</label>
                            <span className="form-value" style={{ color: "#4F4F4F" }}>
                                6th Floor, NCC Building, Durgamma Cheruvu Road, HITEC City, Hyderabad, Telangana 500081
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* === Campus Details === */}
            <div className="card border border-secondary-subtle rounded-3 shadow-sm mt-3 p-1">
                {renderHeader("Campus Details", "campus")}
                {!openCard || openCard !== "campus" ? (
                    <div className="button-row">
                        <button className="btn btn-sm rounded-pill custom-green" onClick={() => toggleCard("campus")}>Current Campus</button>
                        <button className="btn btn-sm rounded-pill custom-pink" onClick={() => toggleCard("campus")}>Course</button>
                    </div>
                ) : (
                    <div className="p-3">
                        <p><strong>Campus:</strong> HITEC City</p>
                        <p><strong>Course:</strong> B.Tech (CSE)</p>
                    </div>
                )}
            </div>

            {/* === Additional Details === */}
            <div className="card border border-secondary-subtle rounded-3 shadow-sm mt-3 p-1">
                {renderHeader("Additional Details", "additional")}
                {!openCard || openCard !== "additional" ? (
                    <div className="button-row">
                        <button className="btn btn-sm rounded-pill custom-green " onClick={() => toggleCard("additional")}>Language</button>
                        <button className="btn btn-sm rounded-pill custom-pink" onClick={() => toggleCard("additional")}>Sports</button>
                    </div>
                ) : (
                    <div className="p-3">
                        <p><strong>Languages:</strong> English, Hindi</p>
                        <p><strong>Sports:</strong> Badminton, Table Tennis</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Information;