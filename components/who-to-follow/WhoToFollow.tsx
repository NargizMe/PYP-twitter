import WhoToFollowProfile from "./WhoToFollowProfile";
import whoToFollowScss from './whoToFollow.module.scss';

export default function WhoToFollow() {
  return (
    <section className={whoToFollowScss.whoToFollowContainer}>
      <h4>Who to follow </h4>
      <WhoToFollowProfile />
      <WhoToFollowProfile />
    </section>
  );
}