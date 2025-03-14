import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;

  userId: string;
};

const getRandomLikes = () => Math.floor(Math.random() * 500) + 1;
const getRandomViews = () => (Math.random() * (10 - 1) + 1).toFixed(1) + "K";

const ProjectCard = ({
  avatarUrl,
  id,
  image,
  name,
  title,
  userId,
}: Props) => {
  const likes = getRandomLikes();
  const views = getRandomViews();

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          alt={"project_image"}
          className="h-full w-full object-cover rounded-2xl"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src={"/hearth.svg"} height={12} width={13} alt="like" />
            <p className="text-sm">{likes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src={"/eye.svg"} height={12} width={13} alt="views" />
            <p className="text-sm">{views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
