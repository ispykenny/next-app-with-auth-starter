import type { GetServerSideProps } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";

type ProvidersTypes = {
  providers: {
    name: string;
    id: string;
  };
};
const SignIn = ({ providers }: ProvidersTypes) => {
  return (
    <div>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { providers },
  };
};

export default SignIn;
