import "./Style/Initiative.css";
import React, { useEffect } from "react";
import EduBefore from "./Images/EducationAfter1.jpg";
import EduAfter from "./Images/EducationAfter.jpg";

function Initiative() {
  return (
    <div id="initiative">
      <h1>INITIATIVE</h1>
      <div className="oddContainer">
        <div className="imageParent ">
          <img src={EduBefore} className="imageBaseEdu imageBase"></img>
          <img src={EduAfter} className="imageBaseEdu imageBase "></img>
        </div>
        <div
          className="contentEdu content"
          onMouseLeave={(e) => {
            document
              .querySelector(".imageBaseEdu:nth-child(2)")
              .classList.add("imageOut");
          }}
        >
          <h3>Your Support for Education of children</h3>
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
          className="contentDis content"
          onMouseLeave={(e) => {
            document
              .querySelector(".imageBaseDis:nth-child(2)")
              .classList.add("imageOut");
          }}
        >
          <h3>Your Support for Education of children</h3>
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
        <div className="imageParent ">
          <img src={EduBefore} className="imageBase imageBaseDis"></img>
          <img src={EduAfter} className="imageBase imageBaseDis"></img>
        </div>
      </div>

      <div className="oddContainer">
        <div className="imageParent ">
          <img src={EduBefore} className="imageBase imageBaseHealth"></img>
          <img src={EduAfter} className="imageBase imageBaseHealth"></img>
        </div>
        <div
          className="contentHealth content"
          onMouseLeave={(e) => {
            document
              .querySelector(".imageBaseHealth:nth-child(2)")
              .classList.add("imageOut");
          }}
        >
          <h3>Your Support for Education of children</h3>
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
          className="contentFood content"
          onMouseLeave={(e) => {
            document
              .querySelector(".imageBaseFood:nth-child(2)")
              .classList.add("imageOut");
          }}
        >
          <h3>Your Support for Education of children</h3>
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
        <div className="imageParent ">
          <img src={EduBefore} className="imageBase imageBaseFood"></img>
          <img src={EduAfter} className="imageBase imageBaseFood"></img>
        </div>
      </div>
    </div>
  );
}

export default Initiative;
