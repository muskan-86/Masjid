import React from "react";
import UnderConstruction from "./UnderConstruction.jsx";
import BackButton from "./BackButton.jsx";

const Donation = ( ) => {
return(
    <div className="bg-white items-center"> 
     <div className="mt-2">
       <BackButton/>
     </div>
    <div className="mt-0">
       <UnderConstruction/>
    </div>
    </div>
);
};
 
export  default Donation;