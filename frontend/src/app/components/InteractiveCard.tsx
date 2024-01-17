'use client'

import React from "react";

export default function InteractiveCard ( { children, contentName }: { children: React.ReactNode, contentName: string } ) {

    function onBillSelected(){

    }

    return (
        <div className="w-1/6 h-[250px] rounded-lg shadow-lg bg-stone-200 mt-[40px] hover:shadow-2xl hover:shadow-lime-100"
            onClick={ () => onBillSelected() }
        >
            { children }
        </div>
    );
}
