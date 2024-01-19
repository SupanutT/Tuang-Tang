'use client'

import React from "react";

export default function InteractiveCard ( { children, bid, contentName }: { children: React.ReactNode, bid: string, contentName: string } ) {

    function onBillSelected(){

    }

    return (
        <div id={bid} className="w-full h-[250px] rounded-lg shadow-lg bg-stone-200 mt-[40px] hover:shadow-2xl hover:shadow-lime-100"
            onClick={ () => onBillSelected() }
        >
            { children }
        </div>
    );
}
