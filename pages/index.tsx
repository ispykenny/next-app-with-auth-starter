import { GetServerSideProps } from "next";
import { getSession, signIn, signOut } from "next-auth/react";

export default function Home({ user }: any) {
  return (
    <div className="flex justify-between w-full">
      hello {user?.name}
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }
  return {
    props: {
      ...session,
    },
  };
};
