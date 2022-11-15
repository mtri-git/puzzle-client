import * as React from "react";
import CompnayLogo from "../images/company-logo.png";
import { Link } from "react-router-dom";
import { EmployerServiceIml } from "../../actions/admin-actions";
import { useState, useEffect } from 'react';

export default ({ job, classValue }) => {

  const [employer, setEmployer] = useState('');

  useEffect(() => {
    EmployerServiceIml.getEmployerById(job.createdEmployerId).then((response) => {
      setEmployer(response.data.data.firstname + " " + response.data.data.lastname)
    }).catch(error => {
      setEmployer('')
    })
  }, [job.createdEmployerId])
  return (
    <div className={classValue}>
      <div className="job-box d-flex align-items-center">
        <img
          src={job.logo ? job.logo : CompnayLogo}
          alt="Company Logo"
          className="job-logo"
        />
        <div className="job-info ">
          <ul>
            <li>
              <strong> {employer}</strong>
            </li>
            <li>
              <Link to={`/common/job-post/get-one/${job.id}`} className="job-title">
                {job.title}
              </Link>
            </li>
            <li>
              <small>Deadline: {job.dueTime} </small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
