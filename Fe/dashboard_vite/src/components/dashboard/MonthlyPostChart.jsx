import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import {Container} from 'react-bootstrap';

// Đăng ký các thành phần của Chart.js
Chart.register(...registerables);

const MonthlyPostChart = ({
                                monthlyRentalPostData,
                                monthlyTenantPostData
                          }) => {
    // const monthlyRentalPostData1 = [
    //     {month: "2024-08", postCount: 1},
    //     {month: "2024-09", postCount: 1},
    //     {month: "2024-10", postCount: 1},
    //     {month: "2024-11", postCount: 2},
    //     {month: "2024-12", postCount: 3},
    //     {month: "2025-01", postCount: 2},
    //     {month: "2025-02", postCount: 4},
    //     {month: "2025-03", postCount: 5},
    //     {month: "2025-04", postCount: 3},
    //     {month: "2025-05", postCount: 2},
    //     {month: "2025-06", postCount: 1},
    //     {month: "2025-07", postCount: 2}
    // ];
    //
    // const monthlyTenantPostData = [
    //     {month: "2024-08", postCount: 1},
    //     {month: "2024-09", postCount: 1},
    //     {month: "2024-10", postCount: 3},
    //     {month: "2024-11", postCount: 2},
    //     {month: "2024-12", postCount: 4},
    //     {month: "2025-01", postCount: 3},
    //     {month: "2025-02", postCount: 5},
    //     {month: "2025-03", postCount: 4},
    //     {month: "2025-04", postCount: 3},
    //     {month: "2025-05", postCount: 2},
    //     {month: "2025-06", postCount: 1},
    //     {month: "2025-07", postCount: 3}
    // ];


    // Tạo nhãn và dữ liệu cho biểu đồ
    const labels = monthlyRentalPostData.map(data => data.month);
    const rentalCounts = monthlyRentalPostData.map(data => data.postCount);
    const tenantCounts = monthlyTenantPostData.map(data => data.postCount);

    console.log(labels);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Tin cho thuê',
                data: rentalCounts,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0 // Độ cong của đường
            },
            {
                label: 'Tin tìm phòng',
                data: tenantCounts,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0 // Độ cong của đường
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Container>
            {/*<h2>Biểu đồ số lượng bài đăng 12 tháng gần nhất</h2>*/}
            <Line data={data} options={options}/>
        </Container>
    );
};

export default MonthlyPostChart;
