import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const nav = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            nav("/NgoAuth");
          }}
        >
          NGO
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            nav("/VolunteerAuth");
          }}
        >
          Volunteer
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            nav("/Guest");
          }}
        >
          Guest
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
