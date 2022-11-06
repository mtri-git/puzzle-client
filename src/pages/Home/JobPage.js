import React, { Component } from "react";
import { matchPath, withRouter } from "react-router-dom";
import axios from "axios";
import BannerEmployer from "./BannerEmployer";
import Loader from "./Loader";
import { EmployerServiceIml } from "../../actions/admin-actions";

const BASE_REST_API_URL = 'https://puzzle-ute.herokuapp.com/api';

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
        path: `/job-post/get-one/:id`,
      });
      return (matchJobPath && matchJobPath.params) || {};
    };

    const { pathname } = this.props.location;
    const currentParams = getParams(pathname);
    console.log(currentParams);

    if (this.state.isLoading) {
      axios
        .get(`${BASE_REST_API_URL}/job-post/get-one/${currentParams.id}`)
        .then(async response => {
          const text = response.data.data.createdEmployerId;
          const settings = {
            method: 'GET',
          };

          this.setState({
            job: response.data.data,
            employer: await fetch(`https://puzzle-ute.herokuapp.com/api/employer/${text}`, settings)
              .then((response) => {
                let dataJson = response.json()
                if (dataJson.data) {
                  return dataJson.data.data
                } else {
                  return dataJson
                }
              }),
            isLoading: false,
          })
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
      const BASE_REST_API_URL = "https://puzzle-ute.herokuapp.com/api";

      axios
        .get(BASE_REST_API_URL + "/candidate/apply-job-post/" + this.state.job.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          job_id: this.state.job.id,
        })
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
                <div className="employer-detail-box">
                  <h5 className="mb-3 mr-5">Employer Details</h5>
                  <ul>
                    <li>
                      First Name: <span>{employer.data.firstname}</span>
                    </li>
                    <li>
                      Last Address: <span>{employer.data.lastname}</span>
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
                  <h5>Basic Job Information</h5>
                  <ul>
                    <li>
                      Title: <span>{job.title}</span>
                    </li>
                    <li>
                      Active: <span>{job.active.toString()}</span>
                    </li>
                    <li>
                      Blind: <span>{job.blind.toString()}</span>
                    </li>
                    <li>
                      Deaf: <span>{job.deaf.toString()}</span>
                    </li>
                    <li>
                      HandDis: <span>{job.handDis.toString()}</span>
                    </li>
                    <li>
                      Labor: <span>{job.labor.toString()}</span>
                    </li>
                    <li>
                      City: <span>{job.city}</span>
                    </li>
                    <li>
                      Address: <span>{job.address}</span>
                    </li>
                    <li>
                      Workplace Type: <span>{job.workplaceType}</span>
                    </li>
                    <li>
                      Work Status: <span>{job.workStatus}</span>
                    </li>
                    <li>
                      Skills: <span>{job.skills}</span>
                    </li>
                    <li>
                      CommunicationDis: <span>{job.communicationDis}</span>
                    </li>
                    <li>
                      Level: <span>{job.level}</span>
                    </li>
                    <li>
                      Type: <span>{job.type}</span>
                    </li>
                    <li>
                      Quality: <span>{job.quantity}</span>
                    </li>
                    <li>
                      Application: <span>{job.applicationIds.length}</span>
                    </li>
                    <li>
                      Saved Candidate: <span>{job.savedCandidateIds.length}</span>
                    </li>
                    <li>
                      Experience Year: <span>{job.experienceYear}</span>
                    </li>
                    <li>
                      Education: <span>{job.educationLevel}</span>
                    </li>
                    <li>
                      Type: <span>{job.employmentType}</span>
                    </li>
                    <li>
                      Salary: <span>{job.minBudget}$ - {job.maxBudget}$ </span>
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
