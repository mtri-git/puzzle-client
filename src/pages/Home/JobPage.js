import React, { Component } from "react";
import { matchPath, withRouter } from "react-router-dom";
import axios from "axios";
import BannerEmployer from "./BannerEmployer";
import Loader from "./Loader";
import { EmployerServiceIml } from "../../actions/admin-actions";
import './main.css'

const BASE_REST_API_URL = "http://localhost:8080/api";


class JobPage extends Component {
  constructor(props) {
    super(props);
    this.employerServiceIml = EmployerServiceIml;
    this.state = {
      job: {},
      employer: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    const getParams = (pathname) => {
      const matchJobPath = matchPath(pathname, {
        path: `/common/job-post/get-one/:id`,
      });
      return (matchJobPath && matchJobPath.params) || {};
    };

    const { pathname } = this.props.location;
    const currentParams = getParams(pathname);
    console.log(currentParams);
    console.log("id: ", currentParams);

    if (this.state.isLoading) {
      axios
        .get(`${BASE_REST_API_URL}/common/job-post/get-one/${currentParams.id}`)
        .then(async (response) => {
          const text = response.data.data.createdEmployerId;
          const settings = {
            method: "GET",
          };
          
          this.setState({
            job: response.data.data,
            employer: await fetch(
              `http://localhost:8080/api/common/employer/get-employer-by-id/${text}`,
              settings
            ).then((response) => {
              let dataJson = response.json();
              if (dataJson.data) {
                return dataJson.data.data;
              } else {
                return dataJson;
              }
            }),
            isLoading: false,
          });
        });
    }
  }


  applyForJob = () => {
    const auth = localStorage.getItem("userRole");
    // console.log(auth.entity);
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      alert("you must login to apply for jobs");
    } else {
      const BASE_REST_API_URL = "http://localhost:8080/api";

      axios
        .get(
          BASE_REST_API_URL + "/candidate/apply-job-post/" + this.state.job.id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            job_id: this.state.job.id,
          }
        )
        .then((response) => {
          if (response.data.data) {
            //show success message
            alert("Successfuly applied for job");
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

 

  render() {
    const { employer, job } = this.state;
    const auth = localStorage.getItem("userRole");
    return (
      <div>
        {this.state.isLoading && <Loader />}

        {!this.state.isLoading && (
          <div>
            <BannerEmployer cover={employer.cover} logo={employer.logo} />
            <div className="row justify-content-around job-page-wrapper mb-5 mx-0">
              <div className="col-lg-3">
                <div className="employer-detail-box info-header">
                  <h5 className="mb-3 mr-5">Employer Details</h5>
                  <ul>
                    <li>
                      H??? v?? t??n:{" "}
                      <span>{`${employer.data.lastname} ${employer.data.firstname} `}</span>
                    </li>
                    <li>
                      ?????a ch???: <span>{employer.data.address}</span>
                    </li>
                    <li>
                      Email: <span>{employer.data.recruitmentEmail}</span>
                    </li>
                    <li>
                      Phone: <span>{employer.data.recruitmentPhone}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="job-info-container">
                  <h5 className="border-0">Basic Job Information</h5>
                  <div className="info-header border-bottom">
                      <h3 className="border-0 ">
                        <span>{job.title}</span>
                      </h3>
                      <button className="w-100 rounded bg-danger text-white border-0 p-2 mb-5"
                      onClick={this.applyForJob}>???ng tuy???n</button>
                    </div>
                  <ul>
                    <div className="basic-info border-bottom mb-2 mt-2">
                    <li className="border-0 " style={{fontSize:"medium"}}>
                      C???n tuy???n: <span>{job.quantity}</span>
                    </li>
                    <li className="border-0" style={{fontSize:"small"}}>
                      Salary:
                      <span>
                        {job.minBudget}$ - {job.maxBudget}
                      </span>
                    </li>
                    <li className="border-0 basic-info-item" style={{fontSize:"small"}}>
                      ?????a ch???: <span>{`${job.address}, ${job.city}`}</span>
                    </li>
                    <li className="border-0 basic-info-item" style={{fontSize:"small"}}>
                      L??m vi???c t???i: <span>{job.workplaceType}</span>
                    </li>
                    <li className="border-0 basic-info-item" style={{fontSize:"small"}}>
                      T??nh tr???ng c??ng vi???c: <span>{job.workStatus}</span>
                    </li>
                    </div>
                    {/* <li>
                      Active: <span>{job.active.toString()}</span>
                    </li> */}
                    <li className="border-0">
                      T??nh tr???ng ng?????i l??m:
                    </li>
                    <div className="disability-wrap d-flex" style={{columnGap:"10rem"}}>
                      <li className="border-0">
                        <span>{job.blind ? "Blind: ???" : ""}</span>
                      </li>
                      <li className="border-0">
                        <span>{job.deaf ? "Deaf: ???" : ""}</span>
                      </li >
                      <li className="border-0">
                        <span>{job.handDis ? "HandDis: ???" : ""}</span>
                      </li>
                      <li className="border-0">
                        <span>{job.labor ? "Labor: ???" : ""}</span>
                      </li>
                    </div>
                    <div>
                      <h3>Y??u c???u</h3>
                      <li className="border-0">
                        Skills: <span>{job.skills}</span>
                      </li>
                      <li className="border-0">
                        CommunicationDis: <span>{job.communicationDis}</span>
                      </li>
                      <li className="border-0">
                        Level: <span>{job.level}</span>
                      </li>
                      <li className="border-0">
                        Type: <span>{job.type}</span>
                      </li>
                      <li className="border-0">
                        Application: <span>{job.applicationIds.length}</span>
                      </li>
                      {/* <li>
                        Saved Candidate: <span>{job.savedCandidateIds.length}</span>
                      </li> */}
                      <li className="border-0">
                        Experience Year: <span>{job.experienceYear}</span>
                      </li>
                      <li className="border-0">
                        Education: <span>{job.educationLevel}</span>
                      </li>
                    </div>
                    <li className="border-0">
                      Type: <span>{job.employmentType}</span>
                    </li>
                    <li>
                      Deadline: <span>{job.dueTime}</span>
                    </li>
                  </ul>
                </div>
                <div className="job-description-container">
                  <h5 className="mb-3">Job Description :</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  ></div>
                </div>
                <div className="job-apply-btn">
                  {!(auth === "EMPLOYER") && (
                    <button
                      type="submit"
                      className="post-job-btn b-0 px-3 primary"
                      onClick={this.applyForJob}
                    >
                      Apply for Job
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(JobPage);
