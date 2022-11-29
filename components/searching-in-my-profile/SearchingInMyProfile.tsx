import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import searchingInMyProfileScss from "./searchingInMyProfile.module.scss";
import { ILikedState, useLikedState } from "../../state/liked.state";
import gsap from 'gsap';

export default function SearchingInMyProfile() {
  const likedState = useLikedState();
  const divRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    lineMovement(likedState.payload);
  },[])

  function handleClick(filteredWord: ILikedState['payload']){
    lineMovement(filteredWord);
    likedState.setPayload(filteredWord)
  }

  function lineMovement(filteredWord: ILikedState['payload']){
    if(filteredWord === 'tweet'){
      gsap.to(divRef.current!, {
        y: 0
      })
    }

    if(filteredWord === 'retweet'){
      gsap.to(divRef.current!, {
        y: 42
      })
    }

    if(filteredWord === 'liked'){
      gsap.to(divRef.current!, {
        y: 84
      })
    }
  }

  return (
    <div className={searchingInMyProfileScss.searchingInMyProfileContainer}>
      <div ref={divRef} />
      <ul>
        <li>
          <button onClick={() => handleClick('tweet')}>Tweets</button>
        </li>
        <li>
          <button onClick={() => handleClick('retweet')}>Retweets</button>
        </li>
        <li>
          <button onClick={() => handleClick('liked')}>Likes</button>
        </li>
      </ul>
    </div>
  );
}