"use client"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import DashboardContentContainer from "@/features/Dashboard/DashboardContentContainer"
import { ModeProps } from "@/types/dashboard"

const Dashboard = ({ mode }: ModeProps) => {
   
    return (
        <Provider store={store}>
            <DashboardContentContainer mode={mode}/>
        </Provider>
    )
}

export default Dashboard