import React from 'react';

import usePagination from "../Pagination/usePagination";
import JobItem from "../JobItem/JobItem";
import PaginationItem from "../Pagination/PaginationItem";
import SearchForm from "../SearchForm/SearchForm";

const MenuCards = ({ data, itemsPerPage, startFrom, searchByData }) => {
    const { slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching } = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    return (
        <div className="container">
            {/* <div className="container-fluid row mt-5 ml-2">
                <SearchForm
                    data={data}
                    searchByData={searchByData}
                    setFilteredData={setFilteredData}
                    setSearching={setSearching} />
            </div> */}
            <div className="row mt-0 ml-0">
                <div className="container-fluid">
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage} />
                    <div className="row" style={{paddingBottom:"100px"}}>
                        {slicedData?.map((job) => {
                            return (
                                <JobItem
                                    job={job}
                                    colSize={4}
                                    link={"/common/job-post/get-one"}
                                    btnName1={"Xem thêm"}
                                    btnName2={"Lưu"} />
                            );
                        })}
                    </div>
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage} />
                </div>
            </div>
        </div>
    );
}

export default MenuCards;