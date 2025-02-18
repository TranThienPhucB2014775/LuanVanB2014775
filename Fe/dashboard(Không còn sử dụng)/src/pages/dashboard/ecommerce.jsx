import React, {useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import ProfitChart from "../../components/partials/widget/chart/profit-chart";
import OrderChart from "../../components/partials/widget/chart/order-chart";
import EarningChart from "../../components/partials/widget/chart/earning-chart";
import SelectMonth from "@/components/partials/SelectMonth";
import Customer from "../../components/partials/widget/customer";
import RecentOrderTable from "../../components/partials/Table/recentOrder-table";
import BasicArea from "../../pages/chart/appex-chart/BasicArea";
import VisitorRadar from "../../components/partials/widget/chart/visitor-radar";
import MostSales2 from "../../components/partials/widget/most-sales2";
import Products from "../../components/partials/widget/products";
import HomeBredCurbs from "./HomeBredCurbs";
import {useListUserMutation} from "@/store/api/user/userApiSlice.js";
import {useSelector} from "react-redux";

const Ecommerce = () => {
    const [filterMap, setFilterMap] = useState("usa");

    const [listUser, {isLoading, isError, error, isSuccess}] = useListUserMutation();
    const {token} = useSelector(state => state.auth);
    const [users, setUsers] = useState({
        data: {
            result: [
                {
                    "id": null,
                    "email": null,
                    "username": null,
                    "dob": null,
                    "city": null,
                    "address": null,
                    "createdDate": null,
                    "enable": null
                },

            ]
        },
    })

    useEffect(() => {

        async function fetchUsers() {
            const res = await listUser(token);
            setUsers(res);
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <HomeBredCurbs title="Ecommerce"/>
            <div className="grid grid-cols-12 gap-5 mb-5">
                <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <GroupChart2 totalAccount={users.data.result.length}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="xl:col-span-6 col-span-12">
                    <Card title="Customer" headerslot={<SelectMonth/>}>
                        <Customer/>
                    </Card>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Card title="Recent Orders" headerslot={<SelectMonth/>} noborder>
                        <RecentOrderTable/>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Ecommerce;
