import { useEffect, useId, useState } from "react";
import Link from "../../components/Link";
import { Button } from "@mui/material";
import Head from "next/head";
import { nextTick } from "process";
import TwoStateCounter from "../../components/TwoStateCounter";

const Daggerheart = () => {
    return <div style={{
        width: '100%',
        height: '80vh',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around'
    }}>
        <TwoStateCounter
            defaultMax={5}
            defaultValue={5}
            emptyString="🖤"
            filledString="❤️"
            maxMax={12}
            storageKey="healthCounter"
        />
        <TwoStateCounter
            defaultMax={6}
            defaultValue={0}
            emptyString="-"
            filledString="🗲"
            maxMax={12}
            storageKey="stressCounter"
        />
        <button style={{
            position: "absolute",
            top: '13%'
        }} onClick={() => {
            if (!confirm('Are you sure you want to reset all counters')) return;
            localStorage.removeItem('healthCounter');
            localStorage.removeItem('stressCounter');
            location.reload()
        }}>RESET</button>
    </div>
};


export default Daggerheart;