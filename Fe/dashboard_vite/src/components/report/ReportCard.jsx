import React, { useEffect, useState } from 'react';
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseUrlClient } from "../../constants/baseUrl.js";
import DialogCommentInfo from "./DialogCommentInfo.jsx";
import useHttp from "../../hooks/useHttp.js";
import { getReport } from "../../api/comment.api.js";
import { updateReport } from "../../api/report.api.js";
import { FaEye, FaCheck } from 'react-icons/fa'; // Importing icons
import { toast } from 'react-toastify';

const reportType = [
    { name: "Người dùng", value: "USER" },
    { name: "Bài đăng tìm người thuê", value: "RENTER_POST" },
    { name: "Dãy phòng", value: "APARTMENT" },
    { name: "Bình luận", value: "RENTAL_COMMENT" },
    { name: "Bài đăng tìm trọ", value: "TENANT_POST" },
];

function ReportCard({ report, handelUpdateReport }) {
    const router = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, sendRequest } = useHttp(updateReport, {});

    const navigate = useNavigate();

    async function handleSeeDetail() {
        const urlMap = {
            USER: `${baseUrlClient}/user/${report.itemId}`,
            RENTER_POST: `/dashboard/rental-post-list/${report.itemId}`,
            APARTMENT: `${baseUrlClient}/apartment/${report.itemId}`,
            TENANT_POST: `/dashboard/tenant-post-list/${report.itemId}`,
            RENTAL_COMMENT: () => setIsOpen(true),
        };
        const url = urlMap[report.reportType];

        if (report.reportType === "RENTER_POST" || report.reportType === "TENANT_POST") {
            navigate(url);
            return;
        }

        if (typeof url === 'function') {
            url();
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }

    async function handleUpdateReport() {
        await sendRequest({ reportId: report.reportId });
        toast("Bạn đã hoàn thành báo cáo này");
        handelUpdateReport({ reportId: report.reportId });
    }

    // Định nghĩa màu sắc cho hàng dựa trên trạng thái báo cáo
    const rowStyle = {
        backgroundColor: report.isHandled ? '#d4edda' : '#fff3cd', // Xanh nhạt nếu đã xử lý, vàng nhạt nếu chưa
        color: report.isHandled ? '#155724' : '#856404', // Màu chữ
    };

    return (
        <tr key={report.reportId} style={rowStyle}>
            <td>{reportType.find(type => type.value === report.reportType).name}</td>
            <td>{report.message}</td>
            <td>{report.isHandled ? "Xong" : "Chưa"}</td>
            <td>{new Date(report.createdAt).toLocaleString()}</td>
            <td>
                <Button
                    variant="info"
                    onClick={handleSeeDetail}
                    className="me-2"
                    disabled={isLoading}
                    title="Xem chi tiết"
                >
                    <FaEye /> Xem chi tiết
                </Button>
                <Button
                    variant="success"
                    onClick={handleUpdateReport}
                    disabled={report.isHandled || isLoading}
                    title="Hoàn thành"
                >
                    {isLoading ? <Spinner animation="border" size="sm" /> : <FaCheck />}
                    {report.isHandled ? " Đã hoàn thành" : " Hoàn thành"}
                </Button>
            </td>
            <DialogCommentInfo isOpen={isOpen} setIsOpen={setIsOpen} reportID={report.itemId} />
        </tr>
    );
}

export default ReportCard;
