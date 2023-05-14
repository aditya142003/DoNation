import "./Style/Initiative.css";
import React from "react";
import EduImage from "./Images/Education.jpg";
import DisImage from "./Images/Disaster.jpg";
import HealthImage from "./Images/Health.jpg";
import FoodImage from "./Images/Food.jpg";
import NavBar from "./NavBar";

function Initiative() {
  return (
    <div>
      <NavBar />
      <h1 className="headingHighlighter">INITIATIVE</h1>
      <div className="oddContainer">
        <div className="imageParent ">
          <img src={EduImage} className="imageBase" id="imageEdu"></img>
        </div>
        <div
          className="content"
          onMouseEnter={(e) => {
            document.querySelector("#imageEdu").classList.add("imageBaseHover");
            document.querySelector(".imageBase").classList.remove("imageBase");
          }}
          onMouseLeave={(e) => {
            document.querySelector("#imageEdu").classList.add("imageBase");
            document
              .querySelector(".imageBase")
              .classList.remove("imageBaseHover");
          }}
        >
          <h3>Your Support towards educating children</h3>
          <p>
            A child's right to education entails the right to learn.Over 600
            million children and adolescents worldwide are unable to attain
            minimum proficiency levels in reading and mathematics, even though
            two thirds of them are in school. For out-of-school children,
            foundational skills in literacy and numeracy are further from grasp.
            Even in schools, a lack of trained teachers, inadequate education
            materials and poor infrastructure make learning difficult for many
            students. Others come to class too hungry, ill or exhausted from
            work or household tasks to benefit from their lessons. Without
            quality education, children face considerable barriers to employment
            and earning potential later in life. They are more likely to suffer
            adverse health outcomes and less likely to participate in decisions
            that affect them - threatening their ability to shape a better
            future for themselves and their societies.
          </p>
        </div>
      </div>
      <div className="evenContainer">
        <div
          className="content"
          onMouseEnter={(e) => {
            document
              .querySelector("#imageDisaster")
              .classList.add("imageBaseHover");
            document
              .querySelector("#imageDisaster")
              .classList.remove("imageBase");
          }}
          onMouseLeave={(e) => {
            document.querySelector("#imageDisaster").classList.add("imageBase");
            document
              .querySelector("#imageDisaster")
              .classList.remove("imageBaseHover");
          }}
        >
          <h3>Your Support towards disaster relief</h3>
          <p>
            The Non-Governmental Organisations (NGOs) have been providing
            support in critical sectors like health, education, water supply and
            sanitation, shelter and infrastructure, restoration of livelihoods,
            food security and nutrition, environment, etc. Given India's
            multi-hazard risk and vulnerability to natural and man-made
            disasters, NGOs have been playing a significant role in providing
            humanitarian assistance to disaster-affected people in most of the
            severe disasters like the Latur earthquake in 1993, Orissa super
            cyclone in 1999, Bhuj earthquake in 2001, Indian Ocean tsunami in
            2004, Kashmir earthquake in 2005, Barmer floods in 2006, Kosi floods
            in 2008,cyclones Aila and Laila and cloud burst in Leh in August
            2010, apart from participating in providing relief to disaster
            affected communities in various other localised disasters.
          </p>
        </div>
        <div className="imageParent ">
          <img src={DisImage} className="imageBase" id="imageDisaster"></img>
        </div>
      </div>
      <div className="oddContainer">
        <div className="imageParent ">
          <img src={HealthImage} className="imageBase" id="imageHealth"></img>
        </div>
        <div
          className="content"
          onMouseEnter={(e) => {
            document
              .querySelector("#imageHealth")
              .classList.add("imageBaseHover");
            document
              .querySelector("#imageHealth")
              .classList.remove("imageBase");
          }}
          onMouseLeave={(e) => {
            document.querySelector("#imageHealth").classList.add("imageBase");
            document
              .querySelector("#imageHealth")
              .classList.remove("imageBaseHover");
          }}
        >
          <h3>Your Support towards health of people</h3>
          <p>
            Their major focus is to address the healthcare and nutritional needs
            of the affected population. They also work to improve maternal,
            infant and child health in emergencies and have vast experience
            working in disaster-prone areas. Their healthcare centres provide
            patients with affordable medical consultations along with a week's
            supply of free medication. This is done through interventions like
            courses, classes, workshops and one-on-one interactions. The
            programmes are designed based on integrating various modalities of
            well-being like yoga, Ayurveda, nutrition, counselling, coaching,
            etc.
          </p>
        </div>
      </div>
      <div className="evenContainer">
        <div
          className="content"
          onMouseEnter={(e) => {
            document
              .querySelector("#imageFood")
              .classList.add("imageBaseHover");
            document.querySelector("#imageFood").classList.remove("imageBase");
          }}
          onMouseLeave={(e) => {
            document.querySelector("#imageFood").classList.add("imageBase");
            document
              .querySelector("#imageFood")
              .classList.remove("imageBaseHover");
          }}
        >
          <h3>Your Support towards feeding people</h3>
          <p>
            Food NGOs work to improve the nutritional quality of food available
            to vulnerable populations, such as young children or pregnant women.
            They provide supplements or specialized food products to address
            nutrient deficiencies. Food collection NGOs also contribute to
            distributing food kits to those in need. These kits may contain a
            variety of food items, including canned goods, fresh produce, and
            other non-perishable items. By food kit distribution, food
            collection NGO ensure that people have access to nutritious food
            that can help them meet their basic nutritional needs. Many food
            NGOs promote sustainable agriculture practices that help farmers
            increase their yields and incomes while preserving the environment.
            This can include initiatives such as organic farming, crop
            diversification, and water conservation.
          </p>
        </div>
        <div className="imageParent ">
          <img src={FoodImage} className="imageBase" id="imageFood"></img>
        </div>
      </div>
    </div>
  );
}

export default Initiative;
