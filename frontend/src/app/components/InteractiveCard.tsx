'use client'

import React from "react";

export default function InteractiveCard ( { children, bid }: { children: React.ReactNode, bid: string } ) {

    function onBillSelected(){

    }

    return (
        <div id={bid} className="w-full h-[250px] rounded-lg shadow-lg bg-stone-200 hover:shadow-2xl hover:shadow-lime-100"
            onClick={ () => onBillSelected()  }
        >
            { children }
        </div>
    );
}
