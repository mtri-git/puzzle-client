import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import {companysItem1, companysItem2, companysItem3} from "./SliderBrandsData";
import "./SliderBrands.css";
import {Link} from "react-router-dom";

const SliderBrands = () => {
    const settings = {
        controls: false,
        indicators: true
    }

    return (
        <div className="container text-center my-3 mt-5">
            <h3>COMPANYS</h3>
            <Carousel {...settings}>
                <Carousel.Item className="row">
                    {companysItem1.map((company, i) => {
                        return (
                            <div className="col-2 float-left" key={i}>
                                <Link to={{pathname: "/menu", state: {id: company.name}}}>
                                    <img className="img-fluid" src={company.url} alt={company.name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel.Item>
                <Carousel.Item className="row">
                    {companysItem2.map((company, i) => {
                        return (
                            <div className="col-2 float-left" key={i}>
                                <Link to={{pathname: "/menu", state: {id: company.name}}}>
                                    <img className="img-fluid" src={company.url} alt={company.name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel.Item>
                <Carousel.Item className="row">
                    {companysItem3.map((company, i) => {
                        return (
                            <div className="col-2 float-left" key={i}>
                                <Link to={{pathname: "/menu", state: {id: company.name}}}>
                                    <img className="img-fluid" src={company.url} alt={company.name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default SliderBrands;