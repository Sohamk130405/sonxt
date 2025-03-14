import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";
import { getProjectsOfUser } from "@/lib/actions/project.action";

type Props = {
  params: {
    id: string;
  };
};

const Profile = async ({ params }: Props) => {
  const result = (await getProjectsOfUser(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return <ProfilePage user={result?.user} />;
};

export default Profile;
