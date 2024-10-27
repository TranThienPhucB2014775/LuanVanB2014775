import React, {useCallback, useEffect, useState} from 'react';
import useHttp from "../../hooks/useHttp.js";
import {getAllVerifications} from "../../api/verification.api.js";
import {getAllReports} from "../../api/report.api.js";
import ReactPaginate from "react-paginate";
import {Button, Card, Pagination, Table} from "react-bootstrap";
import ReportCard from "./ReportCard.jsx";
import Filter from "./Filter.jsx";

function ListReport() {

    const [reports, setReports] = useState(null)

    const [page, setPage] = useState({
        pageNum: 0,
        totalPage: 1,
        totalElements: 0,
    });


    const [params, setParams] = useState("")

    const {data, isLoading, sendRequest} = useHttp(getAllReports, {
        data: [],
        totalElements: 0,
        totalPage: 0,
    });

    async function fetchData() {
        await sendRequest({
            pageNum: page.pageNum,
            params
        });
    }

    const handleChangePage = useCallback((data) => {
        setPage(prevState => ({
            ...prevState,
            pageNum: data.selected
        }));
    }, []);

    useEffect(() => {
        fetchData();
    }, [page.pageNum, params]);

    useEffect(() => {
        if (data) {
            setPage(prevState => ({
                ...prevState,
                totalPage: data.totalPage,
                totalElements: data.totalElement
            }));
        }
        setReports(data.data);
    }, [data]);

    function handelUpdateReport({reportId}) {
        const newReports = reports.map(report => {
            if (report.reportId === reportId) {
                return {
                    ...report,
                    isHandled: true
                }
            }
            return report;
        })
        setReports(newReports);
    }


    return (
        <div>
            <Card>
                <Card.Header className="bg-white py-4">
                    <h4 className="mb-0">Danh sách báo cáo</h4>
                </Card.Header>
                <div className="">
                    <Filter setParams={setParams}/>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Kiểu báo cáo</th>
                            <th>Tin nhắn</th>
                            <th>Giải quyết</th>
                            <th>Created At</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reports !== null && reports.map(report => (
                            <ReportCard report={report} key={report.reportId} handelUpdateReport={handelUpdateReport}/>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <Pagination className="justify-content-center">
                    <ReactPaginate
                        previousLabel={"«"}
                        nextLabel={"»"}
                        breakLabel={"..."}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        pageCount={page.totalPage}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={5}
                        onPageChange={handleChangePage}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </Pagination>
            </Card>
        </div>
    );
}

export default ListReport;