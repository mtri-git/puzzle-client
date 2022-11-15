import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { IMG_URL } from "../../utils/constants/url";
import Spinner from "../Spinner/Spinner";
import CompanyLogo from "../../pages/images/company-logo.png";
import './JobItem.css'

const PerfumeCardItem = ({ job, colSize, link, btnName1, btnName2 }) => {
    const [load, setLoad] = useState(false);

    const saveForJob = (id) => {
        const auth = localStorage.getItem("userRole");
        // console.log(auth.entity);
        const isAuthenticated = localStorage.getItem("isLoggedIn");
    
        if (!isAuthenticated) {
          alert("you must login to apply for jobs");
        } else {
          const BASE_REST_API_URL = "http://localhost:8080/api";
    
          axios
            .get(
              BASE_REST_API_URL + "/candidate/save-job-post/" + id,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                job_id: id,
              }
            )
            .then((response) => {
              if (response.data.data) {
                //show success message
                alert("Successfuly saved for job");
              } else if (!response.data.data) {
                alert(response.data.data.message);
              } else {
                alert("Request Failed");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

    return (
        <div className={`col-lg-${colSize} d-flex align-items-stretch`}>
            <div className="card mb-10">
                {load ? null :
                    <div className="d-block mx-auto w-100">
                        <Spinner />
                    </div>
                }
                <div>
                  <img onLoad={() => setLoad(true)}
                      className="mx-auto w-100"
                      style={{ display: load ? "block" : "none" }}
                      src={job.logo ? job.logo : CompanyLogo} />
                </div>
                <div className="card-body text-center">
                    <h5 color='blue'>{job.title}</h5>
                    <div className='job-content'>
                      <br></br>
                      {/* <h7>Quantity: {job.quantity}</h7>
                      <br></br> */}
                      {/* <h7>Deadline: {job.dueTime}</h7>
                      <br></br> */}
                      <h7>Kinh nghiệm: {job.experienceYear} năm</h7>
                      <br></br>
                      <h7>Trình độ: {job.educationLevel}</h7>
                      <br></br>
                      <h7><span>${job.minBudget}-{job.maxBudget}</span></h7>
                    </div>
                </div>
                <div className='button-container'>
                  <div className="text-center align-items-end mb-1">
                      <Link to={`${link}/${job.id}`}>
                          <span className="btn btn-dark">{btnName1}</span>
                      </Link>
                  </div>
                  <div className="text-center align-items-end mb-1">
                      <button className="w-100 rounded bg-danger text-white border-0 p-2 mb-5"
                          onClick={()=>saveForJob(job.id)}>{btnName2}</button>
                  </div>
                </div>
            </div>
        </div>
    )
}



export default PerfumeCardItem;