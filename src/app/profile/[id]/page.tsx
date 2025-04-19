import ProfileClient from "./ProfileClient";

export default function profileId({ params }: { params: { id: string } }) {
   return <ProfileClient id={params.id} />;
}

