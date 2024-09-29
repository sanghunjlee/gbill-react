import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Modal } from "@mui/material";

import Banner from "./components/Banner";
import HomeSection from "./components/HomeSection";
import BillForm from "@src/features/bill/components/BillForm";
import GroupSection from "@src/pages/home/components/GroupSection";
import BillSection from "@src/pages/home/components/BillSection";


export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="mx-auto my-8">
            <div
                className="flex flex-col items-stretch gap-12"
            >
                <Banner />
                <Divider />
                <HomeSection title="How to Use">
                    <ol>
                        <li>
                            Add people to the group
                        </li>
                        <li>
                            Add bills to split
                        </li>
                        <li>
                            Click `Split` to generate who-pays-whom table
                        </li>
                    </ol>
                </HomeSection>
                <Divider />
                <GroupSection />
                <BillSection />
            </div>
        </div>
    )
}
