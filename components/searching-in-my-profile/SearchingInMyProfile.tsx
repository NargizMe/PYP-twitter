import React, { useCallback, useRef, useState } from "react";
import searchingInMyProfileScss from "./searchingInMyProfile.module.scss";

export default function SearchingInMyProfile() {

  return (
    <div className={searchingInMyProfileScss.searchingInMyProfileContainer}>
      <ul>
        <li>Tweets</li>
        <li>Retweets</li>
        <li>Likes</li>
      </ul>
    </div>
  );
}